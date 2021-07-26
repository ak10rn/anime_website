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
      <div
        className="d-flex flex-row"
        onClick={toggleUserDropdown}
        style={{ cursor: "pointer" }}
      >
        <img src={user.image} alt="usr_img" />{" "}
        <div style={{ margin: "auto 5px" }}>
          <span style={{ color: "yellow" }}>{user.name}</span>{" "}
          <i
            className="fa fa-chevron-down"
            style={{
              color: "grey",
              transition: "transform 0.15s ease-in-out",
              transform: showProfileDropdown ? "rotateZ(180deg)" : "rotateZ(0)",
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: showProfileDropdown ? "flex" : "none",
          backgroundColor: "rgb(33, 37, 47)",
        }}
        className="profile-dropdown"
      >
        <div className="profile-dropdown-item">
          <Link to={`/users/${user._id}`} onClick={toggleUserDropdown}>
            <i className="fa fa-user" /> Profile
          </Link>
        </div>
        <div className="profile-dropdown-item">
          <Link to="/users" onClick={toggleUserDropdown}>
            <i className="fa fa-users" /> All Users
          </Link>
        </div>
        <div className="profile-dropdown-item">
          <Link
            to="/logout"
            onClick={toggleUserDropdown}
            style={{ color: "#FF004D" }}
          >
            <i className="fa fa-sign-out" /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileIcon;
