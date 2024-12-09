import React, { useState } from "react";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import "./cart.css";

function CartLayout({ items, fetchCartItems }) {
  const total = items.reduce(
    // (acc, item) => acc + item.price * item.quantity,
    (acc, item) => acc + item.product.price * item.product.stockQuantity,
    0
  );

  return (
    <div className="cart-layout">
      {/* <h3>Shopping Cart</h3> */}
      <div className="cart">
        {items.length > 0 &&
          items.map((item, index) => (
            <CartItem key={index} item={item} fetchCartItems={fetchCartItems} />
          ))}
      </div>
      <h3 style={{ height: "50px", width: "300px", alignContent: "center" }}>
        Total: ${total.toFixed(2)}
      </h3>
      <Link to="/shopping">
        <button style={{ height: "50px", width: "300px" }}>
          Continue Shopping
        </button>
      </Link>
      <Link to="/Checkout">
        <button style={{ height: "50px", width: "300px" }}>
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
}

export default CartLayout;
