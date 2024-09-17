import React, { useState, useCallback, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./InviteModal.module.css";
import InviteModalCarousel from "./InviteModalCarousel";
import { BeatLoader } from "react-spinners";
import { useFetcher } from "react-router-dom";
import { toast } from "react-toastify";

export default function InviteModal({
  articleDetails,
  similarProfiles,
  fetchedSimilarProfiles,
  ...props
}) {
  const [emailsList, setEmailsList] = useState("");
  const [emailsListError, setEmailsListError] = useState(false);
  const fetcher = useFetcher();

  const addSuggestedProfile = useCallback(
    (email) => {
      let emails = emailsList?.split(",");

      if (emails.length == 1 && emails[0] == "") {
        emails = [];
      }
      if (!emails.includes(email)) {
        emails.push(email);
        setEmailsList(emails.toString());
      }
    },
    [emailsList]
  );

  const removeSuggestedProfile = useCallback(
    (email) => {
      let emails = emailsList?.split(",");

      if (emails.includes(email)) {
        let index = emails.indexOf(email);
        emails.splice(index, 1);
        setEmailsList(emails.toString());
      }
    },
    [emailsList]
  );

  // triggers once a response is recieved to the createReviewRequest request
  useEffect(() => {
    if (fetcher.data) {
      setEmailsList("");

      if (fetcher.data.status === "ok") {
        toast.success(fetcher.data.response.data.message);
      } else {
        toast.error(
          fetcher.data?.error?.response.data.message ||
            fetcher.data?.error ||
            "Faild to create review request!"
        );
      }
      // close invite modal
      props.onHide();
    }
  }, [fetcher.data]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (emailsList === "") {
      setEmailsListError(true);

      return null;
    }
    fetcher.submit(
      { reviewers: emailsList, articleDetails: JSON.stringify(articleDetails) },
      { method: "post", action: "/dashboard/my-articles" }
    );
  };

  useEffect(() => {
    setEmailsListError(false);
  }, [emailsList]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className={classes.customModalBody}>
        <div className={classes.modalCloseButtonContainer}>
          <span
            className={`material-icons ${classes.modalCloseButton}`}
            onClick={props.onHide}
          >
            close
          </span>
        </div>
        <div className={classes.modalBodyContainer}>
          <h4 className={classes.modalTitle}>Invite for this article</h4>
          <p className={classes.modalTopText}>
            Enter your colleagues email addresses below and we'll send them an
            invitation.
          </p>
          {fetchedSimilarProfiles && similarProfiles.length > 0 && (
            <>
              <div className={classes.fewSuggestionsBox}>
                <p className={classes.fewSuggestionsText}>
                  Below are a few suggestions for you.
                </p>
              </div>
              <div className={classes.carouselParentContainer}>
                <div className={classes.carouselContainer}>
                  <InviteModalCarousel
                    addSuggestedProfile={addSuggestedProfile}
                    removeSuggestedProfile={removeSuggestedProfile}
                    suggestedPeople={similarProfiles}
                  />
                </div>
              </div>
            </>
          )}
          <p className={classes.seperateEmailsText}>
            (Separate email addresses with commas)
          </p>
          <form onSubmit={onSubmit}>
            <textarea
              className={classes.emailInputField}
              cols="30"
              rows="3"
              value={emailsList}
              onChange={(e) => setEmailsList(e.target.value)}
            ></textarea>
            {emailsListError && (
              <p className={classes.errorMessage}>This field is required!</p>
            )}
            <div className={classes.btnDiv}>
              <button className={classes.inviteBtn}>
                {fetcher.state === "idle" ? (
                  <p className={classes.inviteBtnText}>invite</p>
                ) : (
                  <BeatLoader loading size={10} />
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

// this method return a list of users along with their userIds
const fetchUserList = async (sendRequest, reviewersList) => {
  const reviewers = await Promise.all(
    reviewersList
      .filter((reviewer) => reviewer !== "null" && reviewer !== "")
      .map((userAuth) =>
        sendRequest("get", "/user/findUserInfoByUserAuthData", {
          userAuth,
        })
      )
  );
  return reviewers;
};

export const createReviewRequestAction =
  (sendRequest) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { reviewers, articleDetails } = Object.fromEntries(formData);

    const reviewersList = fetchUserList(sendRequest, reviewers.split(","));
    const article = JSON.parse(articleDetails);

    return reviewersList
      .then((reviewers) => {
        // prepare request body
        const data = {
          body: reviewers
            .filter(
              (reviewer) =>
                reviewer.status === "ok" &&
                reviewer.response.data.body.userId !== null
            )
            .map((reviewer) => {
              const { userId, loginName, email } = reviewer.response.data.body;

              return {
                articleId: article?.articleId || null,
                title: "",
                reviewerId: userId,
                reviewerLoginName: loginName,
                reviewerEmail: email,
                description: "",
                articleOwnerId: article?.authorId || null,
              };
            }),
        };

        // if there is no any valid reviewer within the entered list => throws an error
        if (!data.body.length) throw "No valid reviewers found!";

        return sendRequest("post", "/article/articleReviewRequest", data);
      })
      .catch((error) => {
        return toast.error(
          error?.response?.data.message ||
            error ||
            "Faild to create review request!"
        );
      });
  };
