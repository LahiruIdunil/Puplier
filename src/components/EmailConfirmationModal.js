import React from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./EmailConfirmationModal.module.css";
import modalImage from "./images/emailConfirmationModalImage.png";

function EmailConfirmationModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={classes.customModal}
    >
      <Modal.Body className={classes.customModalBody}>
        <div className={classes.modalBodyContainer}>
          <div className="d-flex justify-content-center">
            <img className={classes.modalImage} src={modalImage} alt="image" />
          </div>
          <p className={classes.modalTitle}>Confirm your email address</p>
          <p className={classes.modalContent}>
            Please check your email for the confirmation code and click the
            provided link to complete the registration process.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EmailConfirmationModal;
