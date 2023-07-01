import React, { Fragment } from "react";
import "./NewProduct.scss";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

const NewProduct = () => {
  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
      </div>
    </Fragment>
  );
};

export default NewProduct;
