import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "../Product/ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, alert, error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="RAASIYA | Ecommerce" />
          <div className="home container">
            <h2 className="heading">Featured Products</h2>

            <div className="featured-products">
              {products &&
                products.map((product) => <ProductCard product={product} />)}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
