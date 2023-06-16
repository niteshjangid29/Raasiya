import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <h2>{product.name}</h2>
      <div className="product-rating">
        <div>
          {product.ratings}
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
          <FaRegStar />
        </div>
        <span className="mt-1">({product.numberOfReviews} Reviews)</span>
      </div>
      <span>{`Rs ${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
