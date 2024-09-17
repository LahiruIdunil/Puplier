import React, { useEffect } from "react";
import classes from "./InviteReviewerContainer.module.css";
import inviteReviewerIcon from "./images/invite-reviewer-icon.png";
import { NavLink } from "react-router-dom";
import defaultAvatar from "./images/avator.png";
import useCreateReviewRequest from "../custom-hooks/useCreateReviewRequest";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

function InviteReviewerContainer({
  name,
  currentPosition,
  profileImage,
  username,
  userId,
  articleDetails,
}) {
  const { createReviewRequest, isLoading, actionData } = useCreateReviewRequest(
    { trackProgressOfRequest: true }
  );

  const onSubmit = () => {
    if (username) {
      createReviewRequest(
        username,
        articleDetails?.articleId || null,
        articleDetails?.authorId || null
      );
    } else {
      toast.error("This user has no username attached to its profile!");
    }
  };

  useEffect(() => {
    if (actionData) {
      if (actionData.status === "ok") {
        toast.success(actionData.response.data.message);
      } else {
        toast.error(
          actionData?.error?.response.data.message ||
            actionData?.error ||
            "Faild to create review request!"
        );
      }
    }
  }, [actionData]);

  return (
    <div className={`d-flex g-3 ${classes.inviteReviewerContainer}`}>
      <div className="col-auto">
        <NavLink to={`/user/${username}?id=${userId}`}>
          <div
            className={`${classes.reviewerImage}`}
            style={{
              backgroundImage: profileImage
                ? `url(${profileImage})`
                : `url(${defaultAvatar})`,
            }}
          ></div>
        </NavLink>
      </div>
      <div className="col d-flex align-items-center overflow-hidden">
        <div className={`overflow-hidden ${classes.reviewerDetailsContainer}`}>
          <NavLink
            to={`/user/${username}?id=${userId}`}
            style={{ textDecoration: "none" }}
          >
            <p className={`m-auto ${classes.reviewerName}`}>{name}</p>
          </NavLink>
          <p className={classes.reviewerCurrentPosition}>{currentPosition}</p>
        </div>
      </div>
      <div className="col-auto d-flex align-items-center">
        {isLoading ? (
          <BeatLoader loading size={4} color="#3caac4" />
        ) : (
          <img
            src={inviteReviewerIcon}
            className={classes.inviteReviewerIcon}
            alt="invite-reviewer"
            onClick={onSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default InviteReviewerContainer;
