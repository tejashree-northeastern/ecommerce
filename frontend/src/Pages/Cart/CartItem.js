import React from "react";
import "./cart.css";
import displayToast from "../../utils/displayToast";

const CartItem = ({ item, fetchCartItems }) => {
  console.log("item ", item);
  const onRemove = async () => {
    console.log("item in", item);
    // console.log("itemToRemove " + item);
    const url = "http://localhost:8080/v1/cart/remove/" + item.product.id;
    fetch(url, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          fetchCartItems();
          displayToast({
            type: "success",
            msg: "Product removed successfully from  the cart!",
          });
        }
      })
      .catch((err) => {
        displayToast({ type: "error", msg: "Product was not removed." });
        console.log(err);
      });
  };

  return (
    <div className="cart-item">
      {/* <img src={item.product.img} alt={item.name} /> */}
      {/* <div className="cartIndividual"> */}
      <p>Name: {item.product.name}</p>
      <p>Price: ${item.product.price}</p>
      <p>Quantity: {item.product.stockQuantity}</p>
      <button onClick={onRemove}>Remove</button>
    </div>
    // </div>
  );
};

export default CartItem;
