import express from "express";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import cors from "cors";

// Initialize Express app
const app = express();
const PORT = 3000;

// MongoDB URI
const mongoURI = "mongodb://localhost:27017/ytlogin";

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => console.error(`MongoDB connection error: ${err}`));
db.once('open', () => console.log(`MongoDB connected successfully`));

// Define User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// Create User model
const User = mongoose.model('User', userSchema);

// Register Endpoint
app.post('/register', async (req, res) => {
    try {
        // Validate request body
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save user to database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // Send back saved user data
    } catch (error) {
        console.error(`Error during registration: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
