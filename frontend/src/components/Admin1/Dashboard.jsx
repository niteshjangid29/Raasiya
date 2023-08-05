import { Box, Paper } from "@mui/material";
import "./Dashboard.scss";
import React, { Fragment } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const Dashboard1 = () => {
  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          className="all-products"
        >
          <h1 className="heading">Dashboard</h1>

          <Fragment>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <div className="myDashboard">
                <div className="total-amount">
                  <p>
                    Total Amount <br /> ₹0
                  </p>
                </div>
                <div className="total-items">
                  <Link to="/admin/products">
                    <p>Products</p>
                  </Link>
                  <Link to="/admin/orders">
                    <p>Orders</p>
                  </Link>
                  <Link to="/admin/users">
                    <p>Users</p>
                  </Link>
                  <Link to="/admin/stories">
                    <p>Stories</p>
                  </Link>
                </div>
              </div>
            </Paper>
          </Fragment>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Dashboard1;
