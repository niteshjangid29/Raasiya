import React, { Fragment, useEffect } from "react";
import "./Products.scss";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";
import {
  clearErrors,
  getAllSubCategoryProducts,
} from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import { Slider } from "@mui/material";
import Pagination from "react-js-pagination";
import ProductCard from "../Product/ProductCard";

const SubCategoryProducts = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { category, subCategory } = useParams();

  const {
    subCategoryProducts,
    resultPerPage,
    filteredProductsCount,
    loading,
    error,
  } = useSelector((state) => state.subCategoryProducts);
  //   const {
  //     subCategories,
  //     categoryProducts,
  //     resultPerPage,
  //     filteredProductsCount,
  //     loading,
  //     error,
  //   } = useSelector((state) => state.categoryProducts);
  const [priceRange, setPriceRange] = React.useState([0, 10000]);
  const [ratings, setRatings] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const handlePriceChange = (e, newPrice) => {
    setPriceRange(newPrice);
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(
      getAllSubCategoryProducts(
        category,
        subCategory,
        currentPage,
        priceRange,
        ratings
      )
    );
  }, [
    dispatch,
    error,
    alert,
    category,
    subCategory,
    currentPage,
    priceRange,
    ratings,
  ]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="products-box">
            <h2 className="heading productHeading">
              {filteredProductsCount} Products (
              <Link to={`/categories/${category}`}>{category}</Link> /{" "}
              {subCategory})
            </h2>
            <div>
              <div className="filter">
                <div>
                  <p>Price</p>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="input-slider"
                    min={0}
                    max={10000}
                  />
                </div>
                <div>
                  <p>
                    <Link to={`/categories/${category}`}>{category}</Link>
                  </p>
                  {/* <ul className="subCategory">
                    <li>
                      <Link to={`/categories/${category}`}>All</Link>
                    </li>
                    {subCategories &&
                      subCategories.map((sub, index) => (
                        <li key={index}>
                          <Link to={`/categories/${category}/${sub}`}>
                            {sub}
                          </Link>
                        </li>
                      ))}
                  </ul> */}
                </div>
                <div>
                  <p>Rating Above</p>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => setRatings(newRating)}
                    valueLabelDisplay="auto"
                    aria-labelledby="continuous-slider"
                    step={1}
                    marks
                    min={0}
                    max={5}
                  />
                </div>
              </div>
              <div className="products-box-1">
                <div className="products">
                  {subCategoryProducts &&
                    subCategoryProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                {resultPerPage < filteredProductsCount && (
                  <div className="pagination">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={filteredProductsCount}
                      onChange={setCurrentPageNo}
                      nextPageText={">"}
                      prevPageText={"<"}
                      firstPageText={"<<"}
                      lastPageText={">>"}
                      itemClass="page-items"
                      linkClass="page-links"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SubCategoryProducts;
