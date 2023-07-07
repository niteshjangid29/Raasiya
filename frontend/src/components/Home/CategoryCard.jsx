import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ name, image_url }) => {
  return (
    <Link to={`/categories/${name}`} className="p-category">
      <div>
        <img src={image_url} alt="" />
      </div>
      <p>{name}</p>
    </Link>
  );
};

export default CategoryCard;
