import express from "express";
import cors from "cors";
import { connectDB } from "./config/dbConfig.js";
import "dotenv/config";
import userRoutes from "./Routes/userRoute.js";
import reportRoutes from "./Routes/reportRoute.js"
import applyRoutes from "./Routes/applyRoute.js"
import authenticateToken from "./middlewares/authUser.js";

// App config
const app = express();
app.use(express.json());
const port = process.env.PORT || 4000;

// Middleware

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
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// API Endpoints
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/apply", applyRoutes);

// Protected Route Example
app.get("/dashboard", authenticateToken, (req, res) => {
    res.json({ message: "Welcome to the Dashboard!", user: req.user });
});

// Default route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server Started on Port:${port}`);
});
