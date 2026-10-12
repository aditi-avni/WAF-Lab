
const express = require("express");
const App = express();

App.get("/students", (req, res) => {
    res.send("Student 1:- Aditi\nStudent 2:- Lahari");
});

App.get("/students/:id", (req, res) => {
    const id = req.params.id;
    res.send(`Student ID:- ${id}`);
});

App.get("/faculty", (req, res) => {
    res.send("Faculty Information");
});

App.use((req, res) => {
    res.status(404).send("404 Not Found");
});

App.listen(5000);
