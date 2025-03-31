const fs = require("fs");
const path = require("path");

const loggerMiddleware = (req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile(path.join(__dirname, "../logs/server.log"), log, (err) => {
        if (err) console.error("Logging Error:", err);
    });
    next();
};

module.exports = loggerMiddleware;
