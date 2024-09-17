import React from "react";
import classes from "./ReviewItem.module.css";
import reviewWriterImage from "../images/review-writer-image.jpg";

const ReviewItem = () => {
  return (
    <div>
      <div className={`${classes.reviewContentContainer}`}>
        <p className={`${classes.reviewContent}`}>
          “As a research professor in the field of Biology, I discovered Puplier
          last year and it has been an incredible help ever since. Expert
          reviewers provide great feedback and explanations, allowing me to
          guarantee the best possible outcome for my paper. I highly recommend
          it to all researchers looking for the best possible results.”
        </p>
      </div>
      <div className={`${classes.reviewWriterDetailsContainer}`}>
        <div
          className={`d-flex justify-content-center ${classes.reviewImagecontainer}`}
        >
          <div
            className={`${classes.reviewImage}`}
            style={{ backgroundImage: `url(${reviewWriterImage})` }}
          ></div>
        </div>
        <p className={`${classes.reviewWriterName}`}>Dr. alex graham</p>
        <div className="d-flex justify-content-center">
          <div className={`${classes.reviewWriterAboutContainer}`}>
            <p className={`${classes.reviewWriterAbout}`}>
              Professor in the field of Biology at the University of California,
              Berkeley
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
