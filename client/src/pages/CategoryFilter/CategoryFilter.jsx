import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useCars } from "../../context/carContext";

import "./CategoryFilter.scss";
import CarCard from "../../components/CarCard/CarCard";

const CategoryFilter = () => {
  const { cars, recommendedCars } = useCars();

  return (
    <div className="category_filter">
      <Navbar />
      <div className="content_wrapper">
        <aside className="sidebar">
          <p>Filter options</p>
        </aside>
        <main className="main_content">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
          {recommendedCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryFilter;
