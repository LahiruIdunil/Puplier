import React from "react";
import classes from "./IndicatorItem.module.css";

function IndicatorItem({ activeIcon, disabledIcon, status, isActive }) {
  return (
    <div className="col-auto position-relative">
      <div
        className={`${classes.indicatorItem} ${
          isActive ? classes.activeIndicatorItem : null
        }`}
      >
        <img
          className={classes.icon}
          src={isActive ? activeIcon : disabledIcon}
          alt="indicator item"
        />
      </div>
      <div>
        <p className={classes.status}>{status}</p>
      </div>
    </div>
  );
}

export default IndicatorItem;
