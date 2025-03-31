const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);
