import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./SimilarProfileItem.module.css";
import defaultAvatar from "./images/avator.png";

const SimilarProfileItem = ({
  name,
  description,
  profileImage,
  username,
  userId,
}) => {
  const [profileDescription, setProfileDescription] = useState(null);

  // set the description to 13 words
  useEffect(() => {
    if (description) {
      let maxDescriptionLength = 13;
      let contentArray = description.split(" ");

      if (contentArray.length > maxDescriptionLength) {
        setProfileDescription(contentArray.slice(0, 13).join(" ") + "...");
      } else {
        setProfileDescription(description);
      }
    }
  }, [description]);

  return (
    <div className={`col-lg-3 col-sm-6 col-12 ${classes.itemContainer}`}>
      <div className={`d-flex ${classes.profileMainContainer}`}>
        <div className={classes.profileImageContainer}>
          <NavLink to={`/user/${username}?id=${userId}`}>
            <div
              className={`${classes.profileImage}`}
              style={{
                backgroundImage: profileImage
                  ? `url(${profileImage})`
                  : `url(${defaultAvatar})`,
              }}
            ></div>
          </NavLink>
        </div>
        <div className="d-flex align-items-center">
          <NavLink
            to={`/user/${username}?id=${userId}`}
            style={{ textDecoration: "none" }}
          >
            <p className={`m-auto ${classes.profileName}`}>{name}</p>
          </NavLink>
        </div>
      </div>
      <p className={`${classes.profileDescription}`}>{profileDescription}</p>
    </div>
  );
};

export default SimilarProfileItem;
