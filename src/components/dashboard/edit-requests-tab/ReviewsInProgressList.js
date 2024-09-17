import React from "react";
import ReviewsInProgressItem from "./ReviewsInProgressItem";
import classes from "./ReviewsInProgressList.module.css";

const ReviewsInProgressList = ({ reviews }) => {
  return (
    <div className={`row ${classes.ReviewsInProgressListContainer}`}>
      <div className="col-12">
        {reviews.reviewsInProgress.map((review, key) => (
          <ReviewsInProgressItem
            isReviewCompleted={false}
            review={review}
            key={key}
          />
        ))}
        {reviews.reviewsCompleted.map((review, key) => (
          <ReviewsInProgressItem isReviewCompleted review={review} key={key} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsInProgressList;
