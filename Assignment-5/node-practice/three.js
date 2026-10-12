const express = require("express");
const app = express();

app.get("/",(req,res)=>{
    res.send("Welcome to ExpressJS");
});

app.get("/",(req,res)=>{
    res.send("welcome to expressJS");
});

app.get("/about",(req,res) => {
    res.send("NodeJS Laboratory");
});

app.use((req,res)=>{
    res.status(404).send("404 not found");
});

app.listen(5000);