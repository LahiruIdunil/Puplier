// TODO: this page has hidden divs, search the keyword "HIDDEN SECTION" to find them

import React from "react";
import classes from "./ContactUs.module.css";
import ContactDetailItem from "../components/ContactDetailItem";
import ContactusFormInputItem from "../components/ContactusFormInputItem";
import MapLocation from "../components/MapLocation";
import ComingSoonTag from "../components/ComingSoonTag";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

function ContactUs() {
  // set Docuement title
  useDocumentTitle("Puplier | Contact Us");

  const contactDetailItems = [
    // HIDDEN SECTION: hide below fields from release 1.0
    // {
    //   icon: "place",
    //   detail: "7a magpie road, London,  SW173RL, United Kigndom",
    // },
    // {
    //   icon: "call",
    //   detail: "011-234-21234-32",
    // },
    {
      icon: "email",
      detail: "hello@puplier.com",
    },
  ];

  const contactFormFields = [
    {
      type: "text",
      placeholder: "first name",
    },
    {
      type: "email",
      placeholder: "email",
    },
    {
      type: "text",
      placeholder: "subject",
    },
  ];
  return (
    <>
      <section className={classes.coverImg}>
        <div className="container customContainer">
          <div className="row justify-content-center">
            <div className="col-xxl-10 col-12">
              <h2 className={`text-lg-end text-center ${classes.title}`}>
                Contact Us
              </h2>
            </div>
          </div>
        </div>
        <div className={classes.overlay} />
      </section>
      <section className={classes.bodyContainer}>
        <div className="container customContainer">
          <div className="row justify-content-center">
            <div className="col-xxl-10 col-12">
              <div className="row justify-content-between">
                <div className="col-xl-5 col-lg-6 col-12 d-flex flex-column justify-content-between">
                  <div>
                    <p className={classes.sectionTitle}>want to reach us ?</p>
                    {contactDetailItems.map((item, key) => (
                      <ContactDetailItem
                        key={key}
                        icon={item.icon}
                        detail={item.detail}
                      />
                    ))}
                  </div>
                  {/* HIDDEN SECTION: hide below fields from release 1.0 */}
                  <div className={`d-none ${classes.mapContainer}`}>
                    <MapLocation location="51.509865,-0.118092" />
                  </div>
                </div>
                <div
                  className={`col-xl-auto col-lg-5 col-12 ${classes.rightContainer}`}
                >
                  <p className={classes.sectionTitle}>send a message</p>
                  {contactFormFields.map((item, key) => (
                    <div key={key}>
                      <ContactusFormInputItem
                        type={item.type}
                        placeholder={item.placeholder}
                      />
                      <br />
                    </div>
                  ))}
                  <textarea
                    className={classes.messageTextArea}
                    name="message"
                    id="message"
                    placeholder="message"
                  ></textarea>
                  <br />
                  <button className={classes.messageSendButton}>
                    send message
                  </button>
                  <div className={classes.formOverlay}>
                    <div className="m-auto">
                      <ComingSoonTag />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
