// import React from "react";
// import img from "../assets/vs.jpg"


// const Navbar = () => {
//   const name = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'Guest';
//   return (
//     <div className="navbar">
//       <input type="text" placeholder="Search..." className="search" />
//       <div className="profile">
//         <span>{name}</span>
//         <img
//           src={img}
//           alt="profile"
//           className="avatar"
//         />
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const name = user?.name || "Guest";

  // 👉 First letter
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  // 👉 Dynamic color
  const getAvatarColor = (name) => {
    const colors = [
      "#f44336", "#e91e63", "#9c27b0", "#673ab7",
      "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
      "#009688", "#4caf50", "#8bc34a", "#cddc39",
      "#ff9800", "#ff5722"
    ];

    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #ddd",
          width: "200px",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontWeight: "500" }}>{name}</span>

        {/* 👇 Avatar circle */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: getAvatarColor(name),
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          {getInitial(name)}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
