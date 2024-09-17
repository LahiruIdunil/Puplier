import React from "react";
import classes from "./AlphaReleaseMessage.module.css";

function AlphaReleaseMessage() {
  return (
    <div className={classes.messageContainer}>
      <p className={classes.message}>
        Welcome to our <strong>alpha</strong> release! The system is still under
        development. Your feedback is highly appreciated
      </p>
    </div>
  );
}

export default AlphaReleaseMessage;
