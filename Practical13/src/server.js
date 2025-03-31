require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env file");
    process.exit(1);
}

mongoose.connect(MONGO_URI) // ✅ Removed deprecated options
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ Error connecting to MongoDB:", err.message);
        process.exit(1);
    });

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
