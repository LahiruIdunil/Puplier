import React, { useState } from "react";
import classes from "./PendingEditRequestsList.module.css";
import PendingEditRequestItem from "./PendingEditRequestItem";
import ReviewRequestDeclineModal from "../../ReviewRequestDeclineModal";
import DashboardMessageContainer from "../../DashboardMessageContainer";

const PendingEditRequestsList = ({ editRequestsList }) => {
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [data, setData] = useState({ editRequestId: "", reviewerId: "" });

  const openDeclineModal = (editRequestId, reviewerId) => {
    setData({ editRequestId, reviewerId });
    setShowDeclineModal(true);
  };

  return (
    <div className="row">
      <div className={`col-12 ${classes.accordionContainer}`}>
        {editRequestsList.length > 0 ? (
          <>
            <p className={classes.listTitle}>
              Authors of these articles have invited you to review and suggest
              changes to them
            </p>
            {editRequestsList.map((editRequest, key) => (
              <PendingEditRequestItem
                key={key}
                editRequestId={editRequest.reviewRequestId}
                reviewerId={editRequest.reviewerId}
                article={editRequest.article}
                openDeclineModal={openDeclineModal}
              />
            ))}
          </>
        ) : (
          <DashboardMessageContainer
            message="No pending edit requests!"
            status="empty"
          />
        )}
      </div>
      <ReviewRequestDeclineModal
        show={showDeclineModal}
        onHide={() => setShowDeclineModal(false)}
        data={data}
      />
    </div>
  );
};

export default PendingEditRequestsList;
