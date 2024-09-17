import React from "react";
import ReactDom from "react-dom";
import classes from "./Preloader.module.css";
import businesslogo from "./images/business-logo.png";

function Preloader({ isLoading }) {
  return ReactDom.createPortal(
    <>
      {isLoading && (
        <div className={classes.loaderContainer}>
          <img className={classes.loader} src={businesslogo} width="70px" />
        </div>
      )}
    </>,
    document.getElementById("portal-root")
  );
}

export default Preloader;
