import { useState } from 'react';

function Product({ name, price, addToCart }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ₹{price}</p>

      <button onClick={() => addToCart({ name, price })}>
        Add to Cart
      </button>
    </div>
  );
}

function Cart({ cart, removeFromCart }) {
  return (
    <div>
      <h2>Shopping Cart</h2>

      {cart.map((item, index) => (
        <div key={index}>
          <p>
            {item.name} - ₹{item.price}
          </p>

          <button onClick={() => removeFromCart(index)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart([...cart, product]);
  }

  function removeFromCart(index) {
    setCart(cart.filter((item, i) => i !== index));
  }

  return (
    <div>
      <h1>Shopping Cart</h1>

      <Product
        name="Laptop"
        price={50000}
        addToCart={addToCart}
      />

      <Product
        name="Headphones"
        price={2000}
        addToCart={addToCart}
      />

      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

export default App;