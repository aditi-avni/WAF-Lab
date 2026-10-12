const express = require("express");
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Aditi" },
    { id: 2, name: "Lahari" }
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

// POST a new student
app.post("/students", (req, res) => {
    students.push(req.body);
    res.status(201).json({ message: "Student added", student: req.body });
});

app.listen(5000, () => {
    console.log("Student API running at http://localhost:5000");
});
