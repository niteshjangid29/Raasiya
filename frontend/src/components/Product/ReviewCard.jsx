import React from "react";
import "./ReviewCard.css";
import profilePng from "../../images/Profile.png";
import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    size: "medium",
  };
  return (
    <div className="review">
      <div>
        <img src={profilePng} alt="User" />
        <strong>{review.name}</strong>
      </div>
      <div style={{ margin: "0.7rem 0.4rem" }}>
        <Rating {...options} />
      </div>
      <hr className="line" style={{ margin: "0.8rem 0" }} />
      <p>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
