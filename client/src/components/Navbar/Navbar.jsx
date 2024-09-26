import React, { useEffect, useState } from "react";
import "../Navbar/Navbar.scss";
import { CiSearch } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import {
  IoIosNotifications,
  IoMdHeart,
  IoMdHeartEmpty,
  IoMdSettings,
} from "react-icons/io";
import { userprofile } from "../../assets/assets";
import { useAuth } from "../../context/authContext";
import { useCars } from "../../context/carContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [likedCars, setLikedCars] = useState([]);
  // State for carCount
  const [newCarsCount, setNewCarsCount] = useState(0);

  // contexts
  const { user } = useAuth();
  const { cars } = useCars();
  const navigate = useNavigate();

  //Liked cars and other functionalities
  useEffect(() => {
    const storedLikedCars = JSON.parse(localStorage.getItem("likedCars")) || {};
    setLikedCars(storedLikedCars);
    console.log(storedLikedCars);

    const checkForNewCars = async () => {
      try {
        const response = await fetch(
          "https://morent-backend-zeta.vercel.app/api/cars/count"
        );
        const { count } = await response.json();
        const oldCount = localStorage.getItem("carCount"); /* */
        if (oldCount && count > parseInt(oldCount)) {
          setNewCarsCount(count - parseInt(oldCount));
        }
        localStorage.setItem("carCount", count.toString());
      } catch (error) {
        console.log(error);
      }
    };
    checkForNewCars();

    // set up an interval to check for new cars every 5 minutes
    const interval = setInterval(checkForNewCars, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // filter cars
  useEffect(() => {
    if (searchTerm) {
      const filteredCars = cars.filter(
        (car) =>
          car.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.carType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.price.toString().includes(searchTerm) ||
          car.transmission.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredCars);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, cars]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCarSelect = (carId) => {
    navigate(`/car/${carId}`);
    setSearchTerm("");
    setSearchResults([]);
  };
  return (
    <nav>
      <div className="navbar_logo_search">
        <Link to="/">
          <span>Morent</span>
        </Link>
        <div className="search-container">
          <CiSearch className="navbar_logo_search_icon" />
          <input
            type="text"
            placeholder="Search Something Here"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <VscSettings className="navbar_logo_search_icon" />
          <div className="search-dropdown">
            {searchResults.map((car) => (
              <div
                key={car.id}
                className="search_result_item"
                onClick={() => handleCarSelect(car.id)}
              >
                <img
                  src={car.image}
                  alt={car.carName}
                  className="car_thumbnail"
                />
                <div className="car_info">
                  <span className="car-name">{car.carName}</span>
                  <span className="car-type">{car.carType}</span>
                  <span className="car-price">{car.price}</span>
                  <span className="car-transmission">{car.transmission}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="navbar_user_notif">
        <div className="navbar_notif_icons">
          {Object.keys(likedCars).length > 0 ? (
            <div>
              <div>
                <IoMdHeart color="red" />
                <span className="badge">{Object.keys(likedCars).length}</span>
              </div>
            </div>
          ) : (
            <IoMdHeartEmpty />
          )}
        </div>
        <div className="navbar_notif_icons">
          <div className="icon-with-badge">
            <IoIosNotifications
              color={newCarsCount > 0 ? "yellow" : "inherit"}
            />
            {newCarsCount > 0 && <span className="badge">{newCarsCount}</span>}
          </div>
        </div>
        <div
          className="navbar_notif_icons"
          onClick={() => navigate("/settings")}
        >
          <IoMdSettings />
        </div>
        <div>
          <img src={user?.profileImage || userprofile} alt="User Profile " />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
