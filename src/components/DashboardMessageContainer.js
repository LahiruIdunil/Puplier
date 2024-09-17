import React from "react";
import classes from "./DashboardMessageContainer.module.css";
import emptyListImage from "./images/empty-list-image.png";
import errorListImage from "./images/error-list-image.png";

function DashboardMessageContainer({ message, status }) {
  return status === "error" ? (
    <div className={classes.messageContainer}>
      <div>
        <img className={classes.messageImage} src={errorListImage} />
      </div>
      <p className={classes.message}>{message || "Error loading data!"}</p>
    </div>
  ) : (
    <div className={classes.messageContainer}>
      <div>
        <img className={classes.messageImage} src={emptyListImage} />
      </div>
      <p className={classes.message}>{message}</p>
    </div>
  );
}

export default DashboardMessageContainer;
