import { getConnection } from '@/lib/db';
import sql from 'mssql';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { equipmentID, maintenanceDate, maintenanceType, duration, remarks, createdBy } = req.body;
    console.log(req.body);

    try {
      // Get MSSQL connection
      const pool = await getConnection();
      console.log('Database connection established');

      // Insert maintenance into the database
      await pool.request()
        .input('equipmentID', sql.Int, equipmentID)
        .input('maintenanceDate', sql.Date, maintenanceDate)
        .input('maintenanceType', sql.VarChar, maintenanceType)
        .input('duration', sql.Int, duration)
        .input('remarks', sql.VarChar, remarks)
        .input('createdBy', sql.VarChar, createdBy)
        .query('INSERT INTO pprans_maintenanceschedule (equipmentID, maintenanceDate, maintenanceType, createdDate, duration, remarks, createdBy) VALUES (@equipmentID, @maintenanceDate, @maintenanceType, GETDATE(), @duration, @remarks, @createdBy)');

      console.log('Maintenance scheduled in DB');
      return res.status(201).json({ message: 'Maintenance scheduled successfully' });
    } catch (error) {
      console.error('Error scheduling maintenance:', error);
      return res.status(500).json({ error: 'An error occurred while scheduling maintenance' });
    }
  } else {
    // Only allow POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}