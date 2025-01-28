import sql from 'mssql';
import dotenv from 'dotenv';

// Load environment variables from .env file  
dotenv.config();

// Database configuration  
const dbConfig = {
    server: process.env.DB_SERVER, // Make sure this is set in your .env file  
    database: process.env.DB_DATABASE, // Make sure this is set in your .env file  
    user: process.env.DB_USER, // Make sure this is set in your .env file  
    password: process.env.DB_PASSWORD, // Make sure this is set in your .env file  
    options: {
        encrypt: false, // set to true for Azure, false for local servers  
        trustServerCertificate: true, // Only for local development  
        enableArithAbort: true, // Recommended setting  
    },
    port: 1433, // Default SQL Server port  
};

// Create a connection pool and export a promise  
const poolPromise = sql.connect(dbConfig)
    .then(pool => {
        //you can log console.log('SQL Connected');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit the process if database connection fails  
    });

export { poolPromise };