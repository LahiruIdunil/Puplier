import React, { useContext } from "react";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import LoginModal from "./LoginModal";
import { loginContext, signupContext } from "../App";
import SignUpModal from "./SignUpModal";
import HideComponenet from "./HideComponenet";
import ShowComponentIn from "./ShowComponentIn";
import AlphaReleaseMessage from "./AlphaReleaseMessage";

const hideComponentIn = [
  "/signup/onboarding/profile",
  "/signup/onboarding/interest",
];

const showAlphaReleaseMessageIn = ["/"];

const NonLoggedInBaseLayout = () => {
  const { showLoginModal, setShowLoginModal } = useContext(loginContext);
  const { showSignupModal, setShowSignupModal } = useContext(signupContext);
  return (
    <React.Fragment>
      <ShowComponentIn in={showAlphaReleaseMessageIn}>
        <AlphaReleaseMessage />
      </ShowComponentIn>
      <HideComponenet in={hideComponentIn}>
        <NavigationBar />
      </HideComponenet>
      <Outlet />
      <HideComponenet in={hideComponentIn}>
        <Footer />
      </HideComponenet>
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />
      <SignUpModal
        show={showSignupModal}
        onHide={() => setShowSignupModal(false)}
      />
    </React.Fragment>
  );
};

export default NonLoggedInBaseLayout;
