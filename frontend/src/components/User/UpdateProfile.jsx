import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import {
  updateProfile,
  clearErrors,
  loadUser,
} from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);

    dispatch(updateProfile(myForm));
  };
  console.log(name);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, alert, isUpdated, navigate, user]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="container">
            <div className="register-box">
              <h2>Update Profile</h2>
              <form
                action=""
                onSubmit={updateProfileSubmit}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="form-control my-3"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    className="form-control my-3"
                    value={email}
                    name="email"
                    onChange={(e) => e.target.value}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-primary my-2"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
