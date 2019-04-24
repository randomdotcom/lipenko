import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewsList = ({ reviews }) => {
  if (!reviews['0']) {
    return <p>Reviews is not found</p>;
  } else {
    return reviews.map(review => (
      <ReviewCard review={review} id={review._id} key={review._id} />
    ));
  }
};

export default ReviewsList;