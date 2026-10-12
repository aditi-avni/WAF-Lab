const http = require("http");
const math = require("./math");

let a = 10;
let b = 20;

const sum = math.add(a,b);
const mul = math.mul(a,b);

const server = http.createServer((req,res)=>{
    res.end(`number 1:- ${a}, number 2:- ${b} \n sum = ${sum} , multipliaction = ${mul}`);
});

server.listen(3000)