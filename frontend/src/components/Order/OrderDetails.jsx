import React, { Fragment, useEffect } from "react";
import "./OrderDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getOrderDetails } from "../../actions/orderActions";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [alert, error, dispatch, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />

          <div className="orderDetailsPage">
            <div className="container">
              <div className="cartBag">
                <div className="cartBagItems">
                  <h3>My Orders</h3>

                  <div className="myOrderItems">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div className="orderItem" key={item.product}>
                          <img src={item.image} alt="Product" />
                          <div>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                            <span>
                              {item.quantity} x Rs.{item.price} ={" "}
                              <b>Rs.{item.price * item.quantity}</b>
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="cartBagPayment">
                  <div>
                    <h3>
                      Order Details{" "}
                      {order.orderItems && (
                        <span>
                          ({order.orderItems.length}{" "}
                          {order.orderItems.length > 1 ? "Items" : "Item"})
                        </span>
                      )}
                    </h3>
                  </div>
                  <div>
                    <p>
                      Order ID: <span>{order._id}</span>
                    </p>
                  </div>
                  <hr />
                  <div>
                    <h4>Order Payment Details</h4>
                  </div>
                  <div>
                    <p>Order Amount:</p>
                    <span>Rs. {order.totalPrice}</span>
                  </div>
                  <div>
                    <p>
                      Shipping Charges
                      <br />
                      (free above 1000):
                    </p>
                    {/* <span>Rs. {shippingCharges}</span> */}
                  </div>
                  <div>
                    <p>GST:</p>
                    {/* <span>Rs. {tax}</span> */}
                  </div>
                  <hr />
                  <div>
                    <p>
                      <strong>Total:</strong>
                    </p>
                    <span>{/* <strong>Rs. {totalPrice}</strong> */}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNumber}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "success"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo && order.paymentInfo.status === "success"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div> */}

            {/* <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} x Rs.{item.price} ={" "}
                        <b>Rs.{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div> */}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
