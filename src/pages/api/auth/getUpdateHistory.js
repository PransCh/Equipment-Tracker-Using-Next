import { getConnection } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { EquipmentID } = req.query;

    try {
      // Get MSSQL connection
      const pool = await getConnection();
      console.log('Database connection established');

      // Fetch update history from the database
      const history = await pool.request()
        .input('EquipmentID', EquipmentID)
        .query(`
          SELECT * FROM pprans_updatehistory
          WHERE EquipmentID = @EquipmentID
        `);

      console.log('Update history fetched from DB');
      return res.status(200).json(history.recordset);
    } catch (error) {
      console.error('Error fetching update history:', error);
      return res.status(500).json({ error: 'An error occurred while fetching update history' });
    }
  } else {
    // Only allow GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}