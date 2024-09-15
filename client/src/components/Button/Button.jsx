import React from "react";
import "../Button/Button.scss";

const Button = ({ className, btnText, func }) => {
  return (
    <div onClick={func} className={`button_round ${className}`}>
      {btnText}
    </div>
  );
};

export default Button;
