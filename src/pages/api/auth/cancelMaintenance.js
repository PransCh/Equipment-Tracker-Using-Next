import { getConnection } from '@/lib/db';
import sql from 'mssql';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      // Get MSSQL connection
      const pool = await getConnection();
      console.log('Database connection established');

      // Delete maintenance from the database
      await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM pprans_maintenanceschedule WHERE id = @id');

      console.log('Maintenance canceled in DB');
      return res.status(200).json({ message: 'Maintenance canceled successfully' });
    } catch (error) {
      console.error('Error canceling maintenance:', error);
      return res.status(500).json({ error: 'An error occurred while canceling maintenance' });
    }
  } else {
    // Only allow DELETE requests
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}