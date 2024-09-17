import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./SingleReviewer.module.css";
import defaultAvatar from "../components/images/avator.png";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function SingleReviewer({
  reviewerName,
  userName,
  userImage,
  userId,
}) {
  const tooltip = (
    <Tooltip id="tooltip" style={{ textTransform: "capitalize" }}>
      {reviewerName}
    </Tooltip>
  );

  return (
    <div className={`col-xl-3 col-auto ${classes.itemContainer}`}>
      <NavLink to={`/user/${userName}?id=${userId}`}>
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <div
            className={`${classes.imageContainer}`}
            style={{
              backgroundImage: userImage
                ? `url(${userImage})`
                : `url(${defaultAvatar})`,
            }}
          ></div>
        </OverlayTrigger>
      </NavLink>
    </div>
  );
}
