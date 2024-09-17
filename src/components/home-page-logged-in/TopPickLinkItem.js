import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./TopPickLinkItem.module.css";

const TopPickLinkItem = ({ topic, id }) => {
  return (
    <div className={`d-flex ${classes.topicContainer}`}>
      <NavLink
        to={`/article/${id}/${topic.split(" ").join("_")}`}
        className="text-decoration-none"
      >
        <p className={`${classes.topic}`}>{topic}</p>
      </NavLink>
    </div>
  );
};

export default TopPickLinkItem;
