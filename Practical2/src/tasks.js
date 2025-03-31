// tasks.js
export let tasks = [];

// Function to add a new task
export function addTask(title, dueTime, priority) {
    try {
        if (!title || typeof dueTime !== "number" || !priority) {
            throw new Error("Invalid task data");
        }

        const task = {
            title,
            dueTime: Date.now() + dueTime * 60000,
            priority,
        };
        tasks.push(task);
        console.log(`Task added: ${title}`);
    } catch (error) {
        console.error("Error adding task:", error.message);
    }
}

// Function to sort tasks by priority
export function sortTasks() {
    tasks.sort((a, b) => a.priority - b.priority);
    console.log("Tasks sorted by priority.");
}

// Function to display tasks due within a timeframe
export function getUpcomingTasks(timeframe) {
    const now = Date.now();
    return tasks.filter(task => task.dueTime <= now + timeframe * 60000);
}

// Function to simulate reminders
export function scheduleReminders() {
    tasks.forEach(task => {
        const delay = task.dueTime - Date.now();
        if (delay > 0) {
            setTimeout(() => {
                console.log(`Reminder: ${task.title} is due!`);
            }, delay);
        }
    });
}
