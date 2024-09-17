import React from "react";
import classes from "./VotingModalRange.module.css";

const VotingModalRange = ({ label, id, dispatcher, articleScore }) => {
  return (
    <div className={classes.rangeValueContainer}>
      <div className={`d-flex justify-content-between`}>
        <label className={`${classes.label}`}>{label}</label>
        <div className={`${classes.value}`}>{articleScore}%</div>
      </div>
      <div className={`${classes.sliderContainer}`}>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={articleScore}
          className={`${classes.slider}`}
          onChange={(e) => dispatcher({ id, score: e.target.value })}
        />
        <div
          className={classes.SelectedArea}
          style={{ width: `${articleScore}%` }}
        ></div>
      </div>
    </div>
  );
};

export default VotingModalRange;
