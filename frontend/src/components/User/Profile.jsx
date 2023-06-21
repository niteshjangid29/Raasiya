import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { clearErrors } from "../../actions/userActions";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [isAuthenticated, navigate, error, alert, dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Profile" />

          <div className="container">
            <h1>My Profile</h1>

            <div>
              <div>
                <h4>Name</h4>
                {isAuthenticated && <p>{user.name}</p>}
              </div>
              <div>
                <h4>Email</h4>
                {isAuthenticated && <p>{user.email}</p>}
              </div>
              <div>
                <h4>Joined On</h4>
                {isAuthenticated && (
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                )}
              </div>
              <div>
                <Link to="/profile/update" className="mx-2">
                  Edit Profile
                </Link>
                <Link to="/orders" className="mx-2">
                  My Orders
                </Link>
                <Link to="/password/update" className="mx-2">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
