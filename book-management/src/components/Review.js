import React from "react";
import './Review.css';

const Review = ({ reviewer, rating, reviewSnippet }) => {
  return (
    <div className="review">
      <p><strong>Reviewer:</strong> {reviewer || "Anonymous"}</p>
      <p><strong>Rating:</strong> {rating || "No rating available"}</p>
      <p><strong>Review:</strong> {reviewSnippet || "No review available"}</p>
    </div>
  );
};

export default Review;