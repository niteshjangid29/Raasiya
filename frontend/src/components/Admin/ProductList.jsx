import React, { Fragment, useEffect } from "react";
import "./ProductList.scss";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { clearErrors, getAdminProduct } from "../../actions/productActions";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 170,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        const cellValue = params.id;
        return (
          <Fragment>
            <Link to={`/admin/product/${cellValue}`}>
              <MdEdit />
            </Link>

            <Button>
              <MdDelete />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      <MetaData title="All Products - Admin" />

      <div className="dashboard">
        <Sidebar />

        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
