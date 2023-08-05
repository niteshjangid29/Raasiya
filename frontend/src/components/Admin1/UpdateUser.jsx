import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Sidebar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import {
  getUserDetails,
  clearErrors,
  updateUser,
} from "../../actions/userActions";

const UpdateUser1 = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { id: userId } = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users1");

      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [alert, error, dispatch, isUpdated, navigate, updateError, user, userId]);
  return (
    <Fragment>
      <MetaData title="Update User" />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" className="create-product">
          {/* <Toolbar /> */}
          <h1 className="heading">Update User</h1>
          <Box>
            {loading ? (
              <Loader />
            ) : (
              <form className="product-form" onSubmit={updateUserSubmitHandler}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="User Name"
                  disabled
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="User Email"
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Change Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    label="Change Role"
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="superadmin">Super Admin</MenuItem>
                  </Select>
                </FormControl>
                <button
                  className="myBtn"
                  type="submit"
                  disabled={updateLoading ? true : false}
                >
                  Update User
                </button>
              </form>
            )}
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default UpdateUser1;
