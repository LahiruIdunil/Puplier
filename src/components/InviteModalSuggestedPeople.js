import React, { useEffect, useState } from "react";
import classes from "./InviteModalSuggestedPeople.module.css";
import defaultAvatar from "./images/avator.png";

const InviteModalSuggestedPeople = ({
  addSuggestedProfile,
  removeSuggestedProfile,
  profile,
}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selected) {
      addSuggestedProfile(profile.loginName);
    } else {
      removeSuggestedProfile(profile.loginName);
    }
  }, [selected]);

  return (
    <div
      className={`${classes.componentBody} ${
        selected ? `${classes.selectedItem}` : ""
      }`}
      onClick={() => setSelected((prevState) => !prevState)}
    >
      <div className={`row m-0 align-items-center`}>
        <div className="col-auto p-0">
          <div
            className={`${classes.pictureDiv}`}
            style={{
              backgroundImage: profile?.profileImage
                ? `url(${profile.profileImage})`
                : `url(${defaultAvatar})`,
            }}
          ></div>
        </div>
        <div
          className={`col p-0 d-flex justify-content-between ${classes.componentRightContainer}`}
        >
          <div className={`${classes.nameContainer}`}>
            <p className={`${classes.componentText}`}>
              {profile.firstName} {profile.lastName}
            </p>
          </div>
          <span
            className={`material-icons ${classes.toggleIcon} ${classes.addIcon}`}
          >
            add
          </span>
          <span
            className={`material-icons ${classes.toggleIcon} ${classes.closeIcon}`}
          >
            close
          </span>
        </div>
      </div>
    </div>
  );
};

export default InviteModalSuggestedPeople;
