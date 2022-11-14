import React from "react";

const Button = ({ onClick }) => {
  return (
    <button className="st-button" onClick={(e) => onClick(e)}>
      Refresh
    </button>
  );
};

export default Button;
