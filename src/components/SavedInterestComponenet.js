import React from "react";
import classes from "./EditInterestComponent.module.css";

const SavedInterestComponenet = ({ interest, removeInterest }) => {
  return (
    <div className={classes.componentDiv}>
      <div className={classes.componentText}>{interest}</div>
      <i
        className={`material-icons ${classes.icon}`}
        onClick={() => removeInterest(interest)}
      >
        close
      </i>
    </div>
  );
};

export default SavedInterestComponenet;
