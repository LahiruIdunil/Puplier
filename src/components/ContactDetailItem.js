import React from "react";
import classes from "./ContactDetailItem.module.css";

function ContactDetailItem({ icon, detail }) {
  return (
    <div className={`d-flex ${classes.itemContainer}`}>
      <span className={`material-icons-outlined ${classes.icon}`}>{icon}</span>
      <p className={`align-items-center ${classes.detail}`}>{detail}</p>
    </div>
  );
}

export default ContactDetailItem;
