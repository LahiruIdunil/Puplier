import React, { createContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoggedInNavigationBar from "./LoggedInNavigationBar";
import Footer from "./Footer";
import { toast } from "react-toastify";
import useHttp from "../custom-hooks/useHttp";
import HideComponenet from "./HideComponenet";
import ShowComponentIn from "./ShowComponentIn";
import AlphaReleaseMessage from "./AlphaReleaseMessage";

export const userContext = createContext();

const hideNavbarAndFooterIn = [
  "/signup/onboarding/profile",
  "/signup/onboarding/interest",
];

const showAlphaReleaseMessageIn = ["/"];

const LoggedInBaseLayout = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { sendRequest } = useHttp();
  const { pathname } = useLocation();

  let user = JSON.parse(localStorage.getItem("user"));
  let data = {
    userId: user?.userId || null,
  };

  const resolved = (response) => {
    setUserDetails(response.data.body);
  };
  const rejected = (error) => {
    toast.error(error.response.data.message || "Faild to load user data");
  };

  useEffect(() => {
    // get user info by user and store in the context as userDetails
    sendRequest("get", "/user/findUserInfoByUser", data, resolved, rejected);
  }, []);

  // automatically scrolls the page to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return (
    <userContext.Provider value={userDetails}>
      <ShowComponentIn in={showAlphaReleaseMessageIn}>
        <AlphaReleaseMessage />
      </ShowComponentIn>
      <HideComponenet in={hideNavbarAndFooterIn}>
        <LoggedInNavigationBar />
      </HideComponenet>
      <Outlet />
      <HideComponenet in={hideNavbarAndFooterIn}>
        <Footer />
      </HideComponenet>
    </userContext.Provider>
  );
};

export default LoggedInBaseLayout;
