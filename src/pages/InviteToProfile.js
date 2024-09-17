import React, { useState } from "react";
import DashboardTabTitle from "../components/dashboard/DashboardTabTitle";
import SingleSuggestionItem from "../components/dashboard/invite-tab/SingleSuggestionItem";
import titleIcon from "./images/invite-tab-title-icon.png";
import classes from "./InviteToProfile.module.css";
import useDocumentTitle from "../custom-hooks/useDocumentTitle";

const InviteToProfile = () => {
  // set Docuement title
  useDocumentTitle("Puplier | Invite");

  const [suggestionsList, setSuggestionsList] = useState({
    status: 200,
    data: [
      {
        id: 1,
        name: "Guy Hawkins",
        profile_picture: "https://picsum.photos/id/135/500",
      },
      {
        id: 2,
        name: "Brown dean",
        profile_picture: "https://picsum.photos/id/136/500",
      },
      {
        id: 3,
        name: "Jessica jey",
        profile_picture: "https://picsum.photos/id/137/500",
      },
      {
        id: 1,
        name: "Michale Clark",
        profile_picture: "https://picsum.photos/id/132/500",
      },
      {
        id: 1,
        name: "Tom Jepson",
        profile_picture: "https://picsum.photos/id/139/500",
      },
      {
        id: 1,
        name: "Sara Lean",
        profile_picture: "https://picsum.photos/id/131/500",
      },
    ],
  });

  return (
    <React.Fragment>
      <DashboardTabTitle
        icon={titleIcon}
        tabName="invite"
        iconWidth="38px"
        iconHeight="38px"
        overRideStyles={classes.overRideStylesOfTitle}
      />
      <p className={`${classes.shortDescription}`}>
        Enter your colleagues email addresses below and we'll send them an
        invitation.
      </p>
      <div className={`${classes.suggestionsTitleContainer}`}>
        <p className={`${classes.suggestionsTitle}`}>
          Below are a few suggestions for you.
        </p>
      </div>
      <div className={`row ${classes.suggestItemsContainer}`}>
        {suggestionsList.data.map((item, key) => (
          <SingleSuggestionItem
            key={key}
            profile_picture={item.profile_picture}
            name={item.name}
            id={item.id}
          />
        ))}
      </div>
      <div className={`${classes.emailInputContainer}`}>
        <p className={`${classes.emailInputTip}`}>
          (Separate email addresses with commas)
        </p>
        <textarea
          name="emails"
          id="emails"
          rows="8"
          placeholder="Ex : hello@johndoe.com , johnsmith@xyz.com"
        ></textarea>
        <div className="d-flex justify-content-end">
          <button className={`${classes.submitButton}`}>invite</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InviteToProfile;
