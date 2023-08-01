import React, { Fragment, useEffect } from "react";
import "./MyOrders.scss";
// import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
// import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { clearErrors, myOrders } from "../../actions/orderActions";
import { Link } from "react-router-dom";
// import { MdLaunch } from "react-icons/md";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  // const columns = [
  //   { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     minWidth: 150,
  //     flex: 0.5,
  //     cellClassName: (params) => {
  //       const status = params.value;
  //       return status === "Processing" ? "greenColor" : "redColor";
  //     },
  //   },
  //   {
  //     field: "itemsQty",
  //     headerName: "Items Qty",
  //     type: "number",
  //     minWidth: 150,
  //     flex: 0.3,
  //   },
  //   {
  //     field: "amount",
  //     headerName: "Amount",
  //     type: "number",
  //     minWidth: 270,
  //     flex: 0.5,
  //   },
  //   {
  //     field: "actions",
  //     flex: 0.3,
  //     headerName: "Actions",
  //     minWidth: 150,
  //     type: "number",
  //     sortable: false,
  //     renderCell: (params) => {
  //       const cellValue = params.id;
  //       return (
  //         <Link to={`/order/${cellValue}`}>
  //           <MdLaunch />
  //         </Link>
  //       );
  //     },
  //   },
  // ];
  // const rows = [];

  // orders &&
  //   orders.forEach((item, index) => {
  //     rows.push({
  //       itemsQty: item.orderItems.length,
  //       id: item._id,
  //       status: item.orderStatus,
  //       amount: item.totalPrice,
  //     });
  //   });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [error, alert, dispatch]);
  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrders">
          {/* {cartItems.length === 0 ? (
            <div className="emptyCart">
              <MdRemoveShoppingCart className="remove-icon" />
              <p>Your Cart is Empty</p>
              <Link to="/products">View Products</Link>
            </div>
          ) : ( */}
          <div className="container">
            <div className="cartBag">
              <div className="cartBagPayment">
                <div>
                  <h3>
                    Price Details{" "}
                    <span>
                      {/* ({cartItems.length}{" "} */}
                      {/* {cartItems.length > 1 ? "Items" : "Item"}) */}
                    </span>
                  </h3>
                </div>
                <div>
                  <p>Subtotal:</p>
                  {/* <span>Rs. {subtotal}</span> */}
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
              <div className="cartBagItems">
                <h3>My Orders</h3>

                <div className="myOrderItems">
                  {orders.map((order) => (
                    <Link to={`/order/${order._id}`} key={order._id}>
                      <div className="orderItem">
                        <p>{order._id} </p>
                        <p>{order.orderStatus}</p>
                        <p>Rs. {order.totalPrice}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
