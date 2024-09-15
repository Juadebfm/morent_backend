import React from "react";
import { useParams } from "react-router-dom";
import { useCars } from "../../context/carContext";

const CarDetail = () => {
  const { id } = useParams();
  const { cars, recommendedCars } = useCars();

  const car =
    cars.find((car) => car.id.toString() === id.toString()) ||
    recommendedCars.find((car) => car.id.toString() === id.toString());

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="car_detail">
      <h2>{car.carName}</h2>
      <img src={car.image} alt={car.carName} />
      <p>Type: {car.carType}</p>
      <p>Price: ${car.price}/day</p>
      <p>Fuel Capacity: {car.fuelCapacity}</p>
      <p>Transmission: {car.transmission}</p>
      <p>Seating Capacity: {car.seatingCapacity}</p>
    </div>
  );
};

export default CarDetail;
