const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1><p>Welcome to our website.</p>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About Page</h1><p>This is our website.</p>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact Page</h1><p>Email: contact@example.com</p>");
});

app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});
