
const express = require("express");
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Aditi" },
    { id: 2, name: "Lahari" }
];

// Get all students
app.get("/students", (req, res) => {
    res.json(students);
});

// Get student by ID
app.get("/students/:id", (req, res) => {
    let id = Number(req.params.id);
    res.json(students[id - 1] || { message: "Student not found" });
});

// Add a student
app.post("/students", (req, res) => {
    students.push(req.body);
    res.json({ message: "Student added successfully" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
