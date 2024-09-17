import React from "react";
import emptyArticlesIcon from "./images/empty-articles-message-image.png";
import classes from "./EmptyArticlesListMessage.module.css";

function EmptyArticlesListMessage() {
  return (
    <div className={classes.messageContainer}>
      <div>
        <img className={classes.messageImage} src={emptyArticlesIcon} />
      </div>
    </div>
  );
}

export default EmptyArticlesListMessage;
