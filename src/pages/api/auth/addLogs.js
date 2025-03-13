import { getConnection } from '@/lib/db';
import sql from 'mssql';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { equipmentID, maintenanceID, logText, createdBy } = req.body;

    try {
      // Get MSSQL connection
      const pool = await getConnection();
      console.log('Database connection established');

      // Insert log into the database
      const query = `INSERT INTO pprans_maintenancelogs (equipmentID, maintenanceID, logText, createdBy, createdDate) VALUES (@equipmentID, @maintenanceID, @logText, @createdBy, GETDATE())`;
      await pool.request()
        .input('equipmentID', sql.Int, equipmentID)
        .input('maintenanceID', sql.Int, maintenanceID)
        .input('logText', sql.Text, logText)
        .input('createdBy', sql.VarChar, createdBy)
        .query(query);

      console.log('Log added to the database');
      return res.status(200).json({ message: 'Log added successfully' });
    } catch (error) {
      console.error('Error adding log:', error);
      return res.status(500).json({ error: 'An error occurred while adding the log' });
    }
  } else {
    // Only allow POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}