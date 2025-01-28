import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sql from 'mssql';
import dbConfig from '../config/dbConfig.js';

export const signUp = async (req, res) => {
    const { fname, lname, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const pool = await sql.connect(dbConfig);
        await pool.request()
            .input('fname', sql.VarChar, fname)
            .input('lname', sql.VarChar, lname)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .query('INSERT INTO Users (fname, lname, email, password) VALUES (@fname, @lname, @email, @password)');

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        const user = result.recordset[0];
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
};
