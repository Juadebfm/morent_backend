import React from "react";
import Button from "../Button/Button";
import "./Jumbotron.scss";

const Jumbotron = ({
  style,
  className,
  headText,
  desc,
  img,
  buttonStyle,
  backdropImg,
  backdropPos,
}) => {
  return (
    <div style={style} className={`${className} jumbotron_container`}>
      <div className={`jumb_backdrop ${backdropPos}`}>
        <img src={backdropImg} alt="" />
      </div>
      <div className="jumb_details_container">
        <div className="jumbotron_details">
          <h2>{headText}</h2>
          <p>{desc}</p>
          <Button btnText="Rental Car" className={`${buttonStyle} jumb_btn`} />
        </div>

        <div>
          <img src={img} alt="" className="jumb_img" />
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
