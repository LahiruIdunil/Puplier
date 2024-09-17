import React from "react";
import classes from "./AboutUsTestimonialCarouselItem.module.css";

const AboutUsTestimonialCarouselItem = ({ data }) => {
  const { name, jobTitle, company, review, photo } = data;
  return (
    <div className={classes.carouselItemDiv}>
      <p className={classes.review}>{review}</p>
      <div className={classes.photoCircle}>
        <img src={photo} alt="photo" className={classes.photo} />
      </div>
      <p className={classes.name}>{name}</p>
      <p className={classes.jobTitle}>{jobTitle}</p>
      <p className={classes.company}>{company}</p>
    </div>
  );
};

export default AboutUsTestimonialCarouselItem;
