import React from "react";

function MapLocation({ location }) {
  return (
    <iframe
      title="contact-us-map"
      id="google-maps-ifram"
      width="100%"
      height="250"
      style={{ border: "0", height: "100%" }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyB9k5qzfRU6e_jZTiFBVd5LmehkVFiuYfI&center=${location}`}
    ></iframe>
  );
}

export default MapLocation;
