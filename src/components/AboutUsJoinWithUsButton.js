import React, { useContext } from "react";
import classes from "./AboutUsJoinWithUsButton.module.css";
import { signupContext } from "../App";

function AboutUsJoinWithUsButton({ buttonText, style }) {
  const { setShowSignupModal } = useContext(signupContext);

  return (
    <div className="d-flex justify-content-lg-start justify-content-center">
      <button
        className={classes.joinWithPuplierBtn}
        onClick={() => setShowSignupModal(true)}
        style={style}
      >
        <p className={classes.joinWithPuplierBtnText}>{buttonText}</p>
      </button>
    </div>
  );
}

export default AboutUsJoinWithUsButton;
