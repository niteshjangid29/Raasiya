import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/Product/ProductDetails";
import Home from "./components/Home/Home";
// import Header from "./components/layout/Header/Header";
import Products from "./components/Products/Products";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import store from "./store";
import { useEffect, useState } from "react";
import { loadUser } from "./actions/userActions";
// import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Navbar from "./components/layout/Header/Navbar";
import Footer from "./components/layout/Footer/Footer";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";

function App() {
  // const { user } = useSelector((state) => state.user);
  const [razorpayApiKey, setRazorpayApiKey] = useState("");

  async function getRazorpayApiKey() {
    const { data } = await axios.get("/api/v1/razorpayapikey");

    setRazorpayApiKey(data.razorpayApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());

    getRazorpayApiKey();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />

      {/* <Header user={user} /> */}
      <div style={{ marginTop: "7.2rem" }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/search" element={<Products />} />
          <Route path="/search/:keyword" element={<Products />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          <Route
            exact
            path="/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />

          <Route exact path="/cart" element={<Cart />} />

          <Route
            exact
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
