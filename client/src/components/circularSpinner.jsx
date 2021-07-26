import React from "react";
import { CircularProgress } from "@material-ui/core";
import { useLocation } from "react-router";

const CircularSpinner = () => {
  return (
    <div
      key={useLocation().pathname}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <CircularProgress size={100} />
    </div>
  );
};

export default CircularSpinner;
