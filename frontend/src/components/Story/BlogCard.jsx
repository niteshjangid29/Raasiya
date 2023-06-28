import React from "react";
import "./BlogCard.scss";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="blogCard">
      <div className="blogImage">
        <Link to="/">
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="" />
        </Link>
      </div>
      <div className="blogContent">
        <Link to="/">
          <h2>
            For the season of fun and frolic, dress yourself in Suta’s gorgeous
            new range of summer dresses.
          </h2>
        </Link>
        <p>
          The summers bring with it the joy of vacations, picnics and beach
          trips. But let’s not forget the dilemma that presents itself everytime
          we stare a...
        </p>
        <Link to="/" className="read-more">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
