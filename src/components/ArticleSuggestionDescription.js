import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./ArticleSuggestionDescription.module.css";

function ArticleSuggestionDescription({ article, reviewerDetails }) {
  return (
    <>
      <p className={classes.Description}>
        <span
          className={`material-icons-outlined ${classes.DescriptionInfoIcon}`}
        >
          info
        </span>{" "}
        You are looking at the suggestions sent by{" "}
        <NavLink
          to={`/user/${reviewerDetails?.loginName}?id=${reviewerDetails?.userId}`}
          style={{ textDecoration: "none" }}
        >
          <span className={classes.reviewerName}>{reviewerDetails?.name}</span>
        </NavLink>{" "}
        and{" "}
        <NavLink
          to={`/article/${article.articleId}/${article.title
            .split(" ")
            .join("_")}`}
          style={{ textDecoration: "none" }}
        >
          <span className={`${classes.clickHere}`}>click here</span>{" "}
        </NavLink>{" "}
        if you want to see the original article. You have the option to either
        accept or reject the changes; however, once you accept them, the
        previous version of the article will be{" "}
        <span className={classes.warningMessage}>
          permanently lost and cannot be retrieved.
        </span>
      </p>
      <div className={classes.descriptionUnderLine}></div>
    </>
  );
}

export default ArticleSuggestionDescription;
