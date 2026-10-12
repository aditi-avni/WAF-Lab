const express = require("express");
const app = express();

app.use((req,res,next)=>{
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Date and Time:", new Date().toLocaleString());  
    next();
});

app.get("/",(req,res) => {
    res.send("welcome to home page");
});



app.listen(5000);