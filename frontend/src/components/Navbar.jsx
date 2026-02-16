const Navbar = () => {
  return (
    <div className="navbar">
      <input type="text" placeholder="Search..." className="search" />
      <div className="profile">
        <span>Neha Sharma</span>
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
