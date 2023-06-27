import React, { Fragment, useEffect } from "react";
import "./Home.scss";
import ProductCard from "../Product/ProductCard";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  const bestSellerProducts = products.slice(0, 4);

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
          <div className="home">
            <Swiper
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Pagination, Autoplay]}
              grabCursor={true}
              className="homeSwiper"
            >
              <SwiperSlide>
                <img
                  src="https://suta.in/cdn/shop/files/IWL_Website_Desktop_Banner_1800x.jpg?v=1686572875"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://suta.in/cdn/shop/files/this_is_me_website_banner__after_15_days_1800x.png?v=1686483623"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://suta.in/cdn/shop/files/clearancesale_websitebanner_1800x.png?v=1674925496"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://suta.in/cdn/shop/files/IMG_5480_1800x.jpg?v=1647280779"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://suta.in/cdn/shop/files/Suta-Bag_1800x.jpg?v=1647256422"
                  alt=""
                />
              </SwiperSlide>
            </Swiper>
            <div className="best-seller container">
              <h2 className="heading">Best Seller</h2>

              <div className="best-seller-box">
                {bestSellerProducts &&
                  bestSellerProducts.map((product) => (
                    <ProductCard product={product} key={product.name} />
                  ))}
              </div>

              <Link to="/products" className="myBtn">
                View All Products
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
