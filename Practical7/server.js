const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware to log user visits
app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - IP: ${req.ip} - ${req.method} ${req.url}\n`;
    fs.appendFile("visits.log", logEntry, (err) => {
        if (err) console.error("Error logging visit:", err);
    });    next();
});

// API to retrieve log data
app.get("/logs", (req, res) => {
    fs.readFile("visits.log", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Could not read logs" });
        }
        const logs = data.split("\n").filter(Boolean).map((entry) => ({ log: entry }));
        res.json(logs);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
