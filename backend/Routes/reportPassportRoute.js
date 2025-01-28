import express from 'express';
import { poolPromise } from '../config/dbConfig.js';
import sql from 'mssql';

const router = express.Router();

// In reportPassportRoute.js
router.post('/report-lost', async (req, res) => {
    const {
        abstractNumber,
        passportNumber,
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
    } = req.body;

    // Validation for required fields
    if (
        !abstractNumber ||
        !passportNumber ||
        !firstName ||
        !lastName ||
        !email ||
        !phoneNumber
    ) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const pool = await poolPromise;
        const request = pool.request();

        // Check if the abstract number already exists
        const checkResult = await request
            .input('abstractNumber', sql.NVarChar, abstractNumber)
            .query(`
                SELECT COUNT(*) AS count 
                FROM reportpassports 
                WHERE abstractNumber = @abstractNumber;
            `);

        if (checkResult.recordset[0].count > 0) {
            return res.status(400).json({ message: 'A report with this abstract number already exists.' });
        }

        // Insert the new report
        await request
            .input('passportNumber', sql.NVarChar, passportNumber)
            .input('firstName', sql.NVarChar, firstName)
            .input('middleName', sql.NVarChar, middleName)
            .input('lastName', sql.NVarChar, lastName)
            .input('email', sql.NVarChar, email)
            .input('phoneNumber', sql.NVarChar, phoneNumber);

        await request.query(`
            INSERT INTO reportpassports (  
                abstractNumber,  
                passportNumber,  
                firstName,  
                middleName,  
                lastName,  
                email,  
                phoneNumber,  
                createdAt  
            ) VALUES (  
                @abstractNumber, 
                @passportNumber, 
                @firstName,  
                @middleName,  
                @lastName,     
                @email,  
                @phoneNumber,  
                GETDATE()  
            );
        `);

        res.status(201).json({ message: 'Report submitted successfully!' });
    } catch (error) {
        console.error('Error inserting report:', error);
        res.status(500).json({ message: 'Failed to submit report. Please try again.' });
    }
});


router.get('/api/check-abstract/:abstractNumber', async (req, res) => {
    const { abstractNumber } = req.params;

    try {
        const pool = await poolPromise;  // Get database connection
        const result = await pool.request()
            .input('abstractNumber', sql.NVarChar, abstractNumber)
            .query('SELECT COUNT(*) AS count FROM reportpassports WHERE abstractNumber = @abstractNumber'); // Ensure the table name matches

        if (result.recordset[0].count > 0) {
            return res.status(400).json({ message: 'Abstract number already exists.' });
        } else {
            return res.status(200).json({ message: 'Abstract number is available.' });
        }
    } catch (error) {
        console.error('Error checking abstract number:', error);
        return res.status(500).json({ message: 'Error checking abstract number.' });
    }
});

export default router;
