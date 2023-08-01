import React, { Fragment, useState } from "react";
import "./Navbar.scss";
import Logo from "../../../images/Logo.png";
import LogoRaasiya from "../../../images/Raasiya.png";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import { MdRemoveShoppingCart } from "react-icons/md";
import HeaderCart from "../../Cart/HeaderCart";
import { FaCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  removeItemFromCart,
} from "../../../actions/cartActions";
import { Menu, MenuItem } from "@mui/material";
import { logout } from "../../../actions/userActions";
import { useAlert } from "react-alert";

const Navbar = () => {
  const [accountMenu, setAccountMenu] = useState(null);
  const open = Boolean(accountMenu);
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { cartItems } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const options = [
    { name: "My Account", func: account },
    { name: "My Orders", func: orders },
    { name: `Cart (${cartItems.length})`, func: cart },
    { name: "Logout", func: logOutUser },
  ];

  if (isAuthenticated === true) {
    if (user.role === "admin") {
      options.unshift({ name: "Dashboard", func: dashboard });
    }
    if (user.role === "superadmin") {
      options.unshift({ name: "Super Dashboard", func: superdashboard });
    }
  }

  function account() {
    setAccountMenu(null);
    isAuthenticated === true ? navigate("/account") : navigate("/login");
  }
  function orders() {
    setAccountMenu(null);
    isAuthenticated === true ? navigate("/orders") : navigate("/login");
  }
  function cart() {
    setAccountMenu(null);
    isAuthenticated === true ? navigate("/checkout/cart") : navigate("/login");
  }
  function dashboard() {
    setAccountMenu(null);
    isAuthenticated === true
      ? navigate("/admin/dashboard")
      : navigate("/login");
  }
  function superdashboard() {
    setAccountMenu(null);
    isAuthenticated === true
      ? navigate("/admin/dashboard")
      : navigate("/login");
  }
  function logOutUser() {
    setAccountMenu(null);
    navigate("/login");
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  const handleMenuClose = () => {
    setAccountMenu(null);
  };

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (quantity >= stock) {
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
  const deleteCardItems = (id) => {
    dispatch(removeItemFromCart(id));
  };
  const checkOutHandler = () => {
    // navigate("/login?redirect=shipping");
    navigate("/login?redirect=checkout/cart");
    setShow(false);
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <div className="navbar">
      <div className="navbox">
        <div className="nav-left">
          <Link to="/">
            <img src={Logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="nav-right">
          <div className="nav-up">
            <div className="img-div">
              <Link to="/">
                <img src={LogoRaasiya} alt="Raasiya" className="logo-raasiya" />
              </Link>
            </div>
            <div className="input-div">
              <svg
                width="61"
                height="60"
                viewBox="0 0 61 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M56.0599 60L35.0599 39C33.3932 40.3333 31.4766 41.3889 29.3099 42.1667C27.1432 42.9444 24.8377 43.3333 22.3932 43.3333C16.3377 43.3333 11.2132 41.2356 7.0199 37.04C2.82656 32.8444 0.728785 27.72 0.726562 21.6667C0.726562 15.6111 2.82434 10.4867 7.0199 6.29333C11.2155 2.1 16.3399 0.00222222 22.3932 0C28.4488 0 33.5732 2.09778 37.7666 6.29333C41.9599 10.4889 44.0577 15.6133 44.0599 21.6667C44.0599 24.1111 43.671 26.4167 42.8932 28.5833C42.1154 30.75 41.0599 32.6667 39.7266 34.3333L60.7266 55.3333L56.0599 60ZM22.3932 36.6667C26.5599 36.6667 30.1021 35.2078 33.0199 32.29C35.9377 29.3722 37.3955 25.8311 37.3932 21.6667C37.3932 17.5 35.9343 13.9578 33.0166 11.04C30.0988 8.12222 26.5577 6.66444 22.3932 6.66667C18.2266 6.66667 14.6843 8.12556 11.7666 11.0433C8.84878 13.9611 7.39101 17.5022 7.39323 21.6667C7.39323 25.8333 8.85212 29.3756 11.7699 32.2933C14.6877 35.2111 18.2288 36.6689 22.3932 36.6667Z"
                  fill="#622E10"
                />
              </svg>

              <form action="" onSubmit={searchSubmitHandler}>
                <input
                  type="search"
                  className="search"
                  placeholder="Search..."
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="nav-down">
            <ul className="nav-down-1">
              <li>
                <Link to="/">Collections</Link>
              </li>
              <li>
                <Link to="/">Bedroom</Link>
                <div className="hover-box">
                  <div>
                    <ul className="hover-box-left">
                      <li>
                        <p>
                          <Link to="/categories/Bedsheet">BEDSHEET</Link>
                        </p>
                        <ul>
                          <li>
                            <Link to="/">SINGLE</Link>
                          </li>
                          <li>
                            <Link to="/">DOUBLE</Link>
                          </li>
                          <li>
                            <Link to="/">FITTED</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <p>QUILT</p>
                        <ul>
                          <li>
                            <Link to="/">SINGLE</Link>
                          </li>
                          <li>
                            <Link to="/">DOUBLE</Link>
                          </li>
                        </ul>
                        <p>BLANKET</p>
                        <ul>
                          <li>
                            <Link to="/">SINGLE</Link>
                          </li>
                          <li>
                            <Link to="/">DOUBLE</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <p>KIDS</p>
                        <ul>
                          <li>
                            <Link to="/">BEDSHEET</Link>
                          </li>
                          <li>
                            <Link to="/">QUILT</Link>
                          </li>
                          <li>
                            <Link to="/">DOHAR</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <div className="hover-box-right">
                      <img src="/navbar_hover1.webp" alt="collections" />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link to="/">Living Room</Link>
                <div className="hover-box">
                  <div>
                    <ul className="hover-box-left">
                      <li>
                        <p>LIVING ROOM</p>
                        <ul>
                          <li>
                            <Link to="/">CURTAIN</Link>
                          </li>
                          <li>
                            <Link to="/">CUSHIONS</Link>
                          </li>
                          <li>
                            <Link to="/">UPHOLSTERY</Link>
                          </li>
                          <li>
                            <Link to="/">TABLE CLOTH</Link>
                          </li>
                          <li>
                            <Link to="/">RUGS</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <div className="hover-box-right">
                      <img src="/navbar_hover1.webp" alt="collections" />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link to="/">Kitchen</Link>
                <div className="hover-box">
                  <div>
                    <ul className="hover-box-left">
                      <li>
                        <p>KITCHEN</p>
                        <ul>
                          <li>
                            <Link to="/">KITCHEN LINEN</Link>
                          </li>
                          <li>
                            <Link to="/">APRON</Link>
                          </li>
                          <li>
                            <Link to="/">DISH TOWEL</Link>
                          </li>
                          <li>
                            <Link to="/">POT HOLDER</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <div className="hover-box-right">
                      <img src="/navbar_hover1.webp" alt="collections" />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link to="/">Bath</Link>
                <div className="hover-box">
                  <div>
                    <ul className="hover-box-left">
                      <li>
                        <p>TOWEL</p>
                        <ul>
                          <li>
                            <Link to="/">BATH TOWEL</Link>
                          </li>
                          <li>
                            <Link to="/">HAND TOWEL</Link>
                          </li>
                          <li>
                            <Link to="/">FACE TOWEL</Link>
                          </li>
                          <li>
                            <Link to="/">KIDS TOWEL</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <div className="hover-box-right">
                      <img src="/navbar_hover1.webp" alt="collections" />
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link to="/stories">Stories</Link>
              </li>
            </ul>
            <ul className="nav-down-2">
              <li className="account">
                <Link
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(e) => setAccountMenu(e.currentTarget)}
                >
                  <svg
                    viewBox="0 0 68 68"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M67 33.967C67 15.7675 52.216 1 34 1C15.784 1 1 15.7675 1 33.967C1 43.9908 5.554 53.0245 12.682 59.0882C12.748 59.1542 12.814 59.1543 12.814 59.2203C13.408 59.6823 14.002 60.1442 14.662 60.6062C14.992 60.8042 15.256 61.0641 15.586 61.3281C21.0395 65.0256 27.4772 67.0015 34.066 67C40.6548 67.0015 47.0925 65.0256 52.546 61.3281C52.876 61.1301 53.14 60.8703 53.47 60.6681C54.064 60.2103 54.724 59.7483 55.318 59.2863C55.384 59.2203 55.45 59.2202 55.45 59.1542C62.446 53.0204 67 43.9908 67 33.967ZM34 62.8461C27.796 62.8461 22.12 60.8661 17.434 57.5702C17.5 57.0422 17.632 56.5184 17.764 55.9904C18.1573 54.5594 18.7341 53.1854 19.48 51.9025C20.206 50.6485 21.064 49.5265 22.12 48.5365C23.11 47.5465 24.298 46.6266 25.486 45.9006C26.74 45.1746 28.06 44.6466 29.512 44.2506C30.9753 43.8562 32.4845 43.6578 34 43.6608C38.4989 43.6289 42.8326 45.3546 46.078 48.4705C47.596 49.9885 48.784 51.7705 49.642 53.8124C50.104 55.0004 50.434 56.2544 50.632 57.5702C45.7611 60.9947 39.9542 62.8367 34 62.8461ZM23.902 32.3211C23.3205 30.9897 23.028 29.55 23.044 28.0971C23.044 26.6492 23.308 25.1972 23.902 23.8773C24.496 22.5573 25.288 21.3734 26.278 20.3834C27.268 19.3934 28.456 18.6055 29.776 18.0115C31.096 17.4175 32.548 17.1535 34 17.1535C35.518 17.1535 36.904 17.4175 38.224 18.0115C39.544 18.6055 40.732 19.3975 41.722 20.3834C42.712 21.3734 43.504 22.5614 44.098 23.8773C44.692 25.1972 44.956 26.6492 44.956 28.0971C44.956 29.6151 44.692 31.0011 44.098 32.317C43.5247 33.6175 42.7196 34.8028 41.722 35.815C40.7094 36.8111 39.5242 37.6149 38.224 38.1869C35.4967 39.3077 32.4373 39.3077 29.71 38.1869C28.4098 37.6149 27.2246 36.8111 26.212 35.815C25.213 34.8175 24.4271 33.6316 23.902 32.3211ZM54.526 54.2084C54.526 54.0764 54.46 54.0104 54.46 53.8784C53.8109 51.8135 52.8541 49.8582 51.622 48.0786C50.3887 46.2858 48.8731 44.7047 47.134 43.3967C45.8058 42.3976 44.3662 41.556 42.844 40.8888C43.5365 40.4319 44.1782 39.9022 44.758 39.3089C45.742 38.3375 46.6061 37.2517 47.332 36.0749C48.7937 33.6733 49.5486 30.9083 49.51 28.0971C49.5304 26.0161 49.1262 23.9528 48.322 22.0334C47.528 20.1839 46.3852 18.5047 44.956 17.0875C43.5289 15.6851 41.8494 14.5654 40.006 13.7875C38.0834 12.9847 36.0174 12.5819 33.934 12.6036C31.8503 12.5832 29.7843 12.9875 27.862 13.7916C26.0027 14.5679 24.3191 15.7113 22.912 17.1535C21.5097 18.579 20.39 20.2572 19.612 22.0994C18.8078 24.0188 18.4036 26.0821 18.424 28.1631C18.424 29.6151 18.622 31.0011 19.018 32.317C19.414 33.703 19.942 34.957 20.668 36.1409C21.328 37.3289 22.252 38.3849 23.242 39.3749C23.836 39.9689 24.496 40.4927 25.222 40.9547C23.6951 41.6397 22.255 42.5038 20.932 43.5288C19.216 44.8488 17.698 46.4286 16.444 48.1446C15.1993 49.9169 14.2416 51.8741 13.606 53.9444C13.54 54.0764 13.54 54.2084 13.54 54.2744C8.326 48.9985 5.092 41.8788 5.092 33.967C5.092 18.0775 18.094 5.08787 34 5.08787C49.906 5.08787 62.908 18.0775 62.908 33.967C62.8994 41.5568 59.8857 48.8344 54.526 54.2084Z"
                      fill="#622E10"
                      stroke="#622E10"
                      stroke-width="2"
                    />
                  </svg>
                </Link>

                <Menu
                  id="basic-menu"
                  anchorEl={accountMenu}
                  open={open}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  className="account-menu"
                >
                  {options.map((item) => (
                    <MenuItem key={item.name} onClick={item.func}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              </li>
              <li>
                <svg
                  viewBox="0 0 71 65"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35.8529 55.0063L35.4987 55.3568L35.1091 55.0063C18.2862 39.9024 7.16537 29.9149 7.16537 19.7873C7.16537 12.7785 12.4779 7.52195 19.5612 7.52195C25.0154 7.52195 30.3279 11.0263 32.205 15.7923H38.7925C40.6696 11.0263 45.9821 7.52195 51.4362 7.52195C58.5196 7.52195 63.8321 12.7785 63.8321 19.7873C63.8321 29.9149 52.7112 39.9024 35.8529 55.0063ZM51.4362 0.513184C45.2737 0.513184 39.3591 3.35173 35.4987 7.8023C31.6383 3.35173 25.7237 0.513184 19.5612 0.513184C8.65287 0.513184 0.0820312 8.95875 0.0820312 19.7873C0.0820312 32.9988 12.1237 43.8274 30.3633 60.1928L35.4987 64.8186L40.6341 60.1928C58.8737 43.8274 70.9154 32.9988 70.9154 19.7873C70.9154 8.95875 62.3446 0.513184 51.4362 0.513184Z"
                    fill="#622E10"
                  />
                </svg>
              </li>
              <li className="cart" onClick={() => setShow(true)}>
                <svg
                  viewBox="0 0 80 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.793 71.6558C19.845 71.6558 18.1769 70.9616 16.7886 69.5733C15.4003 68.185 14.7073 66.518 14.7096 64.5724C14.7096 62.6245 15.4038 60.9564 16.7921 59.5681C18.1805 58.1797 19.8474 57.4868 21.793 57.4891C23.7409 57.4891 25.409 58.1833 26.7973 59.5716C28.1857 60.9599 28.8787 62.6269 28.8763 64.5724C28.8763 66.5204 28.1821 68.1885 26.7938 69.5768C25.4055 70.9652 23.7385 71.6581 21.793 71.6558ZM64.6009 71.6558C62.653 71.6558 60.9849 70.9616 59.5965 69.5733C58.2082 68.185 57.5152 66.518 57.5176 64.5724C57.5176 62.6245 58.2118 60.9564 59.6001 59.5681C60.9884 58.1797 62.6554 57.4868 64.6009 57.4891C66.5488 57.4891 68.217 58.1833 69.6053 59.5716C70.9936 60.9599 71.6866 62.6269 71.6842 64.5724C71.6842 66.5204 70.9901 68.1885 69.6018 69.5768C68.2134 70.9652 66.5465 71.6581 64.6009 71.6558ZM21.793 53.9474C19.1367 53.9474 17.1003 52.7811 15.6836 50.4483C14.2669 48.1155 14.2374 45.7993 15.595 43.4995L20.3763 34.8224L7.6263 7.90578H0.542969V0.822449H12.1419L27.194 32.6974H59.4655L73.1895 7.90578L79.3874 11.2704L65.6634 36.062C65.0141 37.2426 64.1582 38.1575 63.0957 38.8068C62.0332 39.4561 60.8231 39.7808 59.4655 39.7808H25.6888L21.793 46.8641H71.6842V53.9474H21.793Z"
                    fill="#622E10"
                  />
                </svg>
              </li>
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
                              key={item.product}
                              item={item}
                              deleteCardItems={deleteCardItems}
                              increaseQuantity={increaseQuantity}
                              decreaseQuantity={decreaseQuantity}
                            />
                          ))}
                      </Offcanvas.Body>
                      <hr />
                      <button
                        className="checkout-btn"
                        onClick={checkOutHandler}
                      >
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
