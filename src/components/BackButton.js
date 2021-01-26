import React from "react";

export const BackButton = ({ history, className }) => {
  return (
    <button
      onClick={() => {
        history.goBack();
      }}
      className={className}
      type="button">
      <div className="left-arrow"></div>
      <p className="button-text">Back</p>
    </button>
  );
};
