const express = require("express");
const app = express();

app.use(express.json());

let books = [
    { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien" },
    { id: 2, title: "Matilda", author: "Roald Dahl" }
];

// GET all books
app.get("/books", (req, res) => {
    res.json(books);
});

// POST a new book
app.post("/books", (req, res) => {
    books.push(req.body);
    res.status(201).json({ message: "Book added", book: req.body });
});

// PUT - update a book
app.put("/books/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            books[i] = req.body;
            books[i].id = id;
            res.json({ message: "Book updated", book: books[i] });
            found = true;
            break;
        }
    }

    if (found === false) {
        res.status(404).json({ message: "Book not found" });
    }
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            books.splice(i, 1);
            res.json({ message: "Book deleted" });
            found = true;
            break;
        }
    }

    if (found === false) {
        res.status(404).json({ message: "Book not found" });
    }
});

app.listen(5000, () => {
    console.log("Books API running at http://localhost:5000");
});
