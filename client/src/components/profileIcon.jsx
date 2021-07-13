import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./profileIcon.css";

const ProfileIcon = ({ user }) => {
  const [showProfileDropdown, setProfileDropdown] = useState(false);
  const toggleUserDropdown = () => setProfileDropdown(!showProfileDropdown);

  const profileRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleClickOutside = (e) => {
    if (!profileRef.current.contains(e.target)) setProfileDropdown(false);
  };
  return (
    <div className="profile-icon" ref={profileRef}>
      <div onClick={toggleUserDropdown} style={{ cursor: "pointer" }}>
        <img src={user.image} alt="usr_img" />{" "}
        <i className="fa fa-chevron-down" style={{ color: "grey" }} />
      </div>
      <div
        style={{
          display: showProfileDropdown ? "flex" : "none",
          backgroundColor: "rgb(33, 37, 47)",
        }}
        className="profile-dropdown"
      >
        <div className="profile-dropdown-item">
          <Link to={`/users/${user.name}`} onClick={toggleUserDropdown}>
            <i className="fa fa-user" /> Profile
          </Link>
        </div>
        <div className="profile-dropdown-item">
          <Link to="/users" onClick={toggleUserDropdown}>
            <i className="fa fa-users" /> All Users
          </Link>
        </div>
        <div className="profile-dropdown-item">
          <Link to="/logout" onClick={toggleUserDropdown}>
            <i className="fa fa-sign-out" /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileIcon;
