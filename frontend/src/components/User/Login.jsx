import React, { Fragment, useState, useEffect } from "react";
import "./LoginRegister.css";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [searchParams] = useSearchParams();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = searchParams.get("redirect");
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(`/${redirect ? redirect : "account"}`);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container">
            <div className="login-box">
              <h2>Login</h2>
              <form
                action=""
                onSubmit={loginSubmit}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    className="form-control my-3"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    required
                    className="form-control my-3"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot" className="link">
                  Forget Password ?
                </Link>
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary"
                />
                <Link to="/register" className="link">
                  Create an account
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
