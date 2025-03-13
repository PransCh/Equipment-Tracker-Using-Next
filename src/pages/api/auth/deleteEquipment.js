import { getConnection } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { EquipmentID } = req.body;
    console.log(req.body);

    try {
      // Get MSSQL connection
      const pool = await getConnection();
      console.log('Database connection established');

      // Delete equipment from the database
      await pool.request()
        .input('ID', EquipmentID)
        .query('DELETE FROM pprans_equipments WHERE EquipmentID = @ID');

      console.log('Equipment deleted from DB');
      return res.status(200).json({ message: 'Equipment deleted successfully' });
    } catch (error) {
      console.error('Error deleting equipment:', error);
      return res.status(500).json({ error: 'An error occurred while deleting equipment' });
    }
  } else {
    // Only allow DELETE requests
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}