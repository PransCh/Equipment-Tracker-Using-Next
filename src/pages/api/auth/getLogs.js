// /pages/api/auth/getLogs.js
import { getConnection } from '@/lib/db';
import sql from 'mssql';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { maintenanceID } = req.query;

    if (!maintenanceID) {
      return res.status(400).json({ error: 'Maintenance ID is required' });
    }

    try {
      // Get MSSQL connection
      const pool = await getConnection();

      // Fetch logs for the specific maintenance
      const result = await pool.request()
        .input('maintenanceID', sql.Int, maintenanceID)
        .query('SELECT * FROM pprans_maintenancelogs WHERE maintenanceID = @maintenanceID');

      return res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error fetching logs:', error);
      return res.status(500).json({ error: 'An error occurred while fetching logs' });
    }
  } else {
    // Only allow GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}