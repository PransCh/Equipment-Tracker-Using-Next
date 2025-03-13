import { getConnection } from '@/lib/db';
import sql from 'mssql';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ error: 'Invalid User ID' });
    }

    try {
      const pool = await getConnection();
      console.log('Database connection established');

      const query = `SELECT role FROM pprans_users WHERE id = @userId`;
      const result = await pool.request()
        .input('userId', sql.Int, parsedUserId)
        .query(query);

      if (result.recordset.length > 0) {
        const userRole = result.recordset[0].role;
        return res.status(200).json({ role: userRole });
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      return res.status(500).json({ error: 'An error occurred while fetching user role' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}