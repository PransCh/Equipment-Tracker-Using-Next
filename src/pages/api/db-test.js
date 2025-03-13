import { getConnection } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Venkatesh_Users');
    console.log(result)
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}