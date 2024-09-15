import React from "react";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { MdMyLocation } from "react-icons/md";

import "./PickupDropoff.scss";
const PickupDropoff = () => {
  return (
    <div className="pickup_dropoff_container">
      {/* Pickup */}
      <div className="pickup">
        <div className="point_name">
          <MdMyLocation className="point_icon" />
          <span>Pick-up</span>
        </div>

        <div className="pickup_selectors">
          <div className="section">
            <span>locations</span>
            <select name="selectCity">
              <option value="Select Your City">Select Your City</option>
            </select>
          </div>
          <div className="section">
            <span>Dates</span>
            <select name="selectDates">
              <option value="Select Your Date">Select Your Date</option>
            </select>
          </div>
          <div className="section">
            <span>Time</span>
            <select name="selectTime">
              <option value="Select Your Time">Select Your Time</option>
            </select>
          </div>
        </div>
      </div>
      {/* Switchbtn */}
      <div className="switch_btn">
        <HiOutlineSwitchVertical className="switch_icon" />
      </div>
      {/* dropoff */}
      <div className="dropoff">
        <div className="point_name">
          <MdMyLocation className="point_icon" />
          <span>Drop-off</span>
        </div>

        <div className="dropoff_selectors">
          <div className="section">
            <span>locations</span>
            <select name="selectCity">
              <option value="Select Your City">Select Your City</option>
            </select>
          </div>
          <div className="section">
            <span>Dates</span>
            <select name="selectDates">
              <option value="Select Your Date">Select Your Date</option>
            </select>
          </div>
          <div className="section">
            <span>Time</span>
            <select name="selectTime">
              <option value="Select Your Time">Select Your Time</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupDropoff;
