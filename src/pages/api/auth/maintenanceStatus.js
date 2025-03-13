import { getConnection } from '@/lib/db';
import sql from 'mssql';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { maintenanceID } = req.body;

    try {
      // Get MSSQL connection
      const pool = await getConnection();
      console.log('Database connection established');

      // Fetch maintenance details
      const maintenanceQuery = `SELECT * FROM pprans_maintenanceschedule WHERE id = @maintenanceID`;
      const maintenanceResult = await pool.request()
        .input('maintenanceID', sql.Int, maintenanceID)
        .query(maintenanceQuery);

      const maintenance = maintenanceResult.recordset[0];

      // Insert into maintenance history
      const historyQuery = `INSERT INTO pprans_maintenancehistory (equipmentID, maintenanceDate, maintenanceType, duration, remarks, createdBy, completedDate) VALUES (@equipmentID, @maintenanceDate, @maintenanceType, @duration, @remarks, @createdBy, GETDATE())`;
      await pool.request()
        .input('equipmentID', sql.Int, maintenance.equipmentID)
        .input('maintenanceDate', sql.Date, maintenance.maintenanceDate)
        .input('maintenanceType', sql.VarChar, maintenance.maintenanceType)
        .input('duration', sql.Int, maintenance.duration)
        .input('remarks', sql.Text, maintenance.remarks)
        .input('createdBy', sql.VarChar, maintenance.createdBy)
        .query(historyQuery);

      // Delete maintenance from schedule
      const deleteQuery = `DELETE FROM pprans_maintenanceschedule WHERE id = @maintenanceID`;
      await pool.request()
        .input('maintenanceID', sql.Int, maintenanceID)
        .query(deleteQuery);

      console.log('Maintenance marked as completed, saved to history, and deleted from schedule');
      return res.status(200).json({ message: 'Maintenance marked as completed, saved to history, and deleted from schedule' });
    } catch (error) {
      console.error('Error updating maintenance status:', error);
      return res.status(500).json({ error: 'An error occurred while updating maintenance status' });
    }
  } else {
    // Only allow POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}