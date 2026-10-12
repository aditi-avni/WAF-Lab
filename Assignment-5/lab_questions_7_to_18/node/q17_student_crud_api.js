const express = require("express");
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Aditi", branch: "CSE" },
    { id: 2, name: "Lahari", branch: "IT" }
];

// GET all students
app.get("/students", (req, res) => {
    res.json(students);
});

// GET student by ID
app.get("/students/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            res.json(students[i]);
            found = true;
            break;
        }
    }

    if (found === false) {
        res.status(404).json({ message: "Student not found" });
    }
});

// POST a student
app.post("/students", (req, res) => {
    students.push(req.body);
    res.status(201).json({ message: "Student added", student: req.body });
});

// PUT - update a student
app.put("/students/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            students[i] = req.body;
            students[i].id = id;
            res.json({ message: "Student updated", student: students[i] });
            found = true;
            break;
        }
    }

    if (found === false) {
        res.status(404).json({ message: "Student not found" });
    }
});

// DELETE a student
app.delete("/students/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < students.length; i++) {
        if (students[i].id === id) {
            students.splice(i, 1);
            res.json({ message: "Student deleted" });
            found = true;
            break;
        }
    }

    if (found === false) {
        res.status(404).json({ message: "Student not found" });
    }
});

app.listen(5000, () => {
    console.log("Student CRUD API running at http://localhost:5000");
});
