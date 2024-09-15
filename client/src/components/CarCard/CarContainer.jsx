import React from "react";
import CarCard from "./CarCard";
import { useCars } from "../../context/carContext";
import "./CarContainer.scss";

const CarContainer = () => {
  const { cars, recommendedCars } = useCars();

  return (
    <div className="car_container">
      <div className="car_grid">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      <h2 className="recom_car_title">Recommended Cars</h2>
      <div className="car_grid">
        {recommendedCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarContainer;
