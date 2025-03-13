import { getConnection } from '@/lib/db';
import sql from 'mssql';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { equipmentID } = req.query;

    try {
      // Get MSSQL connection
      const pool = await getConnection();
      console.log('Database connection established');

      let query;
      if (equipmentID) {
        // Fetch maintenance details for the specific equipment
        query = `SELECT id, maintenanceDate, maintenanceType, duration, remarks, createdBy FROM pprans_maintenanceschedule WHERE equipmentID = @equipmentID`;
      } else {
        // Fetch maintenance details for all equipment
        query = `SELECT id, maintenanceDate, maintenanceType, duration, remarks, createdBy FROM pprans_maintenanceschedule`;
      }

      const result = await pool.request()
        .input('equipmentID', sql.Int, equipmentID)
        .query(query);

      console.log('Maintenance details fetched from DB');
      return res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error fetching maintenance details:', error);
      return res.status(500).json({ error: 'An error occurred while fetching maintenance details' });
    }
  } else {
    // Only allow GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}