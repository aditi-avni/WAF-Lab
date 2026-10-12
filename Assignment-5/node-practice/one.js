
const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.end("Welcome to NodeJS Lab");
    }
    else if (req.url === "/time") {
        res.end(new Date().toString());
    }
    else {
        res.statusCode = 404;
        res.end("404 Page Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
