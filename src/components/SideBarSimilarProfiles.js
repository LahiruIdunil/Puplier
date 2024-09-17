import React from "react";
import SideBarSimilarProfileItem from "./SideBarSimilarProfileItem";
import SideBarTitle from "./SideBarTitle";

const SideBarSimilarProfiles = ({ similarProfiles }) => {
  return (
    <div>
      {similarProfiles.length !== 0 && (
        <SideBarTitle title="Profiles with similar interests" />
      )}
      <div>
        {similarProfiles.map((profile, key) => (
          <SideBarSimilarProfileItem
            key={key}
            name={`${profile.firstName} ${profile.lastName}`}
            username={profile.loginName}
            currentPosition={profile.jobTitle}
            profileImage={profile.profileImage}
            userId={profile.userId}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBarSimilarProfiles;
