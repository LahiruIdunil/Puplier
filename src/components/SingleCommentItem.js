import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./SingleCommentItem.module.css";

const SingleCommentItem = (props) => {
  return (
    <div className={`row ${classes.commentContainer}`}>
      <div className="col-auto">
        <NavLink to={`/user/${props.userName}?id=${props.userId}`}>
          <div
            className={`${classes.commentWriteImageContainer}`}
            style={{ backgroundImage: `url(${props.userImage})` }}
          ></div>
        </NavLink>
      </div>
      <div className="col">
        <div className="d-flex">
          <NavLink
            to={`/user/${props.userName}?id=${props.userId}`}
            className="text-decoration-none"
          >
            <p className={`${classes.commentWriterName}`}>{props.fullName}</p>
          </NavLink>
        </div>
        <p className={`${classes.commentContent}`}>{props.comment}</p>
      </div>
    </div>
  );
};

export default SingleCommentItem;
