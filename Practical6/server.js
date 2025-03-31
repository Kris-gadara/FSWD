const http = require("http");
const fs = require("fs");
const url = require("url");

// File to store user data
const USERS_FILE = "users.json";

// Helper function to read users from the file
function readUsers() {
    try {
        const data = fs.readFileSync(USERS_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return []; // Return empty array if file doesn't exist or is empty
    }
}

// Helper function to write users to the file
function writeUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Create HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;

    // Set JSON response header
    res.setHeader("Content-Type", "application/json");

    // GET /users - Return all users
    if (method === "GET" && parsedUrl.pathname === "/users") {
        const users = readUsers();
        res.writeHead(200);
        res.end(JSON.stringify(users));
    }

    // POST /users - Add a new user
    else if (method === "POST" && parsedUrl.pathname === "/users") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const newUser = JSON.parse(body);
                if (!newUser.id || !newUser.name || !newUser.email) {
                    throw new Error("Missing required fields: id, name, email");
                }

                const users = readUsers();
                users.push(newUser);
                writeUsers(users);

                res.writeHead(201);
                res.end(JSON.stringify({ message: "User added successfully" }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    }

    // DELETE /users/:id - Remove a user by ID
    else if (method === "DELETE" && parsedUrl.pathname.startsWith("/users/")) {
        const userId = parsedUrl.pathname.split("/")[2];
        let users = readUsers();
        const initialLength = users.length;
        users = users.filter(user => user.id !== userId);

        if (users.length === initialLength) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: "User not found" }));
        } else {
            writeUsers(users);
            res.writeHead(200);
            res.end(JSON.stringify({ message: "User deleted successfully" }));
        }
    }

    // Handle unknown routes
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
