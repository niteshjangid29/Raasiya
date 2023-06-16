import React from "react";
import "./ReviewCard.css";
import profilePng from "../../images/Profile.png";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="review">
      <div>
        <img src={profilePng} alt="User" />
        <strong>{review.name}</strong>
      </div>
      <div style={{ margin: "0.7rem 0.4rem" }}>
        {review.rating}
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
        <FaRegStar />
      </div>
      <hr className="line" style={{ margin: "0.8rem 0" }} />
      <p>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
