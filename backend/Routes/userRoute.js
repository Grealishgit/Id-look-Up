import express from 'express';
import { poolPromise } from '../config/dbConfig.js'; // Database connection pool
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sql from 'mssql';

const router = express.Router();

// POST request to login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await poolPromise;

        // Check if the user exists
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        const user = result.recordset[0];
        if (!user) return res.status(400).json({ message: 'User not found' });

        // Compare the password
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Incorrect password' });

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST request to signup
router.post('/signup', async (req, res) => {
    const { fname, lname, email, password } = req.body;

    try {
        if (!fname || !lname || !email || !password) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (result.recordset.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user
        await pool.request()
            .input('fname', sql.VarChar, fname)
            .input('lname', sql.VarChar, lname)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .query('INSERT INTO Users (fname, lname, email, password) VALUES (@fname, @lname, @email, @password)');

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET request to fetch user profile
router.get('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const pool = await poolPromise;

        // Fetch the user data excluding password
        const result = await pool.request()
            .input('id', sql.Int, decoded.id)
            .query('SELECT fname, lname, email FROM Users WHERE id = @id');  // Removed password

        const user = result.recordset[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);  // Send user data without the password
    } catch (error) {
        console.error('Error in /profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// PUT request to update user profile
router.put('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const { fname, lname, email, idNumber, homeCounty, phone } = req.body;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const pool = await poolPromise;

        await pool.request()
            .input('id', sql.Int, decoded.id)
            .input('fname', sql.VarChar, fname)
            .input('lname', sql.VarChar, lname)
            .input('email', sql.VarChar, email)
            .input('idNumber', sql.VarChar, idNumber)
            .input('homeCounty', sql.VarChar, homeCounty)
            .input('phone', sql.VarChar, phone)
            .query(`
                UPDATE Users
                SET fname = @fname, lname = @lname, email = @email, idNumber = @idNumber, homeCounty = @homeCounty, phone = @phone
                WHERE id = @id
            `);

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
