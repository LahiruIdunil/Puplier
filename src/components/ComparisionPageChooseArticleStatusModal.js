import React from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./ComparisionPageChooseArticleStatusModal.module.css";
import { useNavigation } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function ComparisionPageChooseArticleStatusModal({
  handleApproveOrRejectAction,
  triggeredButton,
  ...props
}) {
  const navigation = useNavigation();

  return (
    <Modal
      {...props}
      dialogClassName={classes.customAcceptModal}
      size="xl"
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
          <h4 className={classes.modalTitle}>Accept Suggestions</h4>
          <p className={classes.description}>
            Choose which mode you want this article to go to after accepting
            these suggestions
          </p>
          <div className={`d-flex justify-content-center`}>
            <div className={classes.buttonContainer}>
              <button
                onClick={() =>
                  handleApproveOrRejectAction(
                    "DRAFT",
                    "AUTHOR_ACCEPTED",
                    "AUTHOR_ACCEPTED_AS_DRAFT"
                  )
                }
                className={`d-flex justify-content-center align-items-center ${classes.revertToDraftButton}`}
              >
                {(navigation.state === "submitting" ||
                  navigation.state === "loading") &&
                triggeredButton === "AUTHOR_ACCEPTED_AS_DRAFT" ? (
                  <BeatLoader loading size={8} />
                ) : (
                  <>
                    <div className={classes.returnIconContainer}>
                      <span
                        class={`material-icons-outlined ${classes.returnIcon}`}
                      >
                        keyboard_return
                      </span>
                    </div>
                    <p className={`m-0`}>revert to draft</p>
                  </>
                )}
              </button>
              <button
                onClick={() =>
                  handleApproveOrRejectAction(
                    "UNDER_REVIEW",
                    "AUTHOR_ACCEPTED",
                    "AUTHOR_ACCEPTED_AS_UNDER_REVIEW"
                  )
                }
                className={`d-flex justify-content-center align-items-center ${classes.underReviewButton}`}
              >
                {navigation.state === "idle" ? (
                  "stay in under review"
                ) : triggeredButton === "AUTHOR_ACCEPTED_AS_UNDER_REVIEW" ? (
                  <BeatLoader loading size={8} />
                ) : (
                  "stay in under review"
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ComparisionPageChooseArticleStatusModal;
