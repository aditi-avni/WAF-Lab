const express = require("express");
const app = express();

app.use(express.json());

// Middleware to log every request
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

let employees = [
    { id: 1, name: "Ravi", department: "IT" },
    { id: 2, name: "Maya", department: "HR" }
];

// GET all employees
app.get("/employees", (req, res) => {
    res.json(employees);
});

// GET employee by ID
app.get("/employees/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id === id) {
            res.json(employees[i]);
            found = true;
            break;
        }
    }

    if (found === false) {
        res.status(404).json({ message: "Employee not found" });
    }
});

// POST a new employee
app.post("/employees", (req, res) => {
    employees.push(req.body);
    res.status(201).json({ message: "Employee added", employee: req.body });
});

app.listen(5000, () => {
    console.log("Employee API running at http://localhost:5000");
});
