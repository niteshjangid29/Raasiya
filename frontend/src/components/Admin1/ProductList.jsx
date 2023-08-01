import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./NewProduct.scss";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../actions/productActions";
import { MdDelete, MdEdit } from "react-icons/md";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Loader from "../layout/Loader/Loader";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProductList1 = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "id", label: "Product ID", minWidth: 200, flex: 0.5 },
    {
      id: "name",
      label: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      id: "stock",
      label: "Stock",
      minWidth: 150,
      flex: 0.3,
    },
    {
      id: "price",
      label: "Price",
      minWidth: 170,
      flex: 0.4,
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 230,
      flex: 0.4,
    },
  ];

  const renderCell = (item) => {
    const product_id = item._id;
    return (
      <Fragment>
        <Link to={`/product/${product_id}`}>
          <Button>{<BsBoxArrowUpRight />}</Button>
        </Link>
        <Link to={`/admin/product/${product_id}`}>
          <Button>
            <MdEdit />
          </Button>
        </Link>

        <Button onClick={() => deleteProductHandler(product_id)}>
          <MdDelete />
        </Button>
      </Fragment>
    );
  };

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.unshift({
        id: item._id,
        name: item.name,
        stock: item.Stock,
        price: `Rs. ${item.price}`,
        actions: renderCell(item),
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product deleted successfully");
      navigate("/admin/products1");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box
              component="main"
              sx={{ flexGrow: 1, p: 3 }}
              className="all-products"
            >
              <h1 className="heading">Products List</h1>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 700 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <StyledTableRow>
                        {columns.map((column) => (
                          <StyledTableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ color: "blue" }}
                                  >
                                    {/* {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value} */}
                                    {column.id === "stock" ? (
                                      <span
                                        className={
                                          row[column.id] === 0
                                            ? "redColor"
                                            : "greenColor"
                                        }
                                      >
                                        {column.format &&
                                        typeof value === "number"
                                          ? column.format(value)
                                          : value}
                                      </span>
                                    ) : (
                                      <span className="blackColor">
                                        {column.format &&
                                        typeof value === "number"
                                          ? column.format(value)
                                          : value}
                                      </span>
                                    )}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Box>
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductList1;
