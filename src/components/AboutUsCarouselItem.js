import React from "react";
import classes from "./AboutUsCarouselItem.module.css";

function AboutUsCarouselItem({ profile }) {
  return (
    <div className={classes.memberDiv}>
      <div
        className={classes.memberPhotoDiv}
        style={{ backgroundImage: `url(${profile.photo})` }}
      ></div>
      <div className={classes.memberDescriptionContainer}>
        <p className={classes.memberPosition}>{profile.position}</p>
        <p className={classes.memberName}>{profile.name}</p>
      </div>
    </div>
  );
}

export default AboutUsCarouselItem;
