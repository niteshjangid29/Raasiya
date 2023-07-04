import React, { Fragment, useState, useEffect } from "react";
import "./LoginRegister.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { register, clearErrors } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const Register = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const { name, email, password } = user;

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email.toLowerCase());
    myForm.set("password", password);

    dispatch(register(myForm));
  };
  console.log(name);

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container">
            <div className="register-box">
              <h2>Register</h2>
              <form
                action=""
                onSubmit={registerSubmit}
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
                    onChange={registerDataChange}
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
                    onChange={registerDataChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    required
                    className="form-control my-3"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary my-2"
                />
                <Link to="/login" className="link">
                  Already have an account? Login
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Register;
