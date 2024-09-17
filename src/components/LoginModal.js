// TODO: this page has hidden divs, search the keyword "HIDDEN SECTION" to find them

import React, { useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./LoginModal.module.css";
import LoginModalInput from "./LoginModalInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { authContext } from "../App";
import { useActionData, useSubmit, useNavigation } from "react-router-dom";
import { signupContext } from "../App";
import SignInWithGoogle from "./SignInWithGoogle";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function LoginModal(props) {
  const { setAuth } = useContext(authContext);
  const submit = useSubmit();
  const actionData = useActionData();
  const navigation = useNavigation();
  const { setShowSignupModal } = useContext(signupContext);

  // initial values passed to the form
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    submit(values, { method: "post", action: "/" });
  };

  //form validation rules
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  // make relavent changes once the response from backend receives
  useEffect(() => {
    if (actionData && actionData.intent === "signin") {
      if (actionData.status === "ok") {
        // hides the loggin modal
        props.onHide();
        setAuth(true, actionData.user);
      } else if (actionData.status === "error") {
        toast.error(
          actionData?.error?.response?.data.message ||
            actionData?.error?.message ||
            actionData.error
        );
      }
    }
  }, [actionData]);

  const handleShowSignupModal = () => {
    // closes the login modal
    props.onHide();
    setShowSignupModal(true);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className={classes.customModalBody}>
        <div className={classes.modalCloseButtonContainer}>
          <span
            className={`material-icons ${classes.modalCloseButton}`}
            onClick={() => props.onHide()}
          >
            close
          </span>
        </div>
        <div className={classes.modalBodyContainer}>
          <h3 className={classes.title}>Login</h3>
          {/* HIDDEN SECTION: hide below section in release 1.0 */}
          <div className="d-none">
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
            >
              <SignInWithGoogle />
            </GoogleOAuthProvider>
            <div className="position-relative">
              <p className={classes.orLoginText}>Or login with you email</p>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className={classes.formRow}>
                <LoginModalInput
                  label="Email"
                  inputType="email"
                  fieldName="email"
                />
              </div>
              <div className={classes.formRow}>
                <LoginModalInput
                  label="Password"
                  inputType="password"
                  fieldName="password"
                />
              </div>
              <button
                type="submit"
                className={classes.submitBtn}
                disabled={navigation.state === "idle" ? false : true}
                style={{
                  cursor:
                    navigation.state === "idle" ? "pointer" : "not-allowed",
                }}
              >
                {navigation.state === "idle" ? (
                  <p className={classes.submitBtnText}>login</p>
                ) : (
                  <BeatLoader loading size={10} />
                )}
              </button>
            </Form>
          </Formik>
        </div>
        <div className={classes.bottomTextDiv}>
          <p className={classes.bottomText}>
            Haven’t registered with puplier yet?
          </p>
          <p onClick={handleShowSignupModal} className={classes.bottomTextLink}>
            sign up
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export const LoginAction =
  (sendRequest) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { email: userIdentification, password } =
      Object.fromEntries(formData);

    let data = {
      body: {
        userIdentification,
        password,
      },
    };

    const resolved = (response) => {
      let userData = response.data.body;
      let user = {
        userId: userData.userId,
        accessToken: userData.accessToken,
      };
      return { status: "ok", intent: "signin", user };
    };

    const rejected = (error) => {
      return { status: "error", intent: "signin", error };
    };

    return sendRequest(
      "post",
      "/authentication/auth/signIn",
      data,
      resolved,
      rejected
    );
  };
