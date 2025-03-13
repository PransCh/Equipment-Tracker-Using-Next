import { getConnection } from "@/lib/db";


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, model, serialNumber, location, price, imageUrl, purchaseDate } = req.body;
    console.log(req.body);

    try {
      // Get MSSQL connection
      const pool = await getConnection();
      console.log('Database connection established');

      console.log(name, model, serialNumber, location, price, imageUrl, purchaseDate);

      // Insert equipment into the database
      await pool.request()
        .input('Name', name)
        .input('Model', model)
        .input('SerialNumber', serialNumber)
        .input('Location', location)
        .input('Price', price)
        .input('ImageURL', imageUrl)
        .input('PurchaseDate', purchaseDate)
        .query(`
          INSERT INTO pprans_equipments (Name, Model, SerialNumber, Location, Price, ImageURL, PurchaseDate)
          VALUES (@Name, @Model, @SerialNumber, @Location, @Price, @ImageURL, @PurchaseDate)
        `);

      console.log('Equipment inserted into DB');
      return res.status(201).json({ message: 'Equipment added successfully' });
    } catch (error) {
      console.error('Error during equipment insertion:', error);
      return res.status(500).json({ error: 'An error occurred during equipment insertion' });
    }
  } else {
    // Only allow POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}