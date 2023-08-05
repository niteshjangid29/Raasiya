import React, { Fragment, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import Sidebar from "./Sidebar";
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
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from "../../actions/orderActions";
import { getAllUsers } from "../../actions/userActions";
import { MdDelete, MdEdit } from "react-icons/md";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

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

const OrdersList1 = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "id", label: "Order ID", minWidth: 200, flex: 1 },
    { id: "user", label: "User", minWidth: 150, flex: 1 },
    {
      id: "status",
      label: "Status",
      minWidth: 140,
      flex: 0.5,
    },
    {
      id: "itemsQty",
      label: "Items Qty",
      minWidth: 130,
      flex: 0.4,
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 150,
      flex: 0.5,
    },
    { id: "date", label: "Created Date", minWidth: 170, flex: 1 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 170,
      flex: 1,
    },
  ];

  const renderCell = (order) => {
    const order_id = order._id;
    return (
      <Fragment>
        <Link to={`/admin/order1/${order_id}`}>
          <Button>
            <MdEdit />
          </Button>
        </Link>

        <Button onClick={() => deleteOrderHandler(order_id)}>
          <MdDelete />
        </Button>
      </Fragment>
    );
  };

  const rows = [];

  orders &&
    orders.forEach((order) => {
      const user = users && users.find((user) => user._id === order.user);
      rows.unshift({
        id: order._id,
        user: user ? user.name : "Unknown User",
        status: order.orderStatus,
        itemsQty: order.orderItems.length,
        amount: `Rs. ${order.totalPrice}`,
        date: new Date(order.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        }),
        actions: renderCell(order),
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
      alert.success("Order deleted successfully");
      navigate("/admin/orders1");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);
  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          className="all-products"
        >
          <h1 className="heading">Orders List</h1>
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 700 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <StyledTableRow>
                        {columns.map((column) => (
                          <StyledTableCell
                            key={column.id}
                            align={
                              column.label === "Items Qty" ||
                              column.label === "Actions"
                                ? "center"
                                : "left"
                            }
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
                                    align={
                                      column.label === "Items Qty"
                                        ? "center"
                                        : "left"
                                    }
                                  >
                                    {column.id === "status" ? (
                                      <span
                                        className={
                                          value === "Delivered"
                                            ? "greenColor"
                                            : value === "Shipped"
                                            ? "redColor"
                                            : "blackColor"
                                        }
                                      >
                                        {value}
                                      </span>
                                    ) : (
                                      <span>{value}</span>
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
            )}
          </Fragment>
        </Box>
      </Box>
    </Fragment>
  );
};

export default OrdersList1;
