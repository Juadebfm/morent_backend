import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CarCard.scss";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import Button from "../Button/Button";
import { RiSteering2Fill } from "react-icons/ri";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  const goToCarDetails = () => {
    navigate(`/car/${car.id}`);
  };

  useEffect(() => {
    if (car && car.id) {
      const likedCars = JSON.parse(localStorage.getItem("likedCars")) || {};
      setLiked(!!likedCars[car.id]);
    }
  }, [car]);

  const toggleLike = () => {
    if (!car || !car.id) return;

    const likedCars = JSON.parse(localStorage.getItem("likedCars")) || {};
    if (liked) {
      delete likedCars[car.id];
    } else {
      likedCars[car.id] = true;
    }
    localStorage.setItem("likedCars", JSON.stringify(likedCars));
    setLiked(!liked);
  };

  if (!car) {
    return null; // or return some placeholder
  }

  return (
    <div className="car_card">
      <div className="car_name__like_icon">
        <div>
          <h3>{car.carName}</h3>
          <p>{car.carType}</p>
        </div>

        <div className="car_card_icon" onClick={toggleLike}>
          {liked ? <IoMdHeart className="liked" /> : <IoMdHeartEmpty />}
        </div>
      </div>

      <div className="car_details_img">
        <div className="car_img">
          <img src={car.image} alt={car.carName} />
        </div>

        <div className="car_details">
          <p>
            <BsFillFuelPumpFill className="car_details_icon" />
            {car.fuelCapacity}
          </p>
          <p>
            <RiSteering2Fill className="car_details_icon" />
            {car.transmission}
          </p>
          <p>
            <BsPeopleFill className="car_details_icon" />
            {car.seatingCapacity}
          </p>
        </div>
      </div>

      <div className="car_price_button">
        <p>
          <span>${car.price}/</span>
          <span>day</span>
        </p>
        <Button btnText="Rent Now" className="carBtn" func={goToCarDetails} />
      </div>
    </div>
  );
};

CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    carName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    carType: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    fuelCapacity: PropTypes.number.isRequired,
    transmission: PropTypes.string.isRequired,
    seatingCapacity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CarCard;
