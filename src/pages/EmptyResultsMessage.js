import React from "react";
import classes from "./EmptyResultsMessage.module.css";

function EmptyResultsMessage({ message, styles }) {
  return (
    <div className="col-auto" style={styles}>
      <p className={classes.noResultsMessage}>{message}</p>
    </div>
  );
}

export default EmptyResultsMessage;
