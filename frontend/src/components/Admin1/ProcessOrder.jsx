import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./ProcessOrder.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../layout/Loader/Loader";

const ProcessOrder1 = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id: orderId } = useParams();

  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(orderId, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(orderId));
  }, [alert, error, dispatch, orderId, isUpdated, updateError]);
  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          className="all-products"
        >
          <h1 className="heading">Process Order</h1>
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <div className="processOrder">
                  <div className="cartBag">
                    <div className="cartBagItems">
                      <div className="orderItems">
                        {order.orderStatus && (
                          <div>
                            Order Status :{" "}
                            <strong
                              className={
                                order.orderStatus === "Delivered"
                                  ? "greenColor"
                                  : "redColor"
                              }
                            >
                              {order.orderStatus}
                            </strong>
                          </div>
                        )}

                        {order.orderStatus && (
                          <div
                            className="update-order"
                            style={{
                              display:
                                order.orderStatus === "Delivered"
                                  ? "none"
                                  : "block",
                            }}
                          >
                            <p>Update Order Status</p>

                            <form action="" onSubmit={updateOrderSubmitHandler}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Change Staus
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={status}
                                  label="Change Status"
                                  onChange={(e) => setStatus(e.target.value)}
                                >
                                  {/* <MenuItem value="Processing">
                                    {" "}
                                    Processing
                                  </MenuItem> */}
                                  {order.orderStatus === "Processing" && (
                                    <MenuItem value="Shipped">Shipped</MenuItem>
                                  )}
                                  {order.orderStatus === "Shipped" && (
                                    <MenuItem value="Delivered">
                                      Delivered{" "}
                                    </MenuItem>
                                  )}
                                </Select>
                              </FormControl>
                              <button
                                disabled={loading ? true : false}
                                className="myBtn"
                              >
                                Process Order
                              </button>
                            </form>
                          </div>
                        )}

                        {order.orderStatus && (
                          <div>
                            <p>
                              Delivered on{" "}
                              {new Date(order.deliveredAt).toLocaleString(
                                "en-IN",
                                {
                                  timeZone: "Asia/Kolkata",
                                }
                              )}
                            </p>
                          </div>
                        )}
                        {order &&
                          order.orderItems &&
                          order.orderItems.map((product) => (
                            <Link
                              to={`/product/${product._id}`}
                              key={product._id}
                            >
                              <div className="orderItem">
                                <div className="left">
                                  <img src={product.image} alt="product img" />
                                </div>
                                <div className="right">
                                  <p>
                                    <strong>{product.name}</strong>{" "}
                                  </p>
                                  <p>Rs. {product.price}</p>
                                  <p>Quantity: {product.quantity}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </div>
                    <div className="cartBagPayment">
                      <div>
                        <h3>
                          Order Details{" "}
                          {order && order.orderItems && (
                            <span>
                              ( {order.orderItems.length}
                              {order.orderItems.length > 1 ? " Items" : " Item"}
                              )
                            </span>
                          )}
                        </h3>
                      </div>
                      <div>
                        <p>Order Id: {orderId}</p>
                      </div>
                      <div>
                        <p>
                          Order placed on{" "}
                          {new Date(order.createdAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                          })}
                        </p>
                      </div>

                      <hr />

                      <div>
                        <h3>Payment Info</h3>
                      </div>
                      <div className="payment-info">
                        {order && order.paymentInfo && (
                          <>
                            <p>Payment Id: {order.paymentInfo.id}</p>
                            <p
                              className={
                                order.paymentInfo.status === "success"
                                  ? "greenColor"
                                  : "redColor"
                              }
                            >
                              <strong>
                                {order.paymentInfo.status === "success"
                                  ? "PAID"
                                  : "NOT PAID"}
                              </strong>
                            </p>
                            <p>Items Price : {order.itemsPrice}</p>
                            <p>Tax : {order.taxPrice}</p>
                            <p>Shipping Charges : {order.shippingPrice}</p>
                            <p>
                              <strong>Total : {order.totalPrice}</strong>
                            </p>
                          </>
                        )}
                      </div>

                      <hr />
                      <div>
                        <h3>Shipping Address</h3>
                      </div>
                      <div className="address">
                        <p>
                          {order && order.user && (
                            <strong>{order.user.name}</strong>
                          )}
                        </p>
                        {order && order.shippingInfo && (
                          <>
                            <p>
                              {order.shippingInfo.address},{" "}
                              {order.shippingInfo.city},{" "}
                              {order.shippingInfo.state},{" "}
                              {order.shippingInfo.pinCode},{" "}
                              {order.shippingInfo.country}
                            </p>
                            <p>Phone: {order.shippingInfo.phoneNumber}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Paper>
            )}
          </Fragment>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ProcessOrder1;
