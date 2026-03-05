import React from "react";


const Navbar = () => {
  const name = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'Guest';
  return (
    <div className="navbar">
      <input type="text" placeholder="Search..." className="search" />
      <div className="profile">
        <span>{name}</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="avatar"
        />
      </div>
    </div>
  );
};

export default Navbar;
