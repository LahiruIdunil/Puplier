import React from "react";
import classes from "./ArticleDetailsSideBarActionButton.module.css";

function ArticleDetailsSideBarActionButton({ btnText, customClass, ...props }) {
  return (
    <button className={`${classes.actionButton} ${customClass}`} {...props}>
      {btnText}
    </button>
  );
}

export default ArticleDetailsSideBarActionButton;
