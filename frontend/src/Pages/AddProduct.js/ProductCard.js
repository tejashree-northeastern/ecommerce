import React from "react";
import axios from "axios";
import "./product.css";
import displayToast from "../../utils/displayToast";

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    const url = "http://localhost:8080/v1/cart/add/" + product.id;
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          displayToast({
            type: "success",
            msg: "Product added successfully to  the cart!",
          });
        }
      })
      .catch((err) => {
        displayToast({ type: "error", msg: "Product addition unsuccessful." });
        console.log(err);
      });
  };

  return (
    <div>
      <div className="card">
        {/* <img src={product.imgUrl} alt={product.name} /> */}
        <div className="card-body">
          <p>Name: {product.name}</p>
          <p>Quantity: {product.stockQuantity}</p>
          <p>Price: ${product.price}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
