import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = () => {
  return (
    <Link to="/" className="p-category">
      <div>
        <img src="./image1.jpg" alt="" />
      </div>
      <p>Bed</p>
    </Link>
  );
};

export default CategoryCard;
