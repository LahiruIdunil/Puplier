import React, { useState } from "react";
import classes from "./DashboardNavBar.module.css";
import DashboardNavItem from "./DashboardNavItem";
import myArticlesActiveIcon from "../images/my-articles-active.png";
import myArticlesNonActiveIcon from "../images/my-articles.png";
import editRequestsActiveIcon from "../images/edit-requests-active.png";
import editRequestsNonActiveIcon from "../images/edit-requests.png";
import sharedWithMeActiveIcon from "../images/shared-with-me-active.png";
import sharedWithMeNonActiveIcon from "../images/shared-with-me.png";
import inviteActiveIcon from "../images/invite-active.png";
import inviteNonActiveIcon from "../images/invite.png";
import notificationsActiveIcon from "../images/notifications-active.png";
import notificationsNonActiveIcon from "../images/notifications.png";
import bookmarksActiveIcon from "../images/bookmarks-active.png";
import bookmarksNonActiveIcon from "../images/bookmarks.png";

const DashboardNavBar = () => {
  const [topNavLinks, setNavLinks] = useState([
    {
      activeIcon: myArticlesActiveIcon,
      nonActiveIcon: myArticlesNonActiveIcon,
      name: "my articles",
      path: "my-articles",
    },
    {
      activeIcon: editRequestsActiveIcon,
      nonActiveIcon: editRequestsNonActiveIcon,
      name: "Reviews In Progress",
      path: "edit-requests",
    },
    {
      activeIcon: sharedWithMeActiveIcon,
      nonActiveIcon: sharedWithMeNonActiveIcon,
      name: "review requests",
      path: "shared-with-me",
    },
    {
      activeIcon: inviteActiveIcon,
      nonActiveIcon: inviteNonActiveIcon,
      name: "invite",
      path: "invite",
    },
  ]);

  const [bottomNavLinks, setBottomNavLinks] = useState([
    {
      activeIcon: notificationsActiveIcon,
      nonActiveIcon: notificationsNonActiveIcon,
      name: "notifications",
      path: "notifications",
    },
    {
      activeIcon: bookmarksActiveIcon,
      nonActiveIcon: bookmarksNonActiveIcon,
      name: "bookmarks",
      path: "bookmarks",
    },
  ]);

  return (
    <div className={`${classes.dashboardNavBarContainer}`}>
      {topNavLinks.map((item, key) => (
        <DashboardNavItem
          key={key}
          activeIcon={item.activeIcon}
          nonActiveIcon={item.nonActiveIcon}
          name={item.name}
          path={item.path}
          comingSoon={item.name === "invite" ? true : false}
        />
      ))}
      <div>
        <div className={`${classes.navBarDevider}`}></div>
      </div>
      {bottomNavLinks.map((item, key) => (
        <DashboardNavItem
          key={key}
          activeIcon={item.activeIcon}
          nonActiveIcon={item.nonActiveIcon}
          name={item.name}
          path={item.path}
          comingSoon={true}
        />
      ))}
    </div>
  );
};

export default DashboardNavBar;
