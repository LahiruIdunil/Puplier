import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import classes from "./SingleArticleItem.module.css";

function SingleArticleItem({
  articleId,
  thumbnailUrl,
  title,
  score,
  readTime,
  authorName,
  saved,
}) {
  const [saveArticle, setSaveArticle] = useState(saved);

  const handleSaveArticle = (e) => {
    setSaveArticle(!saveArticle);
  };

  return (
    <div className={`col-lg-3 col-sm-6 col-12 ${classes.articleContainer}`}>
      <div>
        <Link
          to={`/article/${articleId}/${title.split(" ").join("_")}`}
          className="text-decoration-none"
        >
          <div
            className={`${classes.articleImage}`}
            style={{
              backgroundImage: `url(https://picsum.photos/200?random=${articleId})`,
            }}
          ></div>
        </Link>
        <Link
          to={`/article/${articleId}/${title.split(" ").join("_")}`}
          className="text-decoration-none"
        >
          <p className={`${classes.articleTitle}`}>{title}</p>
        </Link>
      </div>
      <div>
        <div
          className={`d-flex justify-content-between ${classes.articleScoreAndReadTimeContainer}`}
        >
          <p className={classes.articleScore}>score {score}</p>
          <div className="d-flex align-items-end">
            <p className={classes.articleReadTime}>{readTime} min read</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className={classes.articleAuthorNameContainer}>
            <NavLink
              to={`/user/${authorName}`}
              className="text-decoration-none"
            >
              <p className={`${classes.articleAuthor}`}>by {authorName}</p>
            </NavLink>
          </div>
          <div className="d-flex">
            <div
              className={`mb-auto ${
                saveArticle ? `${classes.saved}` : `${classes.unSaved}`
              }`}
              onClick={handleSaveArticle}
            >
              <span
                className={`material-icons-outlined ${classes.unSavedIcon}`}
              >
                bookmark_border
              </span>
              <span className={`material-icons-outlined ${classes.savedIcon}`}>
                bookmark
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleArticleItem;
