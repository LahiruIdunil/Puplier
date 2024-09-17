import React from "react";
import classes from "./DashboardMobileWriteArticleButton.module.css";
import buttonIcon from "../images/mobile-write-article-button-icon.png";
import { NavLink } from "react-router-dom";

const DashboardMobileWriteArticleButton = () => {
  return (
    <div className={`row d-lg-none d-flex ${classes.buttonContainer}`}>
      <div>
        <NavLink
          to="/dashboard/my-articles/new"
          className="text-decoration-none"
        >
          <div className="col-auto">
            <div className={`${classes.button}`}>
              <img className="m-auto" src={buttonIcon} alt="icon" />
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardMobileWriteArticleButton;
