import express from "express";
import mongoose from "mongoose";
import userRoutes from "./router/user.router.js";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cors from "cors";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRoutes);

// MongoDB connection
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB database connected');  
    } catch (error) {
        console.log('MongoDB database connection failed');
    }
}
// Start server
app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`)
});
