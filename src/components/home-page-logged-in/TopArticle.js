import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./TopArticle.module.css";

const TopArticle = () => {
  return (
    <div className="row">
      <div className="col-lg-auto col-12">
        <NavLink to="/article/1/lorem">
          <div
            className={`${classes.topArticleImage}`}
            style={{
              backgroundImage: "url(https://picsum.photos/id/537/500)",
            }}
          ></div>
        </NavLink>
      </div>
      <div
        className={`col-lg col-12 d-flex flex-column justify-content-between ${classes.topArticleDetailsContainer}`}
      >
        <div>
          <NavLink to="/article/1/lorem" className={classes.navLink}>
            <h2 className={`${classes.topArticleTitle}`}>
              Exploring the Dynamics of Black Holes and Event Horizons in
              General Relativity
            </h2>
          </NavLink>
          <p className={`${classes.topArticleAuthor}`}>By Joan Smith</p>
          <p className={`${classes.topArticleContent}`}>
            This scientific article examines the everyday realities of life in
            the developing world. It focuses on the various strategies ...
          </p>
        </div>
        <div className="d-flex">
          <NavLink to="/article/1/lorem" className={classes.navLink}>
            <p className={`${classes.topArticleReadMore}`}>continue reading</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TopArticle;
