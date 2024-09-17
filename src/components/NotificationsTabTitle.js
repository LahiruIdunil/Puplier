import React from "react";
import DashboardTabTitle from "./dashboard/DashboardTabTitle";
import titleIcon from "./images/notifications-title-icon.png";
import classes from "./NotificationsTabTitle.module.css";

function NotificationsTabTitle() {
  return (
    <div className="d-flex justify-content-between">
      <DashboardTabTitle
        icon={titleIcon}
        iconWidth="21px"
        iconHeight="27px"
        tabName="Notifications"
        overRideStyles={classes.tabTitle}
      />
      <div className="d-flex">
        <p className={`m-auto ${classes.markAllAsReadButton}`}>
          Mark all as read
        </p>
      </div>
    </div>
  );
}

export default NotificationsTabTitle;
