import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useCars } from "../../context/carContext";
import { useAuth } from "../../context/authContext"; // Assuming you have this

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [likedCars, setLikedCars] = useState([]);
  const [newCarsCount, setNewCarsCount] = useState(0);
  const { cars } = useCars();
  const { user } = useAuth(); // Get the user from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const storedLikedCars = JSON.parse(localStorage.getItem("likedCars")) || {};
    setLikedCars(storedLikedCars);
    console.log("Liked Cars from localStorage:", storedLikedCars);

    const checkForNewCars = async () => {
      try {
        const response = await fetch(
          "https://morent-backend-zeta.vercel.app/api/cars/count"
        );
        const { count } = await response.json();
        const oldCount = localStorage.getItem("carCount");
        if (oldCount && count > parseInt(oldCount)) {
          setNewCarsCount(count - parseInt(oldCount));
        }
        localStorage.setItem("carCount", count.toString());
      } catch (error) {
        console.error("Error checking for new cars:", error);
      }
    };

    checkForNewCars();
    // Set up an interval to check for new cars every 5 minutes
    const interval = setInterval(checkForNewCars, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

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
        <span>Morent</span>
        <div className="search-container">
          <CiSearch className="navbar_logo_search_icon" />
          <input
            type="text"
            placeholder="Search by name, type, price, or transmission"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <VscSettings className="navbar_logo_search_icon" />
          {searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((car) => (
                <div
                  key={car.id}
                  className="search-result-item"
                  onClick={() => handleCarSelect(car.id)}
                >
                  <img
                    src={car.image}
                    alt={car.carName}
                    className="car-thumbnail"
                  />
                  <div className="car-info">
                    <span className="car-name">{car.carName}</span>
                    <span className="car-type">{car.carType}</span>
                    <span className="car-price">${car.price}/day</span>
                    <span className="car-transmission">{car.transmission}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="navbar_user_notif">
        <div className="navbar_notif_icons">
          {Object.keys(likedCars).length > 0 ? (
            <div className="icon-with-badge">
              <IoMdHeart color="red" />
              <span className="badge">{Object.keys(likedCars).length}</span>
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
          <img
            src={user?.profileImage || userprofile}
            alt="User Profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = userprofile;
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
