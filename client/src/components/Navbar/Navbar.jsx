import React from "react";
import "../Navbar/Navbar.scss";
import { CiSearch } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import { IoIosNotifications, IoMdHeart, IoMdSettings } from "react-icons/io";
import { userprofile } from "../../assets/assets";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar_logo_search">
        <span>Morent</span>
        <div>
          <CiSearch className="navbar_logo_search_icon"/>
          <input type="text" placeholder="Search Something Here" />
          <VscSettings className="navbar_logo_search_icon"/>
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
