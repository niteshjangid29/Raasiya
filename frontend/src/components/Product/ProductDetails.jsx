import React, { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Scrollbar, Zoom } from "swiper";
import "./ProductDetails.css";
// import ReactStars from "react-rating-stars-component";
import { Tab, Tabs } from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productActions";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/zoom";
import "swiper/css/thumbs";
import "swiper/css/scrollbar";
import ReviewCard from "./ReviewCard";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { id } = useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, alert, error]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      return;
    }
    const qnty = quantity + 1;
    setQuantity(qnty);
  };
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    const qnty = quantity - 1;
    setQuantity(qnty);
  };
  //   const options = {
  //     edit: false,
  //     color: "gray",
  //     activeColor: "tomato",
  //     value: 3.5,
  //     size: window.innerWidth < 600 ? 20 : 25,
  //     isHalf: true,
  //     a11y: true,
  //   };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container">
            <div className="product row">
              <div className="product-images col-md-6">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  loop={true}
                  zoom={true}
                  navigation={true}
                  spaceBetween={5}
                  slidesPerView={1}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  modules={[Navigation, Thumbs, FreeMode, Zoom]}
                  grabCursor={true}
                  className="mySlider"
                >
                  {product.images &&
                    product.images.map((item, i) => (
                      <SwiperSlide key={i}>
                        <div className="swiper-zoom-container">
                          <img
                            key={i}
                            src={item.url}
                            alt={`${i} Slide`}
                            loading="lazy"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={5}
                  slidesPerView={5}
                  freeMode={true}
                  scrollbar={true}
                  watchSlidesProgress={true}
                  modules={[Thumbs, FreeMode, Scrollbar]}
                  className="mySlider2"
                >
                  {product.images &&
                    product.images.map((item, i) => (
                      <SwiperSlide key={i}>
                        <img
                          key={i}
                          src={item.url}
                          alt={`${i} Slide`}
                          loading="lazy"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
              <div className="product-details col-md-6">
                <h1 className="product-heading">{product.name}</h1>
                <div className="product-rating">
                  {/* <ReactStars {...options} /> */}
                  <div>
                    {product.ratings}
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                    <FaRegStar />
                  </div>
                  <span className="mt-1">{`(${product.numberOfReviews} Review)`}</span>
                </div>
                <p className="product-sku">
                  SKU:
                  <span>{product.sku}</span>
                </p>
                <div className="product-price">
                  <span>{`Rs ${product.price}`}</span>
                  <p>MRP Inclusive of taxes</p>
                  <p className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    <strong style={{ color: "#333333", fontWeight: "500" }}>
                      Status:{" "}
                    </strong>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </p>
                </div>

                <hr className="line" />

                <div className="p-quantity-box">
                  <span>Quantity:</span>
                  <div className="p-quantity">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                </div>

                <button className="p-button">Add to Cart</button>

                <p className="p-shipping">
                  Free shipping on domestic orders above Rs. 2,000
                </p>

                <div className="p-box-2">
                  <p>
                    <strong>Country of Origin:</strong>
                    {product.countryOfOrigin}
                  </p>
                  <p>
                    <strong>Packed By:</strong>
                    {product.packedBy}
                  </p>
                  <p>
                    <strong>Registered Address:</strong>
                    {product.registeredAddress}
                  </p>
                </div>

                <div className="p-box-3">
                  <Tabs defaultActiveKey="details" justify>
                    <Tab
                      eventKey="details"
                      title="Details"
                      className="p-tab-data"
                    >
                      {product.details}
                    </Tab>
                    <Tab eventKey="story" title="Story" className="p-tab-data">
                      {product.story}
                    </Tab>
                    <Tab
                      eventKey="description"
                      title="Description"
                      className="p-tab-data"
                    >
                      {product.description}
                    </Tab>
                  </Tabs>
                </div>

                <hr className="line" />

                <div className="p-box-4">
                  <p>
                    <strong>Collections:</strong>
                    {product.collections}
                  </p>
                  <p>
                    <strong>Type:</strong>
                    {product.category}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="container">
            <div className="reviews-box">
              <h3
                className="heading"
                style={{ borderBottom: "none", fontSize: "1.2rem" }}
              >
                Customer Reviews
              </h3>
              <div className="review-heading">
                <div>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                  <FaRegStar />
                </div>
                <div>
                  <button className="review-btn">Write a review</button>
                </div>
              </div>

              {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <ReviewCard review={review} />
                    ))}
                </div>
              ) : (
                <p className="noReviews">No Reviews Yet</p>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
