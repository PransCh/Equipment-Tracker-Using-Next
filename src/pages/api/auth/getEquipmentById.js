import { getConnection } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    try {
      // Get MSSQL connection
      const pool = await getConnection();
      console.log('Database connection established');

      // Retrieve equipment by ID from the database
      const result = await pool.request()
        .input('EquipmentID', id)
        .query('SELECT * FROM pprans_equipments WHERE EquipmentID = @EquipmentID');

      if (result.recordset.length === 0) {
        return res.status(404).json({ error: 'Equipment not found' });
      }

      console.log('Equipment retrieved from DB');
      return res.status(200).json(result.recordset[0]);
    } catch (error) {
      console.error('Error retrieving equipment:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving equipment' });
    }
  } else {
    // Only allow GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}