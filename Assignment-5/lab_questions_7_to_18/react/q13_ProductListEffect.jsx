import React, { useState, useEffect } from "react";

export default function App() {
    const [products, setProducts] = useState(["Pen", "Book"]);
    const [message, setMessage] = useState("Product list ready");
    const [newProduct, setNewProduct] = useState("");

    useEffect(() => {
        setMessage("Product list was modified");
    }, [products]);

    function addProduct() {
        if (newProduct !== "") {
            setProducts([...products, newProduct]);
            setNewProduct("");
        }
    }

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>{product}</li>
                ))}
            </ul>

            <input
                value={newProduct}
                onChange={(e) => setNewProduct(e.target.value)}
                placeholder="Enter product"
            />
            <button onClick={addProduct}>Add Product</button>
            <p>{message}</p>
        </div>
    );
}
