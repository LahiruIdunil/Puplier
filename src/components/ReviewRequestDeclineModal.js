import React, { useEffect, useState } from "react";
import classes from "./ReviewRequestDeclineModal.module.css";
import { Modal } from "react-bootstrap";
import { useFetcher } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

function ReviewRequestDeclineModal({ data, ...props }) {
  const [declineReason, setDeclineReason] = useState("");
  const fetcher = useFetcher();

  const declineEditRequest = () => {
    const values = {
      editRequestId: data.editRequestId,
      reviewerId: data.reviewerId,
      action: "REVIEW_DECLINE",
      declineReason,
    };

    fetcher.submit(values, {
      method: "post",
      action: "/dashboard/shared-with-me",
    });
  };

  useEffect(() => {
    setDeclineReason("");
  }, [props.show]);

  // triggers once a response is received for the DECLINE request
  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.status === "ok") {
        toast.success(fetcher.data.response.data.message);
      } else {
        toast.error(
          fetcher.data?.error?.response?.data.message ||
            fetcher.data?.error ||
            "Failed to decline the edit request!"
        );
      }

      props.onHide();
    }
  }, [fetcher.data]);

  return (
    <Modal
      {...props}
      dialogClassName={classes.customPublishModal}
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
          <h4 className={classes.modalTitle}>Decline the edit request!</h4>
          <p className={classes.description}>
            Please explain why are you declining the edit request{" "}
            <span style={{ fontSize: "12px" }}>(optional)</span>
          </p>
          <textarea
            className={classes.declineReasonInput}
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            id="reason"
            name="reason"
          ></textarea>
          <div className={`d-flex justify-content-center`}>
            <div className={classes.buttonContainer}>
              <button
                type="button"
                onClick={declineEditRequest}
                className={classes.declineButton}
              >
                {fetcher.state === "submitting" ? (
                  <BeatLoader loading size={10} />
                ) : (
                  "decline"
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ReviewRequestDeclineModal;
