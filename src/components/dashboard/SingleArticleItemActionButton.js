import React from "react";
import inviteIcon from "../images/article-invite-button-icon.png";
import classes from "./SingleArticleItemActionButton.module.css";

const SingleArticleItemActionButton = (props) => {
  return (
    <div
      className={`d-md-flex d-none ${classes.inviteButton}`}
      onClick={() => props.setModalShow(true)}
    >
      <div className={`${classes.inviteIconContainer}`}>
        <img src={inviteIcon} alt="" width="15x" />
      </div>
      <div className="d-flex">
        <p className={`${classes.inviteText}`}>invite reviewers</p>
      </div>
    </div>
  );
};

export default SingleArticleItemActionButton;
