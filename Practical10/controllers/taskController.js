const fs = require("fs-extra");
const path = "./tasks.json";

// Read tasks from file
const readTasks = () => {
    try {
        return fs.existsSync(path) ? fs.readJsonSync(path) : [];
    } catch (error) {
        return [];
    }
};

// Write tasks to file
const writeTasks = (tasks) => {
    fs.writeJsonSync(path, tasks, { spaces: 2 });
};

// Get all tasks
exports.getTasks = (req, res) => {
    res.json(readTasks());
};

// Create a new task
exports.createTask = (req, res) => {
    const tasks = readTasks();
    const newTask = { id: Date.now(), ...req.body };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
};

// Get task by ID
exports.getTaskById = (req, res) => {
    const task = readTasks().find(t => t.id == req.params.id);
    task ? res.json(task) : res.status(404).json({ message: "Task not found" });
};

// Update task by ID
exports.updateTask = (req, res) => {
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: "Task not found" });

    tasks[index] = { ...tasks[index], ...req.body };
    writeTasks(tasks);
    res.json(tasks[index]);
};

// Delete task by ID
exports.deleteTask = (req, res) => {
    let tasks = readTasks();
    const filteredTasks = tasks.filter(t => t.id != req.params.id);
    if (tasks.length === filteredTasks.length) return res.status(404).json({ message: "Task not found" });

    writeTasks(filteredTasks);
    res.json({ message: "Task deleted" });
};
