import { getConnection } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get MSSQL connection
      const pool = await getConnection();
      console.log('Database connection established');

      // Retrieve all equipment from the database
      const result = await pool.request().query('SELECT * FROM pprans_equipments');

      console.log('Equipment retrieved from DB');
      return res.status(200).json(result.recordset);
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