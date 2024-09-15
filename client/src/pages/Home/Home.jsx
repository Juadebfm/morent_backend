import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import { useNavigate } from "react-router-dom";
import {
  Koenigsegg,
  NissanGT,
  ellipse,
  arrowsgroup,
} from "../../assets/assets";
import "../Home/Home.scss";
import PickupDropoff from "../../components/PickupDropoff/PickupDropoff";
import Button from "../../components/Button/Button";
import CarContainer from "../../components/CarCard/CarContainer";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();

  const goToCategory = () => {
    navigate("/categoryfilter");
  };

  return (
    <div className="home">
      <Navbar />

      <main>
        <div className="main_container">
          {/* jumbotron */}
          <div className="jumbotron">
            <Jumbotron
              headText="The Best Platform for Car Rental"
              desc="Providing cheap car rental services and safe and comfortable facilities."
              img={Koenigsegg}
              buttonStyle="button_dark_blue"
              className="jumb_one"
              backdropImg={ellipse}
              backdropPos="jumb_backdrop_position"
            />
            <Jumbotron
              headText="Easy way to rent a car at a low price"
              desc="Providing cheap car rental services and safe and comfortable facilities."
              img={NissanGT}
              buttonStyle="button_light_blue"
              backdropImg={arrowsgroup}
            />
          </div>
          {/* pickup_dropoff */}
          <div className="pickup_dropoff">
            <PickupDropoff />
          </div>
          {/* view_all */}
          <div className="view_all_container">
            <span>Popular Car</span>
            <Button btnText="View All" className="view_all_btn" />
          </div>
          <div>
            <CarContainer />
          </div>
        </div>

        <div className="btn_main_container">
          <Button
            btnText="Show More Cars"
            className="main_container_btn"
            func={goToCategory}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
