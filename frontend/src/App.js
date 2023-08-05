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
import { useEffect } from "react";
import { loadUser } from "./actions/userActions";
// import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
// import Cart from "./components/Cart/Cart";
// import Shipping from "./components/Cart/Shipping";
// import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Navbar from "./components/layout/Header/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReview from "./components/Admin/ProductReview";
import NotFound from "./components/layout/Not Found/NotFound";
import Cart1 from "./components/Cart/Cart1";
import Address from "./components/Cart/Address";
import NewStory from "./components/Admin1/NewStory";
import CategoryProducts from "./components/Products/CategoryProducts";
import Stories from "./components/Story/Stories";
import StoryDetails from "./components/Story/StoryDetails";
import NewProduct1 from "./components/Admin1/NewProduct";
import ProductList1 from "./components/Admin1/ProductList";
import SubCategoryProducts from "./components/Products/SubCategoryProducts";
import UsersList1 from "./components/Admin1/UsersList";
import OrdersList1 from "./components/Admin1/OrdersList";
import UpdateProduct1 from "./components/Admin1/UpdateProduct";
import UpdateUser1 from "./components/Admin1/UpdateUser";
import Stories1 from "./components/Admin1/Stories";
import ProcessOrder1 from "./components/Admin1/ProcessOrder";
import Dashboard1 from "./components/Admin1/Dashboard";
// import axios from "axios";

function App() {
  // const { user } = useSelector((state) => state.user);
  // const [razorpayApiKey, setRazorpayApiKey] = useState("");

  // async function getRazorpayApiKey() {
  //   const { data } = await axios.get("/api/v1/razorpayapikey");

  //   setRazorpayApiKey(data.razorpayApiKey);
  // }
  useEffect(() => {
    store.dispatch(loadUser());

    // getRazorpayApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <BrowserRouter>
      <Navbar />

      {/* <Header user={user} /> */}
      <div style={{ marginTop: "6.8rem" }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/search" element={<Products />} />
          <Route path="/search/:keyword" element={<Products />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          {/* <Route
            exact
            path="/account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          /> */}
          <Route
            exact
            path="/account"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            exact
            path="/profile/update"
            element={<ProtectedRoute component={UpdateProfile} />}
          />
          <Route
            exact
            path="/password/update"
            element={<ProtectedRoute component={UpdatePassword} />}
          />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />

          {/* <Route exact path="/cart" element={<Cart />} /> */}
          <Route
            exact
            path="/checkout/cart"
            element={<ProtectedRoute component={Cart1} />}
          />

          {/* <Route
            exact
            path="/shipping"
            element={<ProtectedRoute component={Shipping} />}
        />*/}

          <Route
            exact
            path="/checkout/address"
            element={<ProtectedRoute component={Address} />}
          />

          {/* <Route
            exact
            path="/process/payment"
            element={<ProtectedRoute component={Payment} />}
          /> */}

          <Route
            exact
            path="/checkout/payment"
            element={<ProtectedRoute component={Payment} />}
          />

          <Route
            exact
            path="/success"
            element={<ProtectedRoute component={OrderSuccess} />}
          />
          <Route
            exact
            path="/orders"
            element={<ProtectedRoute component={MyOrders} />}
          />
          <Route
            exact
            path="/order/:id"
            element={<ProtectedRoute component={OrderDetails} />}
          />
          <Route
            exact
            path="/admin/dashboard"
            element={<ProtectedRoute isAdmin={true} component={Dashboard} />}
          />
          <Route
            exact
            path="/admin/dashboard1"
            element={<ProtectedRoute isAdmin={true} component={Dashboard1} />}
          />
          <Route
            exact
            path="/admin/products"
            element={<ProtectedRoute isAdmin={true} component={ProductList} />}
          />
          <Route
            exact
            path="/admin/products1"
            element={<ProtectedRoute isAdmin={true} component={ProductList1} />}
          />
          <Route
            exact
            path="/admin/product"
            element={<ProtectedRoute isAdmin={true} component={NewProduct} />}
          />
          <Route
            exact
            path="/admin/product1"
            element={<ProtectedRoute isAdmin={true} component={NewProduct1} />}
          />
          <Route
            exact
            path="/admin/product/:id"
            element={
              <ProtectedRoute isAdmin={true} component={UpdateProduct} />
            }
          />
          <Route
            exact
            path="/admin/product1/:id"
            element={
              <ProtectedRoute isAdmin={true} component={UpdateProduct1} />
            }
          />
          <Route
            exact
            path="/admin/orders"
            element={<ProtectedRoute isAdmin={true} component={OrderList} />}
          />
          <Route
            exact
            path="/admin/orders1"
            element={<ProtectedRoute isAdmin={true} component={OrdersList1} />}
          />
          <Route
            exact
            path="/admin/order/:id"
            element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />}
          />
          <Route
            exact
            path="/admin/order1/:id"
            element={
              <ProtectedRoute isAdmin={true} component={ProcessOrder1} />
            }
          />
          <Route
            exact
            path="/admin/users"
            element={<ProtectedRoute isAdmin={true} component={UsersList} />}
          />
          <Route
            exact
            path="/admin/users1"
            element={<ProtectedRoute isAdmin={true} component={UsersList1} />}
          />
          <Route
            exact
            path="/admin/user/:id"
            element={<ProtectedRoute isAdmin={true} component={UpdateUser} />}
          />
          <Route
            exact
            path="/admin/user1/:id"
            element={<ProtectedRoute isAdmin={true} component={UpdateUser1} />}
          />
          <Route
            exact
            path="/admin/reviews"
            element={
              <ProtectedRoute isAdmin={true} component={ProductReview} />
            }
          />

          <Route
            exact
            path="/categories/:category"
            element={<CategoryProducts />}
          />
          <Route
            exact
            path="/categories/:category/:subCategory"
            element={<SubCategoryProducts />}
          />

          <Route
            path="/admin/story"
            element={<ProtectedRoute isAdmin={true} component={NewStory} />}
          />

          <Route exact path="/stories" element={<Stories />} />

          <Route
            path="/admin/stories"
            element={<ProtectedRoute isAdmin={true} component={Stories1} />}
          />

          <Route exact path="/story/:id" element={<StoryDetails />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
