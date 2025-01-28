import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { poolPromise } from './config/dbConfig.js'; // Database pool  
import userRoute from './Routes/userRoute.js';
import reportRoute from './Routes/reportRoute.js'; // Import the report route  
import reportPassportRoute from './Routes/reportPassportRoute.js';

dotenv.config();

const app = express();

// Middleware  
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST'],       // Allow necessary methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
}));

app.use(express.json());

// Connect to the database before starting the server  
const connectDB = async () => {
    try {
        await poolPromise; // Ensure connection pool is initialized  
        console.log('Connected✅ to SQL Server Successfully👌');
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit if database connection fails  
    }
};

// Use Routes  
app.use('/api/auth', userRoute);  // Handle user authentication routes (login/signup)
app.use('/api/user', userRoute);  // Handle user profile routes
app.use('/', reportRoute);        // Report routes
app.use('/api', reportPassportRoute);

// Ensure the DB is connected before starting the server  
connectDB().then(() => {
    console.log('Database Connected💪..👍..✊.Good To Go🤪');

    // Default Route  
    app.get('/', (req, res) => {
        res.send('API IS WORKING');
        console.log('Api working');
    });

    // Start the server  
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on port🤜🤛 ${PORT}`);
    });
});
