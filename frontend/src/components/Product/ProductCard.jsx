import React from "react";
import "./ProductCard.scss";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <div>
        <div className="product-card-image">
          <img src={product.images[0].url} alt={product.name} />
        </div>
        <div className="product-card-content">
          <h2>{product.name}</h2>
          <div className="productCard-rating">
            <Rating {...options} />
            <span className="mt-1">
              ({product.numberOfReviews}{" "}
              {product.numberOfReviews > 1 ? "Reviews" : "Review"})
            </span>
          </div>
          <span>
            <strong>{`Rs. ${product.price}`}</strong>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
