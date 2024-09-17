// TODO: this page has hidden divs, search the keyword "HIDDEN SECTION" to find them

import React, { useContext } from "react";
import locationIcon from "./images/location-icon.png";
import processFlow1 from "./images/process-flow-1.png";
import processFlow2 from "./images/process-flow-2.png";
import processFlow3 from "./images/process-flow-3.png";
import processFlow4 from "./images/process-flow-4.png";
import topBannerImage from "./images/top-banner-image.png";
import publishFlowImage from "./images/publish-flow-image.png";
import faqTitleImage from "./images/faq-title-image.png";
import classes from "./NonLoggedInHomepage.module.css";

import AdvantageListItem from "../components/home-page-not-logged-in/AdvantageListItem";
import BenifitItem from "../components/home-page-not-logged-in/BenifitItem";
import FactItem from "../components/home-page-not-logged-in/FactItem";
import PrimaryButton from "../components/PrimaryButton";
import ProcessFlowItem from "../components/home-page-not-logged-in/ProcessFlowItem";
import PublishFlowItem from "../components/home-page-not-logged-in/PublishFlowItem";
import ReviewItem from "../components/home-page-not-logged-in/ReviewItem";
import FaqAccordion from "../components/home-page-not-logged-in/FaqAccordion";
import MapLocation from "../components/MapLocation";
import { signupContext } from "../App";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

