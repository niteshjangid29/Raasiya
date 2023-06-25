import React, { Fragment, useState } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCartPlus, FaCircle } from "react-icons/fa";
import {
  Navbar,
  NavDropdown,
  Container,
  Nav,
  Form,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userActions";
import HeaderCart from "../../Cart/HeaderCart";
import { MdRemoveShoppingCart } from "react-icons/md";
import {
  addItemsToCart,
  removeItemFromCart,
} from "../../../actions/cartActions";

const Header = () => {
  const [show, setShow] = useState(false);

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { cartItems } = useSelector((state) => state.cart);

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const options = [
    { name: "My Account", func: account },
    { name: "My Orders", func: orders },
    { name: `Cart (${cartItems.length})`, func: cart },
    { name: "My Logout", func: logOutUser },
  ];

  if (isAuthenticated) {
    if (user.role === "admin") {
      options.unshift({ name: "Dashboard", func: dashboard });
    }
    if (user.role === "superadmin") {
      options.unshift({ name: "Super Dashboard", func: superdashboard });
    }
  }

  function account() {
    isAuthenticated ? navigate("/account") : navigate("/login");
  }
  // console.log(user.role);
  function orders() {
    isAuthenticated ? navigate("/orders") : navigate("/login");
  }
  function cart() {
    isAuthenticated ? navigate("/cart") : navigate("/login");
  }
  function dashboard() {
    isAuthenticated ? navigate("/dashboard") : navigate("/login");
  }
  function superdashboard() {
    isAuthenticated ? navigate("/superdashboard") : navigate("/login");
  }
  function logOutUser() {
    navigate("/login");
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/search");
    }
  };

  const deleteCardItems = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
    setShow(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={searchSubmitHandler}>
            <Form.Control
              type="search"
              placeholder="Search a Product..."
              className="me-2"
              aria-label="Search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>
          <div className="">
            {/* <Link className="link" to="/cart"> */}
            <button className="btn" type="button" onClick={() => setShow(true)}>
              <FaCartPlus style={{ color: "white", margin: "0 1rem" }} />
            </button>
            {/* </Link> */}

            <Offcanvas
              show={show}
              onHide={() => setShow(false)}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your Cart</Offcanvas.Title>
              </Offcanvas.Header>
              <hr style={{ margin: 0 }} />
              <Fragment>
                {cartItems.length === 0 ? (
                  <div className="EmptyCart">
                    <MdRemoveShoppingCart />
                    <p>Your Cart is Empty</p>
                    <Link to="/products" onClick={() => setShow(false)}>
                      View Products
                    </Link>
                  </div>
                ) : (
                  <Fragment>
                    <Offcanvas.Body>
                      {cartItems &&
                        cartItems.map((item) => (
                          <HeaderCart
                            item={item}
                            deleteCardItems={deleteCardItems}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                          />
                        ))}
                      {/* <HeaderCart />
                      <HeaderCart />
                      <HeaderCart />
                      <HeaderCart />
                      <HeaderCart /> */}
                    </Offcanvas.Body>
                    <hr />
                    <button className="checkout-btn" onClick={checkOutHandler}>
                      Checkout
                      <FaCircle />
                      {`Rs. ${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}`}
                    </button>
                  </Fragment>
                )}
              </Fragment>
            </Offcanvas>
          </div>
          <div className="dropdown">
            <Link className="link" to="/login">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                onClick={() => navigate("/login")}
              >
                <FaUser style={{ color: "white", margin: "0 1rem" }} />
              </button>
            </Link>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {options.map((item) => (
                <li
                  onClick={item.func}
                  key={item.name}
                  style={{ cursor: "pointer" }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
