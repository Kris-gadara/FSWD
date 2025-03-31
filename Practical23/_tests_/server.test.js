const request = require("supertest");
const app = require("../server");

describe("Task API Endpoints", () => {
    let taskId;

    // Test Task Creation
    it("should create a new task", async () => {
        const res = await request(app)
            .post("/tasks")
            .send({ title: "Test Task", description: "This is a test task" });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.title).toBe("Test Task");

        taskId = res.body.id; // Save ID for later tests
    });

    // Test Get All Tasks
    it("should retrieve all tasks", async () => {
        const res = await request(app).get("/tasks");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });

    // Test Update Task
    it("should update a task", async () => {
        const res = await request(app)
            .put(`/tasks/${taskId}`)
            .send({ title: "Updated Task", description: "Updated description" });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe("Updated Task");
    });

    // Test Delete Task
    it("should delete a task", async () => {
        const res = await request(app).delete(`/tasks/${taskId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Task deleted");
    });
});
