import React from "react";
import "./ProductCard.scss";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    value: product.ratings,
    isHalf: true,
    size: 25,
    //     size: window.innerWidth < 600 ? 20 : 25,
    a11y: true,
    color: "#C0C49B",
    activeColor: "#F4D54B",
  };
  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <div>
        <h2>{product.name}</h2>
        <div className="productCard-rating">
          <ReactStars {...options} />
          <span className="mt-1">
            ({product.numberOfReviews}{" "}
            {product.numberOfReviews > 1 ? "Reviews" : "Review"})
          </span>
        </div>
        <span>
          <strong>{`Rs. ${product.price}`}</strong>
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
