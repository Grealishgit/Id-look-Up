import express from "express";
import cors from "cors";
import { connectDB } from "./config/dbConfig.js";
import "dotenv/config";
import userRoutes from './Routes/userRoute.js'


// App config
const app = express();
const port = process.env.PORT || 4000;


// Middleware
app.use(express.json());

const allowedOrigins = [
    process.env.ADMIN_FRONTEND_URL,
    process.env.USER_FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // ✅ Allow request
        } else {
            console.log("❌ Blocked by CORS:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization,token",
    credentials: true,
};

app.use(cors(corsOptions));




app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// API endpoints
app.use('/', userRoutes)

// Default route
app.get("/", (req, res) => {
    res.send("API Working");
});


// Start server
app.listen(port, () => {
    console.log(`Server Started on Port:${port}`);
});

