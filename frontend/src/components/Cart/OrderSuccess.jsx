import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./OrderSuccess.scss";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  localStorage.removeItem("cartItems");
  return (
    <div className="orderSuccess">
      <FaCheckCircle />

      <Typography>
        <span>Congratulations!</span>
        <br />
        Your Order has been Placed Successfully{" "}
      </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
