import React from "react";
import "./CartItemsCard.css";
import { Link } from "react-router-dom";

const CartItemsCard = ({ item, deleteCardItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: Rs ${item.price}`}</span>
        <p onClick={() => deleteCardItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemsCard;
