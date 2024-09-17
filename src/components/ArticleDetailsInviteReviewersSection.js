import React from "react";
import classes from "./ArticleDetailsInviteReviewersSection.module.css";
import InviteReviewerContainer from "./InviteReviewerContainer";
import ArticleDetailsSideBarActionButton from "./ArticleDetailsSideBarActionButton";
import ArticleDetailsSideBarTitle from "./ArticleDetailsSideBarTitle";

function ArticleDetailsInviteReviewersSection({
  similarProfiles,
  openInviteModal,
  articleDetails,
}) {
  return (
    <section className={classes.inviteReviewersSection}>
      <ArticleDetailsSideBarTitle title="invite to review" />
      {similarProfiles.map((profile, key) => (
        <InviteReviewerContainer
          key={key}
          name={`${profile.firstName} ${profile.lastName}`}
          description={profile.description}
          profileImage={profile.profileImage}
          username={profile.loginName}
          userId={profile.userId}
          // TODO : replace the jobtitle with current position once the change is done in the backend side
          currentPosition={profile.jobTitle}
          articleDetails={articleDetails}
        />
      ))}
      <div className="d-flex justify-content-center">
        <ArticleDetailsSideBarActionButton
          btnText="invite via email/username"
          onClick={openInviteModal}
        />
      </div>
    </section>
  );
}

export default ArticleDetailsInviteReviewersSection;
