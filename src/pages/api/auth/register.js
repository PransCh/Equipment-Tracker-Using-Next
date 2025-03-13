import { getConnection } from '@/lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
        
    const {username,email,password,role}=req.body
    console.log(req.body)

        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Get MSSQL connection
            const pool = await getConnection();
            console.log('Database connection established');

            console.log(username, email, hashedPassword, role)

            // Insert user into the database
            await pool.request()
                .input('Username', username)
                .input('Email', email)
                .input('PasswordHash', hashedPassword)
                .input('Role', role)
                .query(`
                    INSERT INTO pprans_users (username, email, password, role)
                    VALUES (@Username, @Email, @PasswordHash, @Role)
                `);

            console.log('User inserted into DB');
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error during registration:', error);
            if (error.originalError && error.originalError.info && error.originalError.info.message.includes('UNIQUE')) {
                return res.status(409).json({ error: 'Username already exists' });
            }
            return res.status(500).json({ error: 'An error occurred during registration' });
        }
}