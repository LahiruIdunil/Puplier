import React, { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

const RequestProgressBar = ({
  continuousStart = false,
  staticStart = false,
  complete = false,
  hideBackground = false,
}) => {
  const ref = useRef(null);

  // Loads the progress bar continuously
  useEffect(() => {
    if (continuousStart) {
      ref.current.continuousStart();
    }
  }, [continuousStart]);

  // Loads the progress bar statically
  useEffect(() => {
    if (staticStart) {
      ref.current.staticStart();
    }
  }, [staticStart]);

  // completes the progress bar
  useEffect(() => {
    if (complete) {
      ref.current.complete();
    }
  }, [complete]);

  return (
    <>
      {/* Hide the footer while the page is beign loaded */}
      {hideBackground && !complete && <div style={{ height: "100vh" }}></div>}
      <LoadingBar height={5} color="#f35f71" ref={ref} />
    </>
  );
};

export default RequestProgressBar;
