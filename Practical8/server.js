const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");

app.use(express.json()); // Middleware to parse JSON
app.use("/products", productRoutes); // Mount product routes

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
