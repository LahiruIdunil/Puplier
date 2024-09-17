// TODO: this page has hidden divs, search the keyword "HIDDEN SECTION" to find them

import React, { useState, useContext, useEffect, useRef } from "react";
import classes from "./LoggedInNavigationBar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import NavBarBusinessLogo from "./NavBarBusinessLogo";
import NavBarMenuIcon from "./NavBarMenuIcon";
import NavigationBarLinkComponent from "./NavigationBarLinkComponent";
import NavbarSearchField from "./NavbarSearchField";
import DesktopNavbarSearchFieldContainer from "./DesktopNavbarSearchFieldContainer";
import { authContext } from "../App";
import { userContext } from "./LoggedInBaseLayout";
import defaultAvatar from "./images/avator.png";

const LoggedInNavigationBar = () => {
  const { setAuth } = useContext(authContext);
  const menuButtonRef = useRef();
  const navigate = useNavigate();
  const user = useContext(userContext);
  const [dropdownLinkList, setDropDownLinkList] = useState([]);

  // updates the dropdownLinkList
  useEffect(() => {
    setDropDownLinkList([
      {
        path: `/user/${user?.loginName}?id=${user?.userId}`,
        tabName: "my profile",
      },
      {
        path: "/profile/edit/interests",
        tabName: "edit interests",
      },
      {
        path: "/dashboard/bookmarks",
        tabName: "bookmarks",
      },
      {
        path: "/dashboard/notifications",
        tabName: "notifications",
      },
    ]);
  }, [user]);

  const [navBarLinkList, setNavBarLinkList] = useState([
    {
      path: "/",
      tabName: "home",
    },
    {
      path: "/dashboard/my-articles",
      tabName: "dashboard",
    },
    {
      path: "/about-us",
      tabName: "about us",
    },
    {
      path: "/contact-us",
      tabName: "contact us",
    },
  ]);

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      className={classes.customToggle}
      style={{
        backgroundImage: user?.profileImage
          ? `url(${user.profileImage})`
          : `url(${defaultAvatar})`,
      }}
    >
      <a
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        style={{ cursor: "pointer" }}
      >
        {children}
      </a>
    </div>
  ));

  const logout = () => {
    setAuth(false);
    navigate("/");
  };

  return (
    <>
      <div className={`sectino ${classes.mainNavigationBar}`}>
        <nav className={`navbar navbar-expand-lg ${classes.navbarContainer}`}>
          <div className="container customContainer">
            <div>
              <Link className="businessLogo" to="/">
                <NavBarBusinessLogo />
              </Link>
            </div>
            <button
              style={{
                color: "#383838",
                boxShadow: "none",
                outline: "none",
                border: "none",
              }}
              ref={menuButtonRef}
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <NavBarMenuIcon />
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarTogglerDemo01"
            >
              <div className="d-flex justify-content-lg-start justify-content-center">
                <ul className="navbar-nav me-lg-auto me-0 mb-2 mb-lg-0">
                  {/* this search button is displayed only in screans greater than 991px */}
                  <li
                    className={`nav-item d-lg-flex d-none p-0 ${classes.customNavItem}`}
                  >
                    <DesktopNavbarSearchFieldContainer />
                  </li>
                  {/* this search button is displayed only in screans smaller than 991px */}
                  <li
                    className={`nav-item d-lg-none d-flex ${classes.customNavItem}`}
                  >
                    <NavbarSearchField menuButtonRef={menuButtonRef}/>
                  </li>
                  {/* this new-article button is displayed only in screans greater than 991px */}
                  <li
                    className={`nav-item d-lg-flex d-none ${classes.customNavItem} ${classes.newArticleButtonContainer}`}
                  >
                    <NavLink to="/dashboard/my-articles/new">
                      <button className={`${classes.newArticleButton}`}>
                        new article
                      </button>
                    </NavLink>
                  </li>
                  {navBarLinkList.map((item, key) => (
                    <li
                      key={key}
                      className={`nav-item ${classes.customNavItem}`}
                    >
                      <NavigationBarLinkComponent
                        path={item.path}
                        tabName={item.tabName}
                        menuButtonRef={menuButtonRef}
                      />
                    </li>
                  ))}
                  <div className="d-lg-none d-block">
                    {dropdownLinkList.map((item, key) => (
                      <li
                        key={key}
                        className={`nav-item ${classes.customNavItem}`}
                      >
                        <NavigationBarLinkComponent
                          path={item.path}
                          tabName={item.tabName}
                          menuButtonRef={menuButtonRef}
                        />
                      </li>
                    ))}
                    <li className={`nav-item ${classes.customNavItem}`}>
                      <p
                        className={`${classes.mobileViewLogoutButton}`}
                        onClick={logout}
                      >
                        logout
                      </p>
                    </li>
                  </div>
                  {/* this new-article button is displayed only in screans smaller than 991px */}
                  <li
                    className={`nav-item d-lg-none d-flex ${classes.customNavItem} ${classes.newArticleButtonContainer}`}
                  >
                    <NavLink to="/dashboard/my-articles/new">
                      <button
                        onClick={() => menuButtonRef.current.click()}
                        className={`${classes.newArticleButton}`}
                      >
                        new article
                      </button>
                    </NavLink>
                  </li>
                  <li
                    className={`nav-item ${classes.customNavItem} ${classes.userAvatarContainer}`}
                    style={{ paddingRight: "0" }}
                  >
                    <Dropdown className="d-lg-block d-none">
                      <Dropdown.Toggle
                        as={CustomToggle}
                        variant="success"
                        id="dropdown-basic"
                      ></Dropdown.Toggle>

                      <Dropdown.Menu className={classes.customDropdownMenu}>
                        {dropdownLinkList.map((item, key) => (
                          <Dropdown.Item
                            key={key}
                            as={Link}
                            to={item.path}
                            className={classes.customDropdownItem}
                          >
                            {item.tabName}
                          </Dropdown.Item>
                        ))}
                        {/* TODO: make the request to the server */}
                        <Dropdown.Item
                          className={classes.customDropdownItem}
                          onClick={logout}
                        >
                          logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default LoggedInNavigationBar;
