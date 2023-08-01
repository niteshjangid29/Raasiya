import React, { Fragment, useEffect, useState } from "react";
import "./Products.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  getProduct,
  clearErrors,
  getAllCategories,
} from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Product/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import { Slider } from "@mui/material";

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
    // maxPrice,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [category, setCategory] = useState("");
  // const [subCategory, setSubCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { error: categoryError, categoryPair } = useSelector(
    (state) => state.categoryProducts
  );

  const { keyword } = useParams();

  const handlePriceChange = (e, newPrice) => {
    setPriceRange(newPrice);
  };

  // const handleInput1Change = (e) => {
  //   const minVal = e.target.value === "" ? "" : Number(e.target.value);
  //   setPriceRange([minVal, priceRange[1]]);
  // };
  // const handleInput2Change = (e) => {
  //   const maxVal = e.target.value === "" ? "" : Number(e.target.value);
  //   setPriceRange([priceRange[0], maxVal]);
  // };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (categoryError) {
      alert.error(categoryError);
      dispatch(clearErrors());
    }
    dispatch(getAllCategories());
    dispatch(getProduct(keyword, currentPage, priceRange, category, ratings));
  }, [
    dispatch,
    keyword,
    currentPage,
    alert,
    error,
    priceRange,
    category,
    ratings,
    categoryError,
  ]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="products-box">
            <h2 className="heading productHeading">
              {filteredProductsCount} Products
            </h2>
            <div>
              <div className="filter">
                <div>
                  <p>Price</p>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    onChangeCommitted={handlePriceChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="input-slider"
                    // disableSwap
                    min={0}
                    max={10000}
                  />
                  {/* <div className="input-price">
                    <Input
                      value={priceRange[0]}
                      size="small"
                      type="submit"
                      onChange={handleInput1Change}
                      // onBlur={handleBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: maxPrice,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                      readOnly
                    />
                    <Input
                      value={priceRange[1]}
                      size="small"
                      onChange={handleInput2Change}
                      // onBlur={handleBlur}
                      inputProps={{
                        step: 10,
                        min: 0,
                        max: maxPrice,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                      readOnly
                    />
                  </div> */}
                </div>
                <div>
                  <p>Categories</p>
                  <li key={category} onClick={() => setCategory("")}>
                    All
                  </li>
                  {categoryPair.map((category) => (
                    <li
                      key={category.key}
                      onClick={() => setCategory(category.key)}
                    >
                      {category.key}
                      {/* {category.subCategories && (
                        <ul className="subCategory">
                          {category.subCategories.map((subCategory, index) => (
                            <li
                              key={index}
                              onClick={() => setSubCategory(subCategory)}
                            >
                              {subCategory}
                            </li>
                          ))}
                        </ul>
                      )} */}
                    </li>
                  ))}
                </div>
                <div>
                  <p>Ratings Above</p>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => setRatings(newRating)}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={5}
                  />
                </div>
              </div>
              <div className="products-box-1">
                <div className="products">
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {resultPerPage < filteredProductsCount && (
                  <div className="paginationBox">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productsCount}
                      onChange={setCurrentPageNo}
                      nextPageText=">"
                      prevPageText="<"
                      firstPageText="<<"
                      lastPageText=">>"
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

export default Products;
