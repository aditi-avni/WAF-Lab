const express = require("express");
const app = express();

app.use(express.json());

let products = [
    { id: 1, name: "Pen", price: 10 },
    { id: 2, name: "Notebook", price: 50 }
];

// GET all products
app.get("/products", (req, res) => {
    res.json(products);
});

// GET product by ID
app.get("/products/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            res.json(products[i]);
            found = true;
            break;
        }
    }

    if (found === false) {
        res.status(404).json({ message: "Product not found" });
    }
});

// POST a new product
app.post("/products", (req, res) => {
    products.push(req.body);
    res.status(201).json({ message: "Product added", product: req.body });
});

// PUT - update a product
app.put("/products/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            products[i] = req.body;
            products[i].id = id;
            res.json({ message: "Product updated", product: products[i] });
            found = true;
            break;
        }
    }

    if (found === false) {
        res.status(404).json({ message: "Product not found" });
    }
});

// DELETE a product
app.delete("/products/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            products.splice(i, 1);
            res.json({ message: "Product deleted" });
            found = true;
            break;
        }
    }

    if (found === false) {
        res.status(404).json({ message: "Product not found" });
    }
});

app.listen(5000, () => {
    console.log("Product API running at http://localhost:5000");
});
