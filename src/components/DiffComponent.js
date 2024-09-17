import React from "react";
import DiffComponentTitle from "./DiffComponentTitle";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";

function DiffComponent({ prevText, newText, title, type }) {
  return (
    <>
      <DiffComponentTitle title={title} />
      {/* show only in screens larger than lg (992px) */}
      <div className="mb-5 d-lg-block d-none">
        <ReactDiffViewer
          oldValue={prevText}
          newValue={newText}
          splitView={true}
          hideLineNumbers={true}
          compareMethod={DiffMethod.CSS}
          showDiffOnly={false}
          leftTitle={`Original ${type}`}
          rightTitle={`Suggested ${type}`}
        />
      </div>
      {/* show only in screens smaller than lg (991px) */}
      <div className="mb-5 d-lg-none d-block">
        <ReactDiffViewer
          oldValue={prevText}
          newValue={newText}
          splitView={false}
          hideLineNumbers={true}
          compareMethod={DiffMethod.CSS}
          showDiffOnly={false}
        />
      </div>
    </>
  );
}

export default DiffComponent;
