import React, { Fragment, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  styled,
  tableCellClasses,
  TableBody,
  TablePagination,
  Button,
} from "@mui/material";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "../../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { getAllOrders } from "../../actions/orderActions";

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

const UsersList1 = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);
  const { orders } = useSelector((state) => state.allOrders);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    { id: "id", label: "User ID", minWidth: 200, flex: 1 },
    {
      id: "name",
      label: "Name",
      minWidth: 200,
      flex: 1,
    },
    {
      id: "email",
      label: "Email",
      minWidth: 250,
      flex: 1,
    },
    {
      id: "role",
      label: "Role",
      minWidth: 170,
      flex: 1,
    },
    {
      id: "orders",
      label: "Orders",
      minWidth: 150,
      flex: 1,
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 200,
      flex: 1,
    },
  ];

  const renderCell = (user) => {
    const user_id = user._id;
    return (
      <Fragment>
        <Link to={`/admin/user1/${user_id}`}>
          <Button>
            <MdEdit />
          </Button>
        </Link>

        <Button onClick={() => deleteUserHandler(user_id)}>
          <MdDelete />
        </Button>
      </Fragment>
    );
  };

  const rows = [];

  users &&
    users.forEach((user) => {
      rows.unshift({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        orders: orders
          ? orders.filter((order) => order.user === user._id).length
          : "Loading",
        actions: renderCell(user),
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
      alert.success(message);
      navigate("/admin/users1");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, isDeleted, message, navigate]);
  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          className="all-products"
        >
          <h1 className="heading">Users List</h1>
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
                              column.label === "Actions" ? "center" : "left"
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
                                      column.label === "Actions"
                                        ? "center"
                                        : "left"
                                    }
                                  >
                                    {column.id === "role" ? (
                                      <span
                                        className={
                                          value === "superadmin"
                                            ? "greenColor"
                                            : value === "admin"
                                            ? "redColor"
                                            : "blackColor"
                                        }
                                      >
                                        {value}
                                      </span>
                                    ) : column.id === "orders" ? (
                                      <span
                                        className={
                                          value === 0
                                            ? "redColor"
                                            : "greenColor"
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

export default UsersList1;
