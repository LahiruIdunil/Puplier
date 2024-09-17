import React from "react";
import classes from "./SingleNotificationItem.module.css";

function SingleNotificationItem({ notification }) {
  return (
    <div
      className={`${classes.notificationContainer} ${
        notification.read ? "" : `${classes.unReadNotification}`
      }`}
    >
      <div className={`row`}>
        <div className="col-auto">
          <div
            className={classes.userImageContainer}
            style={{
              backgroundImage: `url(${notification.author_profile_picture})`,
            }}
          ></div>
        </div>
        <div className="col">
          <div className={`d-flex ${classes.messageContainer}`}>
            <p className={`m-auto ${classes.message}`}>
              {notification.message}
            </p>
          </div>
          {notification.comment && (
            <div className={`${classes.commentContainer}`}>
              <p className={`${classes.comment}`}>{notification.comment}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleNotificationItem;
