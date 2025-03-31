const express = require("express");
const fs = require("fs-extra");
const bodyParser = require("body-parser");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/tasks", taskRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
