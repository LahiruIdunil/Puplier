import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./SideBarSimilarProfileItem.module.css";
import defaultAvatar from "./images/avator.png";

const SideBarSimilarProfileItem = ({
  profileImage,
  name,
  currentPosition,
  userId,
  username,
}) => {
  return (
    <div className={`d-flex ${classes.profileItemContainer}`}>
      <div className={`d-flex ${classes.profileImageContainerParent}`}>
        <NavLink to={`/user/${username}?id=${userId}`}>
          <div
            className={`${classes.profileImageContainer}`}
            style={{
              backgroundImage: profileImage
                ? `url(${profileImage})`
                : `url(${defaultAvatar})`,
            }}
          ></div>
        </NavLink>
      </div>
      <div className="d-fex flex-column justify-content-center">
        <div>
          <div className="d-flex">
            <NavLink
              to={`/user/${username}?id=${userId}`}
              className="text-decoration-none"
            >
              <p className={`${classes.profileName}`}>{name}</p>
            </NavLink>
          </div>
          <p className={`${classes.description}`}>{currentPosition}</p>
        </div>
      </div>
    </div>
  );
};

export default SideBarSimilarProfileItem;
