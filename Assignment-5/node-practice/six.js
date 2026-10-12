const express = require("express");
const app = express();

const auth = ((req,res,next)=>{
    if(req.query.role === "admin"){
        next();
    }else{
        res.send("Access denied");
    }
});

app.get("/",(req,res)=>{
    res.send("Welcome to home page");
});

app.get("/dashboard",auth,(req,res)=>{
    res.send("Admin Dashboard");
});

app.listen(3000);