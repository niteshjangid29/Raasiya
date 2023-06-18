import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./components/Product/ProductDetails";
import Home from "./components/Home/Home";
import Header from "./components/layout/Header/Header";
import Products from "./components/Products/Products";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import store from "./store";
import { useEffect } from "react";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";

function App() {
  const { isAuthenticted, user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/search" element={<Products />} />
        <Route path="/search/:keyword" element={<Products />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        <Route exact path="/account" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
