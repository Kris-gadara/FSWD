const express = require("express");
const { createBlogPost, getAllBlogPosts, getBlogPostById, deleteBlogPost } = require("../controllers/blogPostController");
const router = express.Router();

router.post("/", createBlogPost);
router.get("/", getAllBlogPosts);
router.get("/:id", getBlogPostById);
router.delete("/:id", deleteBlogPost);

module.exports = router;
