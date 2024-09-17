import React from "react";
import TopPickLinkItem from "./TopPickLinkItem";
import classes from "./TopPickItem.module.css";
import { NavLink } from "react-router-dom";

const TopPickItem = ({ title, links }) => {
  return (
    <div className={`col-lg-4 col-md-6 col-12 ${classes.itemContainer}`}>
      <div className="d-flex">
        <NavLink
          to={`/category/${title.split(" ").join("_")}`}
          style={{ textDecoration: "none" }}
        >
          <h4 className={`${classes.title}`}>{title}</h4>
        </NavLink>
      </div>
      {links.map((item, key) => (
        <TopPickLinkItem topic={item.topic} id={item.id} key={key} />
      ))}
    </div>
  );
};

export default TopPickItem;
