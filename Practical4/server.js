const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);
    let ext = path.extname(filePath);
    
    let contentType = "text/html";
    if (ext === ".css") contentType = "text/css";
    if (ext === ".jpg" || ext === ".jpeg") contentType = "";

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === "ENOENT") {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<h1>404 - Page Not Found</h1>", "utf-8");
            } else {
                res.writeHead(500);
                res.end("Server Error");
            }
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
