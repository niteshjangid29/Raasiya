import React, { Fragment } from "react";
import "./Cart1.scss";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HeaderCart from "./HeaderCart";
import { addItemsToCart, removeItemFromCart } from "../../actions/cartActions";

const Cart1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharges + tax;

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (quantity >= stock) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;

    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCardItems = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const placeOrderHandler = () => {
    const data = { subtotal, shippingCharges, tax, totalPrice };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/checkout/address");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <MdRemoveShoppingCart className="remove-icon" />
          <p>Your Cart is Empty</p>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <div className="container">
          <div className="cartBag">
            <div className="cartBagItems">
              <h3>
                {cartItems.length} {cartItems.length > 1 ? "Items" : "Item"} in
                Cart
              </h3>
              {cartItems &&
                cartItems.map((item) => (
                  <HeaderCart
                    key={item.product}
                    item={item}
                    deleteCardItems={deleteCardItems}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                  />
                ))}
            </div>
            <div className="cartBagPayment">
              <div>
                <h3>
                  Price Details{" "}
                  <span>
                    ({cartItems.length}{" "}
                    {cartItems.length > 1 ? "Items" : "Item"})
                  </span>
                </h3>
              </div>
              <div>
                <p>Subtotal:</p>
                <span>Rs. {subtotal}</span>
              </div>
              <div>
                <p>
                  Shipping Charges
                  <br />
                  (free above 1000):
                </p>
                <span>Rs. {shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>Rs. {tax}</span>
              </div>
              <hr />
              <div>
                <p>
                  <strong>Total:</strong>
                </p>
                <span>
                  <strong>Rs. {totalPrice}</strong>
                </span>
              </div>

              <button className="myBtn" onClick={placeOrderHandler}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Cart1;
