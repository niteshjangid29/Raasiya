import React, { Fragment, useEffect } from "react";
import "./Home.scss";
import ProductCard from "../Product/ProductCard";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  getAllCategories,
  getProduct,
} from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper";
import BlogCard from "../Story/BlogCard";
import CategoryCard from "./CategoryCard";
import { getStories } from "../../actions/storyActions";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, products } = useSelector((state) => state.products);
  const { categoryPair } = useSelector((state) => state.categoryProducts);
  const { stories } = useSelector((state) => state.stories);

  let bestSellerProducts = 0;
  let homePageStories = 0;

  products && (bestSellerProducts = products.slice(0, 4));
  stories && (homePageStories = stories.slice(0, 4));

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
    dispatch(getStories());
    dispatch(getAllCategories());
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
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Pagination, Autoplay]}
              grabCursor={true}
              className="homeSwiper"
            >
              <SwiperSlide>
                <img src="./slide1.webp" alt="Images 1" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="./slide2.webp" alt="Images 2" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="./slide3.webp" alt="Images 3" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="./slide4.webp" alt="Images 4" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="./slide5.webp" alt="Images 5" />
              </SwiperSlide>
            </Swiper>

            <div className="product-categories container">
              <h2 className="heading">Product Categories</h2>
              <div className="categoryBox">
                {categoryPair &&
                  categoryPair.map((category) => (
                    <CategoryCard
                      key={category.key}
                      name={category.key}
                      image_url={category.value}
                    />
                  ))}
              </div>
            </div>

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

            <div className="blogs container">
              <h2 className="heading">Stories</h2>
              <div className="blogBox">
                {homePageStories &&
                  homePageStories.map((story) => (
                    <BlogCard story={story} key={story._id} />
                  ))}
              </div>
              <Link to="/stories" className="myBtn">
                View All Stories
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
