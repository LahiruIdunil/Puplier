// TODO: this page has hidden divs, search the keyword "HIDDEN SECTION" to find them

import React, { useContext, useRef } from "react";
import classes from "./NavigationBar.module.css";
import { Link, matchPath, useLocation } from "react-router-dom";
import NavBarBusinessLogo from "./NavBarBusinessLogo";
import NavigationBarLinkComponent from "./NavigationBarLinkComponent";
import NavbarSearchField from "./NavbarSearchField";
import DesktopNavbarSearchFieldContainer from "./DesktopNavbarSearchFieldContainer";
import { loginContext, signupContext } from "../App";

const NavigationBar = () => {
  const { pathname } = useLocation();
  const menuButtonRef = useRef();

  const isHomePage = matchPath({ path: "/" }, pathname);
  const { setShowLoginModal } = useContext(loginContext);
  const { setShowSignupModal } = useContext(signupContext);

  return (
    <React.Fragment>
      <div
        className={`section ${classes.mainNavigationBar} ${
          isHomePage ? classes.homePageNavBar : ""
        }`}
      >
        <nav className={`navbar navbar-expand-lg ${classes.navbarContainer}`}>
          <div className="container customContainer">
            <div>
              <Link className="businessLogo" to="/">
                <NavBarBusinessLogo />
              </Link>
            </div>
            <button
              style={{
                boxShadow: "none",
                outline: "none",
                border: "none",
              }}
              ref={menuButtonRef}
              className={`navbar-toggler`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className={`material-icons ${classes.menuIcon}`}>menu</span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarTogglerDemo01"
            >
              <div className="d-flex justify-content-lg-start justify-content-center ">
                <ul className="navbar-nav me-lg-auto me-0 mb-2 mb-lg-0">
                  {/* this li is only displyed in screens greater than 991px */}
                  <li
                    className={`nav-item d-lg-flex d-none pl-0 ${classes.customNavItem}`}
                  >
                    <DesktopNavbarSearchFieldContainer
                      className={classes.overrideSearchIconStyles}
                    />
                  </li>
                  {/* this li is only displyed in screens smaller than 991px */}
                  <li
                    className={`nav-item d-lg-none d-flex ${classes.customNavItem}`}
                  >
                    <NavbarSearchField menuButtonRef={menuButtonRef}/>
                  </li>

                  <li className={`nav-item ${classes.customNavItem}`}>
                    <NavigationBarLinkComponent
                      overrideNavTextStyle={classes.overrideNavTextStyle}
                      menuButtonRef={menuButtonRef}
                      path="/"
                      tabName="home"
                    />
                  </li>
                  <li className={`nav-item ${classes.customNavItem}`}>
                    <NavigationBarLinkComponent
                      overrideNavTextStyle={classes.overrideNavTextStyle}
                      menuButtonRef={menuButtonRef}
                      path="/about-us"
                      tabName="about us"
                    />
                  </li>
                  <li className={`nav-item ${classes.customNavItem}`}>
                    <NavigationBarLinkComponent
                      overrideNavTextStyle={classes.overrideNavTextStyle}
                      menuButtonRef={menuButtonRef}
                      path="/contact-us"
                      tabName="contact us"
                    />
                  </li>
                  <li
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    className={`nav-item ${classes.customNavItem}`}
                  >
                    <div onClick={() => setShowLoginModal(true)}>
                      <p className={`${classes.loginButton}`}>login</p>
                    </div>
                  </li>
                  <li
                    className={`nav-item ${classes.customNavItem}`}
                    style={{ paddingRight: "0" }}
                  >
                    <div onClick={() => setShowSignupModal(true)}>
                      <button className={classes.navBarSignUpButton}>
                        sign up
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default NavigationBar;
