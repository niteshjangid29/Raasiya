import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAllCategoryProducts,
} from "../../actions/productActions";
import { useParams } from "react-router-dom";
import ProductCard from "../Product/ProductCard";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";

const CategoryProducts = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { category } = useParams();
  const { categoryProducts, loading, error } = useSelector(
    (state) => state.categoryProducts
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllCategoryProducts(category));
  }, [dispatch, category, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container products-box">
          <h2 className="heading productHeading">{category}</h2>
          <div className="fiter"></div>
          <div className="products-box-1">
            <div className="products">
              {categoryProducts &&
                categoryProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CategoryProducts;
