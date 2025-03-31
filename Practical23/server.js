const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let tasks = [];
let idCounter = 1;

// Create Task
app.post("/tasks", (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTask = { id: idCounter++, title, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Get All Tasks
app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// Update Task
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = tasks.find(t => t.id === parseInt(id));
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    
    res.status(200).json(task);
});

// Delete Task
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(t => t.id === parseInt(id));
    if (index === -1) return res.status(404).json({ error: "Task not found" });

    tasks.splice(index, 1);
    res.status(200).json({ message: "Task deleted" });
});

module.exports = app;