const HomePage = () => {
  const { setShowSignupModal } = useContext(signupContext);

  // set Docuement title
  useDocumentTitle("Puplier | Home");

  return (
    <React.Fragment>
      <section className={`${classes.topBanner}`}>
        <div className={`container customContainer`}>
          <div className="row">
            <div className="col-lg-7 col-12 d-flex justify-content-center flex-column">
              <div>
                <h1 className={`${classes.topBannerTitle}`}>
                  Facilitating research publishing from start to finish
                </h1>
                <h3 className={`${classes.topBannerContent}`}>
                  Combining access, transparency, and affordability to both
                  research producers, reviewers and consumers
                </h3>
                <div className="d-flex">
                  <div onClick={() => setShowSignupModal(true)}>
                    <PrimaryButton
                      overrideStyles={classes.topBannerSignUpButton}
                      innerText="sign up for free!"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-12">
              <div
                className={`topBannerImageContainer d-flex ${classes.topBannerVideo}`}
                style={{
                  backgroundImage: `url(${topBannerImage})`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${classes.traditionalDrawbacks}`}>
        <div className="container customContainer">
          <div className="row justify-content-center">
            <div className="col-xxl-6 col-xl-8 col-lg-9 col-md-10 col-12">
              <h2 className={`${classes.traditionalDrawbacksTitle}`}>
                Traditional Review Process is Costly and{" "}
                <span>Time-Consuming.</span>
              </h2>
              <p className={`${classes.singleDrawback}`}>
                The traditional review process for research papers can be
                <span> unreliable,</span> time-consuming, and costly.{" "}
              </p>
              <p className={`${classes.singleDrawback}`}>
                1 in 4 peer review journals <span>contain inaccuracies.</span>
              </p>
              <p className={`${classes.singleDrawback}`}>
                Average publication costs are about <span>$200 - $1000</span>{" "}
                with rejection rates exceeding 90%.
              </p>
              <p
                className={`${classes.singleDrawback}`}
                style={{ margin: "0" }}
              >
                Worst of all, the current publishing system{" "}
                <span>pays $0 to the actual researchers,</span> reviewers and
                enablers such as universities.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={`${classes.publishFlow}`}>
        <div className="container customContainer">
          <div className="row justify-content-center">
            <div className="col-md-11 col-12">
              <div className="row">
                <div className="col-xxl-8 col-lg-7 col-12">
                  <div className="position-relative">
                    <h2 className={`${classes.pushFlowTitle}`}>
                      How publishing usually happens....
                    </h2>
                    <div className={`${classes.publishFlowUnderline}`}></div>
                  </div>
                  <div className="row">
                    <PublishFlowItem
                      number="1"
                      content="Finding a journal in your niche."
                    />
                    <PublishFlowItem
                      number="2"
                      content="Pay and submit the draft for publication."
                    />
                    <PublishFlowItem
                      number="3"
                      content="Wait for editor acceptance or rejection."
                    />
                    <PublishFlowItem
                      number="4"
                      content="If accepted, move to the peer review process."
                    />
                    <PublishFlowItem
                      number="5"
                      content="If accepted, publish, if rejected, try again."
                    />
                  </div>
                </div>
                <div className="col-xxl-4 col-lg-5 col-12 mt-lg-0 mt-4 d-flex flex-column justify-content-end">
                  <div>
                    <img src={publishFlowImage} alt="image" width="100%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${classes.advantageList}`}>
        <div className="container customContainer">
          <div className="row justify-content-center">
            <div className="col-xxl-9 col-xl-10 col-lg-10 col-12">
              <div className="d-flex">
                <h2
                  className={`text-center m-auto ${classes.advantageListTitle}`}
                >
                  What if you get to focus on your research and we will handle
                  the REST?
                </h2>
              </div>
              <div className="d-flex justify-content-center">
                <div>
                  <AdvantageListItem content="Access to a large pool of editors/reviewers for feedback." />
                  <AdvantageListItem content="Increased visibility in the scientific community." />
                  <AdvantageListItem content="Shine a light on your contributions, no matter how small." />
                  <AdvantageListItem content="Be part of the publication as a reviewer" />
                  <AdvantageListItem content="Saving time/money on the traditional publication process." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${classes.FactsSection}`}>
        <div className="container customContainer">
          <div className="row justify-content-center">
            <div className="col-xxl-9 col-xl-11 col-12">
              <h2 className={`${classes.FactSectionTitle}`}>
                <span className={`${classes.FactSectionTitleHead}`}>
                  Helping Publishers
                </span>
                <span
                  className={`d-sm-inline d-block ${classes.FactSectionTitleTail}`}
                >
                  Publish With Confidence.
                </span>
              </h2>
              <div className="row">
                <FactItem
                  topic="Review by Peers"
                  content="Puplier facilitates review process by peers, chosen by author"
                />
                <FactItem
                  topic="Independent Verfication"
                  content="In addition to review process, voting and linking to journals is available to traceability and accountability."
                />
                <FactItem
                  topic="Be recognized for reviewing"
                  content="Reviewer has the chance to be mentioned in the paper (unlike traditional journals)"
                />
                <FactItem
                  topic="5 dimensional voting"
                  content="Users can vote on the publication across 6 pillars: Accuracy, Completeness, Uniqueness, Consistency, Timeliness, Validity."
                />
                <FactItem
                  topic="A balanced view"
                  content="Between reviewers with various backgrounds the views presented in the article tend to accurate and balanced"
                />
                <FactItem
                  topic="Consumer Engagement"
                  content="Platform gives the power back to producers and consumers. Producers and share their work across social channels to drive engagement."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${classes.reviewSection}`}>
        <div className="container customContainer">
          <div className="row justify-content-center">
            <div className="col-xxl-7 col-xl-8 col-lg-9 col-12">
              <ReviewItem />
            </div>
          </div>
        </div>
      </section>
      <section className={`${classes.benifitSection}`}>
        <div className="container customContainer">
          <div className="row justify-content-center">
            <div className="col-xxl-8 col-12">
              <h2 className={`${classes.benifitSectionTitle}`}>
                Puplier is the new way to publish and Monetize high-quality
                content
              </h2>
              <div className="row">
                <BenifitItem
                  title="Fast and Efficient"
                  content="Quickest and fastest way for public to find creators work. Currently there is a barrier between general public and reseachers. Platform will allow to minimise this barrier and have greater interaction and collaboration"
                />
                <BenifitItem
                  title="Comprehensive & Affordable"
                  content="The platform will connect both producer and consumer directly. This will bring down prices to access research. The taxpayers will get better value. Furthermore, researchers in developing countries, will get access to world class research"
                />
                <BenifitItem
                  title="Recognition and monetization"
                  content="Both produced and consumers get exposure to their work and contributions respectively. The producers are able to monetize content directly and be rewarded for their work."
                />
                <BenifitItem
                  title="Quality across multiple facets"
                  content="Users can vote on the publication across 6 pillars. The score will be normalized to provide a single value to indicate the overal quality of the publication. As multiple users are part of the review and voting process, it is for superior to single review process adopted by the traditional journals."
                />
              </div>
              <div className="d-flex justify-content-center">
                <div onClick={() => setShowSignupModal(true)}>
                  <PrimaryButton
                    overrideStyles={`${classes.benifitSectionSignUpButton}`}
                    innerText="get started for free!"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${classes.howItWorksSection}`}>
        <div className="container customContainer">
          <div className="row">
            <div className="col-12">
              <h2 className={`${classes.howItWorksSectionTitle}`}>
                How it Works
              </h2>
              <p className={`${classes.howItWorksSectionSubtitle}`}>
                Here is our simple 4-step process.
              </p>
              <div className="row">
                <ProcessFlowItem
                  number="1"
                  image={processFlow1}
                  title="Draft Your Research Paper"
                  content="Submit your research paper for review by other experts."
                />
                <ProcessFlowItem
                  number="2"
                  image={processFlow2}
                  title="Receive Suggestions"
                  content="Receive suggestions from other experts on your research paper."
                />
                <ProcessFlowItem
                  number="3"
                  image={processFlow3}
                  title="Accept or Decline Suggestions"
                  content="Review the suggestions from other experts and decide whether to accept or decline them."
                />
                <ProcessFlowItem
                  number="4"
                  image={processFlow4}
                  title="Publish Research Paper"
                  content="Publish your research paper on our website for others to review and comment on."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${classes.faqSection}`}>
        <div className="container customContainer">
          <div className="row justify-content-center">
            <div className="col-xxl-9 col-lg-10 col-12">
              <div
                className={`d-flex justify-content-center ${classes.faqTitleContainer}`}
              >
                <div className="d-flex">
                  <h2 className={`${classes.faqTitle}`}>
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="d-sm-block d-none">
                  <img
                    className={`${classes.faqTitleImage}`}
                    src={faqTitleImage}
                    alt=""
                  />
                </div>
              </div>
              <FaqAccordion />
            </div>
          </div>
        </div>
      </section>
      {/* HIDDEN SECTION */}
      <section className={`d-none ${classes.contactUsSection}`}>
        <div className="container customContainer">
          <div className="row">
            <div className="col-12">
              <h2 className={`${classes.contactUsTitle}`}>
                Still Have <span>Questions</span>?
              </h2>
              <h2 className={`${classes.contactUsSubtitle}`}>Contact Us</h2>
              <div className="row justify-content-center">
                <div className="col-xxl-11 col-12">
                  <div className="row">
                    <div className="col-xl-6 col-12">
                      <div className={`d-flex ${classes.visitUsContainer}`}>
                        <img
                          src={locationIcon}
                          alt="location-icon"
                          width="25px"
                          height="28.58px"
                        />
                        <h4 className={`${classes.visitUs}`}>Visit Us</h4>
                      </div>
                      <div className="row">
                        <div
                          className={`col-md-8 col-sm-7 ${classes.mapContainer}`}
                        >
                          <MapLocation location="51.509865,-0.118092" />
                        </div>
                        <div className="col-md-4 col-sm-5 d-sm-flex d-none flex-column justify-content-center">
                          <div>
                            <span
                              className={`${classes.contactUsAddressComponent}`}
                            >
                              Puplier LLC,
                            </span>
                            <span
                              className={`${classes.contactUsAddressComponent}`}
                            >
                              7a Magpie Road,
                            </span>
                            <span
                              className={`${classes.contactUsAddressComponent}`}
                            >
                              London,
                            </span>
                            <span
                              className={`${classes.contactUsAddressComponent}`}
                            >
                              SW17 3RL,
                            </span>
                            <span
                              className={`${classes.contactUsAddressComponent}`}
                            >
                              United Kingdom
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-12">
                      <div className={`${classes.contactUsFormContainer}`}>
                        <div className="d-flex justify-content-center">
                          <span
                            className="material-icons"
                            style={{ fontSize: "37px" }}
                          >
                            message
                          </span>
                          <h2 className={`${classes.contactUsFormTitle}`}>
                            Send a Message
                          </h2>
                        </div>
                        <form action="">
                          <input
                            className={`${classes.contactUsInputItem}`}
                            type="text"
                            placeholder="your first name"
                          />
                          <br />
                          <input
                            className={`${classes.contactUsInputItem}`}
                            type="email"
                            placeholder="your email"
                          />{" "}
                          <br />
                          <input
                            className={`${classes.contactUsInputItem}`}
                            type="text"
                            placeholder="subject"
                          />{" "}
                          <br />
                          <textarea
                            className={`${classes.contactUsInputItem}`}
                            name="message"
                            id="message"
                            cols="30"
                            rows="7"
                            placeholder="message"
                          ></textarea>
                          <br />
                          <button
                            className={`${classes.contactUsFormSubmitButton}`}
                          >
                            send message
                          </button>
                          <br />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default HomePage;
