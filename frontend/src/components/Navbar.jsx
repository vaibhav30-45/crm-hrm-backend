import React from "react";
import img from "../assets/vs.jpg"


const Navbar = () => {
  const name = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'Guest';
  return (
    <div className="navbar">
      <input type="text" placeholder="Search..." className="search" />
      <div className="profile">
        <span>{name}</span>
        <img
          src={img}
          alt="profile"
          className="avatar"
        />
      </div>
    </div>
  );
};

export default Navbar;
