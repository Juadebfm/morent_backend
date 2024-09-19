import React, { useEffect, useState } from "react";
import "../Navbar/Navbar.scss";
import { CiSearch } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import { IoIosNotifications, IoMdHeart, IoMdSettings } from "react-icons/io";
import { userprofile } from "../../assets/assets";
import { useAuth } from "../../context/authContext";
import { useCars } from "../../context/carContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [likedCars, setLikedCars] = useState([]);

  // contexts
  const { user } = useAuth();
  const { cars } = useCars();
  const navigate = useNavigate();

  //Liked cars and iother functionalities
  useEffect(() => {
    const storedLikedCars = JSON.parse(localStorage.getItem("likedCars")) || {};
    setLikedCars(storedLikedCars);
    console.log(storedLikedCars);

    const checkForNewCars = async () => {
      try {
        const response = await fetch(
          "https://morent-backend-zeta.vercel.app/api/cars/count"
        );
      } catch (error) {
        console.log(error);
      }
    };
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
        <span>Morent</span>
        <div>
          <CiSearch className="navbar_logo_search_icon" />
          <input type="text" placeholder="Search Something Here" />
          <VscSettings className="navbar_logo_search_icon" />
        </div>
      </div>

      <div className="navbar_user_notif">
        <div className="navbar_notif_icons">
          <IoMdHeart />
        </div>
        <div className="navbar_notif_icons">
          <IoIosNotifications />
        </div>
        <div className="navbar_notif_icons">
          <IoMdSettings />
        </div>
        <div>
          <img src={userprofile} alt="User Profile " />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
