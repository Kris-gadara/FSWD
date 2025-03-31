// index.js
import { addTask, sortTasks, getUpcomingTasks, scheduleReminders } from "./tasks.js";
import { handleErrors } from "./utils.js";

const safeAddTask = handleErrors(addTask);

safeAddTask("Submit assignment", 5, 1);
safeAddTask("Meeting with team", 15, 2);
safeAddTask("Workout", 30, 3);

sortTasks();
console.log("Upcoming tasks:", getUpcomingTasks(10));

scheduleReminders();
