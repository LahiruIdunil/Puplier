import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./ArticlesYouMayLikeItem.module.css";
import bookmarkIcon from "./images/add-to-bookmarks-icon.png";
import bookmarkAddedIcon from "./images/bookmark-added-icon.png";

const ArticlesYouMayLikeItem = ({ article, overrideStyles }) => {
  const handleBookmarksButton = (e) => {
    Array.from(e.target.parentElement.children).forEach((element) => {
      element.classList.remove("d-none");
      element.classList.add("d-block");
    });
    e.target.classList.add("d-none");
  };

  return (
    <div
      className={`col-xxl-12 col-xl-3 col-md-4 col-sm-6 col-12 ${classes.itemContainer}`}
    >
      <NavLink
        to={`/article/${article.article_id}/${article.title
          .split(" ")
          .join("_")}`}
      >
        <div
          className={`${classes.image} ${overrideStyles}`}
          style={{ backgroundImage: `url(${article.image})` }}
        ></div>
      </NavLink>
      <NavLink
        to={`/article/${article.article_id}/${article.title
          .split(" ")
          .join("_")}`}
        className="text-decoration-none"
      >
        <p className={`${classes.title}`}>{article.title}</p>
      </NavLink>

      <div className="row d-sm-none d-flex">
        <div className="col-auto" style={{ paddingRight: "0" }}>
          <NavLink to={`/user/${article.authorName}`}>
            <div
              className={`${classes.authorImageContainer}`}
              style={{ backgroundImage: `url(${article.authorImage})` }}
            ></div>
          </NavLink>
        </div>
        <div className="col d-flex flex-column justify-content-center">
          <div>
            <NavLink
              to={`/user/${article.authorName}`}
              className="text-decoration-none"
            >
              <p className={`${classes.authorName}`}>{article.authorName}</p>
            </NavLink>
            <div className="d-flex">
              <p className={`${classes.publishedDate}`}>
                {article.publishedDate}
              </p>
              <span className={`${classes.dateDivider}`}>.</span>
              <p className={`${classes.readTime}`}>
                {article.readTime} mins read
              </p>
            </div>
          </div>
        </div>
        <div className="col-auto d-flex">
          <div className={`m-auto`}>
            <div
              className={` ${classes.bookmarkButtonContainer}`}
              onClick={handleBookmarksButton}
            >
              <img
                className="unselectedBookmarkButton d-block"
                src={bookmarkIcon}
                alt="icon"
              />
              <img
                className="selectedBookmarkButton d-none"
                src={bookmarkAddedIcon}
                alt="icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesYouMayLikeItem;
