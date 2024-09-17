import React from "react";
import classes from "./ArticleScoreShowItem.module.css";

const ArticleScoreShowItem = (props) => {
  return (
    <div className={`${classes.itemContainer}`}>
      <p className={`${classes.title}`}>{props.title}</p>
      <div className={`${classes.outerContainer}`}>
        <div
          className={`${classes.innerContainer}`}
          style={{ width: `${props.width}` }}
        ></div>
      </div>
    </div>
  );
};

export default ArticleScoreShowItem;
