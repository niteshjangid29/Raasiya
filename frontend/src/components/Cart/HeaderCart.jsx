import React from "react";
import { Link } from "react-router-dom";

const HeaderCart = ({
  item,
  deleteCardItems,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="HeaderCartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>Rs. {item.price}</span>
        <div>
          <div className="cart-p-quantity">
            <button
              onClick={() => decreaseQuantity(item.product, item.quantity)}
            >
              -
            </button>
            <input readOnly type="number" value={item.quantity} />
            <button
              onClick={() =>
                increaseQuantity(item.product, item.quantity, item.stock)
              }
            >
              +
            </button>
          </div>
          <p onClick={() => deleteCardItems(item.product)}>Remove</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderCart;
