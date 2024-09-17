import classes from "./Footer.module.css";

import facebookIcon from "./images/footer-facebook.png";
import instagramIcon from "./images/footer-instagram.png";
import twitterIcon from "./images/footer-twitter.png";
import spotifyIcon from "./images/footer-spotify.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className={`footer ${classes.footer}`}>
      <div className="container customContainer">
        <div className="row">
          <div className="col-12">
            <div className={`row ${classes.footerLinksContainer}`}>
              <div
                className={`col-xl-5 col-md-4 col-12 mb-md-0 mb-5 ${classes.footerLinkSet}`}
              >
                <div className={classes.singleFooterLinkContainer}>
                  <NavLink to="/" className={classes.footerNavLink}>
                    <p className={`${classes.footerLink}`}>home</p>
                  </NavLink>
                </div>
                <div className={classes.singleFooterLinkContainer}>
                  <NavLink to="/about-us" className={classes.footerNavLink}>
                    <p className={`${classes.footerLink}`}>about us</p>
                  </NavLink>
                </div>
                <div className={classes.singleFooterLinkContainer}>
                  <NavLink to="/contact-us" className={classes.footerNavLink}>
                    <p className={`${classes.footerLink}`}>contact us</p>
                  </NavLink>
                </div>
                <div className={classes.singleFooterLinkContainer}>
                  <NavLink to="#" className={classes.footerNavLink}>
                    <p className={`${classes.footerLink}`}>how it works</p>
                  </NavLink>
                </div>
                <div className={classes.singleFooterLinkContainer}>
                  <NavLink to="#" className={classes.footerNavLink}>
                    <p className={`${classes.footerLink}`}>FAQ</p>
                  </NavLink>
                </div>
              </div>
              <div
                className={`col-xl-5 col-md-4 col-12 mb-md-0 mb-5 ${classes.footerLinkSet}`}
              >
                <div>
                  <div className={classes.singleFooterLinkContainer}>
                    <NavLink to="#" className={classes.footerNavLink}>
                      <p className={`${classes.footerLink}`}>Research Papers</p>
                    </NavLink>
                  </div>
                  <div className={classes.singleFooterLinkContainer}>
                    <NavLink to="#" className={classes.footerNavLink}>
                      <p className={`${classes.footerLink}`}>Careers</p>
                    </NavLink>
                  </div>
                  <div className={classes.singleFooterLinkContainer}>
                    <NavLink to="#" className={classes.footerNavLink}>
                      <p className={`${classes.footerLink}`}>Blog</p>
                    </NavLink>
                  </div>
                  <div className={classes.singleFooterLinkContainer}>
                    <NavLink
                      to="/privacy-policy"
                      className={classes.footerNavLink}
                    >
                      <p className={`${classes.footerLink}`}>Privacy Policy</p>
                    </NavLink>
                  </div>
                  <div className={classes.singleFooterLinkContainer}>
                    <NavLink
                      to="/terms-and-conditions"
                      className={classes.footerNavLink}
                    >
                      <p className={`${classes.footerLink}`}>
                        Terms & Conditions
                      </p>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div
                className={`col-xl-2 col-md-4 col-12 mb-md-0 mb-5 d-flex justify-content-xl-start justify-content-md-end justify-content-center`}
              >
                <div>
                  <NavLink to="#" className={classes.footerNavLink}>
                    <p className={`${classes.footerLink}`}>Resources</p>
                  </NavLink>
                  <NavLink to="#" className={classes.footerNavLink}>
                    <p className={`${classes.footerLink}`}>Support Us</p>
                  </NavLink>
                  <NavLink to="#" className={classes.footerNavLink}>
                    <p className={`${classes.footerLink}`}>Download App</p>
                  </NavLink>
                  <NavLink to="#" className={classes.footerNavLink}>
                    <p className={`${classes.footerLink}`}>Events</p>
                  </NavLink>
                  <NavLink to="#" className={classes.footerNavLink}>
                    <p className={`${classes.footerLink}`}>News</p>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="row justify-content-xxl-end justify-content-md-start justify-content-center">
              <div className="col-xxl-2 col-auto offset-xxl-10 offset-0">
                <h4 className={`${classes.followUs}`}>follow us</h4>
                <div className="d-flex">
                  <img
                    className={`${classes.footerIcon}`}
                    src={facebookIcon}
                    alt="facebook-icon"
                  />
                  <img
                    className={`${classes.footerIcon}`}
                    src={twitterIcon}
                    alt="facebook-icon"
                  />
                  <img
                    className={`${classes.footerIcon}`}
                    src={instagramIcon}
                    alt="facebook-icon"
                  />
                  <img
                    className={`${classes.footerIcon}`}
                    src={spotifyIcon}
                    alt="facebook-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
