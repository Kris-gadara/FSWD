require('dotenv').config();  // Load environment variables
const express = require('express');  // Import Express.js
const mongoose = require('mongoose'); // Import Mongoose
const User = require('./models/user'); // Import User Model

// Initialize Express
const app = express();
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Add a new user (POST request)
app.post('/add-user', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.json({ message: '✅ User added successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Fetch all users (GET request)
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
