import { getConnection } from '@/lib/db';
import sql from 'mssql';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { equipmentID } = req.query;

    try {
      // Get MSSQL connection
      const pool = await getConnection();
      console.log('Database connection established');

      // Fetch maintenance history for the specific equipment
      const query = `SELECT * FROM pprans_maintenancehistory WHERE equipmentID = @equipmentID`;
      const result = await pool.request()
        .input('equipmentID', sql.Int, equipmentID)
        .query(query);

      console.log('Maintenance history fetched from DB');
      return res.status(200).json(result.recordset);
    } catch (error) {
      console.error('Error fetching maintenance history:', error);
      return res.status(500).json({ error: 'An error occurred while fetching maintenance history' });
    }
  } else {
    // Only allow GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}