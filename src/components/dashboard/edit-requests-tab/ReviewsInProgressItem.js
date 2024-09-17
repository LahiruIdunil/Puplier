import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./ReviewsInProgressItem.module.css";

const ReviewsInProgressItem = ({ review, isReviewCompleted }) => {
  return (
    <div className={`row ${classes.singleReviewItemContainer}`}>
      <div className={`col-auto ${classes.imageContainerParent}`}>
        <div
          className={`${classes.imageContainer}`}
          style={{
            backgroundImage: `url(https://picsum.photos/200?random=${review.reviewerId})`,
          }}
        ></div>
      </div>
      <div className="col d-flex flex-column justify-content-center">
        <div>
          <p className={`${classes.articleTitle}`}>{review.article.title}</p>
          <div className="d-flex">
            <NavLink
              to={`/user/${review.reviewerLoginName}?id=${review.reviewerId}`}
              className="text-decoration-none"
            >
              <p className={`${classes.authorName}`}>
                {review.reviewerLoginName}
              </p>
            </NavLink>
          </div>
          <div className="d-flex justify-content-start mt-2">
            {/* visible only in screens smaller than 767px; */}
            <div className="d-md-none d-block">
              <div className="d-flex justify-content-start">
                {isReviewCompleted && (
                  <NavLink
                    to={`/review-request/${review.reviewRequestId}/view-suggestions?articleId=${review.article.articleId}`}
                  >
                    <button className={`${classes.actionButton}`}>
                      view suggestions
                    </button>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* visible only in screens greater than 767px; */}
      <div className="col-auto d-md-flex d-none flex-column justify-content-start">
        <div>
          <div className="d-flex justify-content-end">
            {isReviewCompleted && (
              <NavLink
                to={`/review-request/${review.reviewRequestId}/view-suggestions?articleId=${review.article.articleId}`}
              >
                <button className={`${classes.actionButton}`}>
                  view suggestions
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsInProgressItem;
