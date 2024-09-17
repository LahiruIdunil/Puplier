import React, { useState } from "react";
import classes from "./BookmarkArticleItem.module.css";
import bookmarkRemoveIcon from "../images/remove-bookmark-from-the-list-icon.png";
import { NavLink } from "react-router-dom";

const BookmarkArticleItem = (props) => {
  const [showArticle, setshowArticle] = useState(true);

  return (
    showArticle && (
      <div className={`row`}>
        <div className="col-12">
          <div className={`${classes.itemContainer}`}>
            {/* visible only in screens greater than 575px */}
            <div className={`d-sm-block d-none ${classes.dateContainer}`}>
              <p className={`${classes.articlePublishedDate}`}>{props.date}</p>
            </div>
            <div className="row">
              <div className={`col-auto`}>
                <NavLink
                  to={`/article/${props.articleId}/${props.articleTitle
                    .split(" ")
                    .join("_")}`}
                >
                  <div
                    className={`${classes.articleImageContainer}`}
                    style={{ backgroundImage: `url(${props.articleImage})` }}
                  ></div>
                </NavLink>
              </div>
              <div className="col">
                <div className="row justify-content-between">
                  <div
                    className={`col-auto ${classes.articletitleContainer}`}
                    style={{ margin: "auto 0" }}
                  >
                    <NavLink
                      to={`/article/${props.articleId}/${props.articleTitle
                        .split(" ")
                        .join("_")}`}
                      className="text-decoration-none"
                    >
                      <p className={`${classes.articleTitle}`}>
                        {props.articleTitle}
                      </p>
                    </NavLink>
                  </div>
                  <div className="col-auto">
                    <div>
                      <img
                        onClick={() => setshowArticle(false)}
                        className={`${classes.bookmarkRemoveIcon}`}
                        src={bookmarkRemoveIcon}
                        alt="icon"
                      />
                    </div>
                  </div>
                </div>
                <div className={`${classes.articlContentContainer}`}>
                  <p className={`d-sm-block d-none ${classes.articleContent}`}>
                    {props.articleContent}
                  </p>
                  {/* visible only in screens smaller than 575px */}
                  <div className={`d-sm-none d-block ${classes.dateContainer}`}>
                    <p className={`${classes.articlePublishedDate}`}>
                      {props.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default BookmarkArticleItem;
