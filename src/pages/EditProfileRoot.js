import { Outlet } from "react-router-dom";
import React from "react";

const EditProfileRoot = () => {
  return (
    <div className="container customContainer" style={{ marginTop: "48px" }}>
      <div className="row">
        <div className="col-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EditProfileRoot;
