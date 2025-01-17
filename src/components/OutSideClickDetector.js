import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Component that alerts if you click outside of it
 */
function OutSideClickDetector({ children, onHide }) {
  /**
   * Hook that alerts clicks outside of the passed ref
   */
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          onHide();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return <div ref={wrapperRef}>{children}</div>;
}

OutSideClickDetector.propTypes = {
  children: PropTypes.element.isRequired,
};

export default OutSideClickDetector;
