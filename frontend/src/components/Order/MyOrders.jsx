import React, { Fragment, useEffect } from "react";
import "./MyOrders.scss";
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { clearErrors, myOrders } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import { MdLaunch } from "react-icons/md";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        const status = params.value;
        return status === "Processing" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const cellValue = params.id;
        return (
          <Link to={`/order/${cellValue}`}>
            <MdLaunch />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

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
        <div className="myOrdersPage" style={{ marginTop: "9rem" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
