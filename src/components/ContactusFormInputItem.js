import React from "react";
import classes from "./ContactusFormInputItem.module.css";

function ContactusFormInputItem({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={classes.inputItem}
    />
  );
}

export default ContactusFormInputItem;
