const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = []; // In-memory storage

exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword, role });
    res.status(201).json({ message: "User registered" });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true }).json({ message: "Logged in", token });
};

exports.logout = (req, res) => {
    res.clearCookie("token").json({ message: "Logged out" });
};
