import React from "react";
import classes from "./ArticleDetailsSideBarTitle.module.css";

export default function ArticleDetailsSideBarTitle({ title, ...props }) {
  return (
    <p className={`${classes.title}`} {...props}>
      {title}
    </p>
  );
}
