const BlogPost = require("../models/BlogPost");

exports.createBlogPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const blogPost = new BlogPost({ title, content, author });
        await blogPost.save();
        res.status(201).json(blogPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.find().populate("author");
        res.json(blogPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlogPostById = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id).populate("author");
        if (!blogPost) return res.status(404).json({ error: "Blog post not found" });
        res.json(blogPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBlogPost = async (req, res) => {
    try {
        await BlogPost.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog post deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
