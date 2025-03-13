// import { getConnection } from '@/lib/db';

// export default async function handler(req, res) {
//   if (req.method === 'PUT') {
//     const { EquipmentID, Name, Model, SerialNumber, Location, Price, ImageURL, PurchaseDate } = req.body;
//     console.log(req.body);

//     try {
//       // Get MSSQL connection
//       const pool = await getConnection();
//       console.log('Database connection established');

//       // Update equipment in the database
//       await pool.request()
//         .input('EquipmentID', EquipmentID)
//         .input('Name', Name)
//         .input('Model', Model)
//         .input('SerialNumber', SerialNumber)
//         .input('Location', Location)
//         .input('Price', Price)
//         .input('ImageURL', ImageURL)
//         .input('PurchaseDate', PurchaseDate)
//         .query(`
//           UPDATE pprans_equipments
//           SET Name = @Name, Model = @Model, SerialNumber = @SerialNumber, Location = @Location, Price = @Price, ImageURL = @ImageURL, PurchaseDate = @PurchaseDate
//           WHERE EquipmentID = @EquipmentID
//         `);

//       console.log('Equipment updated in DB');
//       return res.status(200).json({ message: 'Equipment updated successfully' });
//     } catch (error) {
//       console.error('Error updating equipment:', error);
//       return res.status(500).json({ error: 'An error occurred while updating equipment' });
//     }
//   } else {
//     // Only allow PUT requests
//     res.setHeader('Allow', ['PUT']);
//     res.status(405).json({ error: `Method ${req.method} not allowed` });
//   }
// }

import { getConnection } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { EquipmentID, Name, Model, SerialNumber, Location, Price, ImageURL, PurchaseDate } = req.body;
    const lastModified = new Date();
    console.log(req.body);

    try {
      // Get MSSQL connection
      const pool = await getConnection();
      console.log('Database connection established');

      // Check if EquipmentID exists
      const equipmentCheck = await pool.request()
        .input('EquipmentID', EquipmentID)
        .query('SELECT COUNT(*) as count FROM pprans_equipments WHERE EquipmentID = @EquipmentID');

      if (equipmentCheck.recordset[0].count === 0) {
        return res.status(400).json({ error: 'EquipmentID does not exist' });
      }

      // Update equipment in the database
      await pool.request()
        .input('EquipmentID', EquipmentID)
        .input('Name', Name)
        .input('Model', Model)
        .input('SerialNumber', SerialNumber)
        .input('Location', Location)
        .input('Price', Price)
        .input('ImageURL', ImageURL)
        .input('PurchaseDate', PurchaseDate)
        .input('lastModified', lastModified)
        .query(`
          UPDATE pprans_equipments
          SET Name = @Name, Model = @Model, SerialNumber = @SerialNumber, Location = @Location, Price = @Price, ImageURL = @ImageURL, PurchaseDate = @PurchaseDate, lastModified = @lastModified
          WHERE EquipmentID = @EquipmentID
        `);

      console.log('Equipment updated in DB');

      // Log the update history
      await pool.request()
        .input('EquipmentID', EquipmentID)
        .input('UpdateDate', lastModified)
        .input('UpdatedFields', JSON.stringify({ Name, Model, SerialNumber, Location, Price, ImageURL, PurchaseDate }))
        .query(`
          INSERT INTO pprans_updatehistory (EquipmentID, UpdateDate, UpdatedFields)
          VALUES (@EquipmentID, @UpdateDate, @UpdatedFields)
        `);

      console.log('Update history logged in DB');
      return res.status(200).json({ message: 'Equipment updated successfully' });
    } catch (error) {
      console.error('Error updating equipment:', error);
      return res.status(500).json({ error: 'An error occurred while updating equipment' });
    }
  } else {
    // Only allow PUT requests
    res.setHeader('Allow', ['PUT']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}