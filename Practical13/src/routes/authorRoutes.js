const express = require("express");
const { createAuthor } = require("../controllers/authorController");
const router = express.Router();

router.post("/", createAuthor);

module.exports = router;
    