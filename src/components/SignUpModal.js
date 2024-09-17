// TODO: this page has hidden divs, search the keyword "HIDDEN SECTION" to find them

import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import EmailConfirmationModal from "./EmailConfirmationModal";
import SignUpModalTextInput from "./SignUpModalTextInput";
import companyLogo from "./images/business-logo.png";
import googleIcon from "./images/signup-modal-google-icon.png";
import classes from "./SignUpModal.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { NavLink, useFetcher, useNavigate } from "react-router-dom";
import { authContext, loginContext } from "../App";

YupPassword(Yup);

export default function SignUpModal(props) {
  const { setShowLoginModal } = useContext(loginContext);
  const { setAuth } = useContext(authContext);
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [showEmailConfirmationModal, setShowEmailConfirmationModal] =
    useState(false);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    // hide all toast notifications
    toast.dismiss();
    // storing first name and last name in state to pass them to onboarding profile page
    setFirstName(values.firstname);
    setLastName(values.lastname);
    // [TEMPORORY]: storing email and password in state to pass them to the login request
    setEmail(values.email);
    setPassowrd(values.password);

    fetcher.submit(values, { method: "post", action: "/signup" });
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("This field is required!"),
    lastname: Yup.string().required("This field is required!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("This field is required!"),
    password: Yup.string()
      .required("This field is required!")
      .min(8, "Password is too short")
      .minLowercase(1, "password must contain at least 1 lower case letter")
      .minUppercase(1, "password must contain at least 1 upper case letter")
      .minNumbers(1, "password must contain at least 1 number")
      .minSymbols(1, "password must contain at least 1 special character"),
    confirmPassword: Yup.string()
      .required("This field is required!")
      .oneOf([Yup.ref("password"), null], "Passwords do not match"),
  });

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.intent === "signup") {
        if (fetcher.data.status === "ok") {
          // TODO: please remove below line once the email confirmation is implemented
          // login to the system after signup
          fetcher.submit({ email, password }, { method: "post", action: "/" });
        } else {
          toast.error(
            fetcher.data?.error?.response?.data.message ||
              fetcher.data?.error ||
              "Faild to create account!"
          );
        }
      } else if (fetcher.data.intent === "signin") {
        if (fetcher.data.status === "ok") {
          setAuth(true, fetcher.data.user);
          // closes the signup modal
          props.onHide();
          navigate(
            `/signup/onboarding/profile?fname=${firstName}&lname=${lastName}`
          );
        } else {
          toast.error(
            fetcher.data?.error?.response?.data.message ||
              fetcher.data?.error ||
              "Faild to signin!"
          );
        }
      }
    }
  }, [fetcher.data]);

  const handleShowLoginModal = () => {
    // closes the signup modal
    props.onHide();
    setShowLoginModal(true);
  };

  return (
    <>
      {/* signup modal */}
      <Modal
        {...props}
        dialogClassName={classes.customSignupModalContainer}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className={classes.customModalBody}>
          <div className="row m-0">
            <div
              className={`d-xl-flex d-none flex-column justify-content-between col-xl-auto ${classes.leftContainer}`}
            >
              <div className="upperDiv">
                <div className={`d-flex`}>
                  <div className={`d-flex ${classes.logoBox}`}>
                    <img
                      src={companyLogo}
                      alt="company logo"
                      className={`m-auto ${classes.logoImage}`}
                      width="78px"
                    ></img>
                  </div>
                </div>
                <p className={`${classes.tagline}`}>
                  Facilitating research publishing from start to finish
                </p>
              </div>
              <div className="lowerDiv">
                <p className={`${classes.leftBottomText}`}>
                  Already have an acoount?{" "}
                  <span
                    className={`${classes.leftContainerLoginLink}`}
                    onClick={handleShowLoginModal}
                  >
                    Login here
                  </span>
                </p>
              </div>
            </div>
            <div className={`col-xl col-12  ${classes.rightContainer}`}>
              <div className={classes.modalCloseButtonContainer}>
                <span
                  className={`material-icons ${classes.modalCloseButton}`}
                  onClick={props.onHide}
                >
                  close
                </span>
              </div>
              <h3 className={`${classes.title}`}>Join the Waiting List</h3>
              {/* HIDDEN SECTION: hiding below section in release 1.0 */}
              <div
                className={`d-flex justify-content-between align-items-center d-none ${classes.signupWithGoogleButton}`}
              >
                <div className="d-flex">
                  <img className="m-auto" src={googleIcon} />
                </div>
                <p className={`${classes.SignupWithGoogleButtonContent}`}>
                  Sign Up with Google
                </p>
              </div>
              {/* HIDDEN SECTION: hiding below section in release 1.0 */}
              <p className={` invisible ${classes.signupWithEmailText}`}>
                or sign in with your email
              </p>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                <Form>
                  <div className={`row ${classes.doubleInputContainer}`}>
                    <div className="col-sm-6 col-12">
                      <SignUpModalTextInput
                        type="text"
                        name="firstname"
                        label="first name"
                      />
                    </div>
                    <div className="col-sm-6 col-12">
                      <SignUpModalTextInput
                        type="text"
                        name="lastname"
                        label="last name"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <SignUpModalTextInput
                        type="email"
                        name="email"
                        label="email"
                      />
                    </div>
                  </div>
                  <div className={`row ${classes.doubleInputContainer}`}>
                    <div className="col-sm-6 col-12">
                      <SignUpModalTextInput
                        type="password"
                        name="password"
                        label="password"
                      />
                    </div>
                    <div className="col-sm-6 col-12">
                      <SignUpModalTextInput
                        type="password"
                        name="confirmPassword"
                        label="confirm password"
                      />
                    </div>
                  </div>
                  <div>
                    <button type="submit" className={`${classes.submitButton}`}>
                      {fetcher.state === "idle" ? (
                        <p className={classes.submitButtonContent}>Next</p>
                      ) : (
                        <BeatLoader loading size={10} />
                      )}
                    </button>
                  </div>
                </Form>
              </Formik>
              <p className={`${classes.bottomText}`}>
                By signing up with Pupler, you are confirming that you have
                read, understood and accepted our{" "}
                <NavLink
                  onClick={() => props.onHide()}
                  to="/terms-and-conditions"
                >
                  <span className={`${classes.bottomTextLink}`}>
                    Terms and Conditions
                  </span>
                </NavLink>{" "}
                and{" "}
                <NavLink onClick={() => props.onHide()} to="/privacy-policy">
                  <span className={`${classes.bottomTextLink}`}>
                    Privacy Policy
                  </span>
                </NavLink>
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* email confirmation modal */}
      <EmailConfirmationModal show={showEmailConfirmationModal} />
    </>
  );
}

export const singupAction =
  (sendRequest) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { firstname, lastname, email, password } =
      Object.fromEntries(formData);

    const bcrypt = require("bcryptjs");
    const salt = bcrypt.genSaltSync(13);

    const hashedPassword = bcrypt.hashSync(password, salt);

    let data = {
      body: {
        // TODO: set loginName or remove the field
        loginName: "username",
        firstName: firstname,
        lastName: lastname,
        password: hashedPassword,
        email,
        userActionType: "Register",
      },
    };

    const resolved = (response) => {
      return { status: "ok", intent: "signup", response };
    };
    const rejected = (error) => {
      return { status: "error", intent: "signup", error };
    };

    return sendRequest(
      "post",
      "/authentication/auth/signUp",
      data,
      resolved,
      rejected
    );
  };
