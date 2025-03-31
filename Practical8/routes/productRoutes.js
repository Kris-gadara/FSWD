const express = require("express");
const router = express.Router();
const products = require("../data/products");

// GET /products - Return all products
router.get("/", (req, res) => {
    const { category } = req.query;
    if (category) {
        const filteredProducts = products.filter(p => p.category === category);
        return res.json(filteredProducts);
    }
    res.json(products);
});

// GET /products/:id - Fetch a specific product by ID
router.get("/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
});

module.exports = router;
