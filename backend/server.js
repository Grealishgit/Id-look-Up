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
const port = process.env.PORT || 4000;
connectDB();


// Middleware
app.use(express.json())
app.use(cors())

// Database connection


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
