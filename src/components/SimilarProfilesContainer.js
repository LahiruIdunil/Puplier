import React from "react";
import SimilarProfileItem from "./SimilarProfileItem";
import titleIcon from "./images/similar-profiles-title-icon.png";
import Title from "./home-page-logged-in/Title";
import classes from "./SimilarProfilesContainer.module.css";

const SimilarProfilesContainer = ({ similarProfiles }) => {
  return (
    <>
      {similarProfiles.length !== 0 && (
        <Title
          overrideStyles={classes.titleContainer}
          title="Profiles with similar interests"
          icon={titleIcon}
        />
      )}
      <div className="row">
        {similarProfiles.map((profile, key) => (
          <SimilarProfileItem
            key={key}
            name={`${profile.firstName} ${profile.lastName}`}
            description={profile.description}
            profileImage={profile.profileImage}
            username={profile.loginName}
            userId={profile.userId}
          />
        ))}
      </div>
    </>
  );
};

export default SimilarProfilesContainer;
