module.exports = (req, res, next) => {
    try {
        const { title, status } = req.body;
        if (!title || typeof title !== "string") {
            return res.status(400).json({ message: "Invalid title" });
        }
        if (!status || !["pending", "completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
