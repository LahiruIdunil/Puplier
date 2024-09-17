import React, { useState } from "react";
import classes from "./DashboardBottomNavBar.module.css";
import myArticlesActiveIcon from "../images/dashboard-bottom-nav-bar-my-articles-active-icon.png";
import myArticlesIcon from "../images/dashboard-bottom-nav-bar-my-articles-icon.png";
import requestsIcon from "../images/dashboard-bottom-nav-bar-requests-icon.png";
import requestsActiveIcon from "../images/dashboard-bottom-nav-bar-requests-active-icon.png";
import sharedIcon from "../images/dashboard-bottom-nav-bar-shared-icon.png";
import sharedActiveIcon from "../images/dashboard-bottom-nav-bar-shared-active-icon.png";
import inviteIcon from "../images/dashboard-bottom-nav-bar-invite-icon.png";
import inviteActiveIcon from "../images/dashboard-bottom-nav-bar-invite-active-icon.png";
import DashboardBottomNavBarTabItem from "./DashboardBottomNavBarTabItem";

const DashboardBottomNavBar = () => {
  const [navItemsList, setNavItemsList] = useState([
    {
      activeIcon: myArticlesActiveIcon,
      nonActiveIcon: myArticlesIcon,
      tabName: "my articles",
      path: "my-articles",
    },
    {
      activeIcon: requestsActiveIcon,
      nonActiveIcon: requestsIcon,
      tabName: "reviews",
      path: "edit-requests",
    },
    {
      activeIcon: sharedActiveIcon,
      nonActiveIcon: sharedIcon,
      tabName: "shared",
      path: "shared-with-me",
    },
    {
      activeIcon: inviteActiveIcon,
      nonActiveIcon: inviteIcon,
      tabName: "invite",
      path: "invite",
    },
  ]);

  return (
    <div className={`${classes.navBarContainer}`}>
      <div className="row">
        {navItemsList.map((item, key) => (
          <DashboardBottomNavBarTabItem
            key={key}
            activeIcon={item.activeIcon}
            nonActiveIcon={item.nonActiveIcon}
            tabName={item.tabName}
            path={item.path}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardBottomNavBar;
