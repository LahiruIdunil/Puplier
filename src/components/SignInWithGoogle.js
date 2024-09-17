import React from "react";
import classes from "./SignInWithGoogle.module.css";
import googleLogo from "./images/signup-modal-google-icon.png";
import { useGoogleLogin } from "@react-oauth/google";

function SignInWithGoogle() {
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (res) => console.log("success", res),
    onFailure: (res) => console.log("error", res),
  });

  return (
    <div onClick={loginWithGoogle} className={classes.googleSignInBox}>
      <img src={googleLogo} alt="goolge logo" />
      <p className={classes.googleSignInText}>Sign in with Google</p>
    </div>
  );
}

export default SignInWithGoogle;
