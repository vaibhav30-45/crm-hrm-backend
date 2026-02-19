import { FaUser } from "react-icons/fa6";
import { AiFillShopping } from "react-icons/ai";
import { GiHandBag } from "react-icons/gi";
import { RiRobot2Fill } from "react-icons/ri";
import { FaChartSimple } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import logo from "../assets/logo.webp";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [isCrmOpen, setIsCrmOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const toggleUserManagement = () => {
    setIsUserManagementOpen(!isUserManagementOpen);
  };

  const toggleCrm = () => {
    setIsCrmOpen(!isCrmOpen);
  };

  const handleUsersClick = () => {
    navigate("/users");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleLeadsManagementClick = () => {
    navigate("/leads-management");
  };

  const handleSalesActivitiesClick = () => {
    navigate("/sales-activities");
  };

  const handleSalesPipelineClick = () => {
    navigate("/sales-pipeline");
  };

  const handleForecastClick = () => {
    navigate("/forecast");
  };

  const handleCustomerManagementClick = () => {
    navigate("/customer-management");
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      navigate("/login");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="logo">
        <img
          src={logo}
          alt="DETA Genix Logo"
          style={{
            width: "120px",
            height: "auto",
            marginRight: "10px",
          }}
        />
      </div>

      <ul className="menu">
        <li
          onClick={handleDashboardClick}
          style={{
            backgroundColor: isActive("/dashboard") ? "#0ea5e9" : "transparent",
            cursor: "pointer",
          }}
        >
          Dashboard
        </li>

        {/* USER MANAGEMENT */}
        <li
          onClick={toggleUserManagement}
          style={{
            backgroundColor:
              isUserManagementOpen || isActive("/users")
                ? "#0ea5e9"
                : "transparent",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaUser size={16} color="#ffffff" />
            <span style={{ marginLeft: "10px" }}>User Management</span>
          </div>
          {isUserManagementOpen || isActive("/users") ? (
            <FaChevronDown size={12} color="#ffffff" />
          ) : (
            <FaChevronRight size={12} color="#ffffff" />
          )}
        </li>

        {(isUserManagementOpen || isActive("/users")) && (
          <li
            onClick={handleUsersClick}
            style={{
              paddingLeft: "45px",
              backgroundColor: "transparent",
              color: isActive("/users") ? "#0ea5e9" : "#7dd3fc",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Users
          </li>
        )}

        {/* CRM SECTION */}
        <li
          onClick={toggleCrm}
          style={{
            backgroundColor:
              isCrmOpen ||
              isActive("/leads-management") ||
              isActive("/sales-activities") ||
              isActive("/sales-pipeline") ||
              isActive("/forecast") ||
              isActive("/customer-management")
                ? "#0ea5e9"
                : "transparent",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <AiFillShopping size={16} color="#ffffff" />
            <span style={{ marginLeft: "10px" }}>CRM</span>
          </div>
          {isCrmOpen ||
          isActive("/leads-management") ||
          isActive("/sales-activities") ||
          isActive("/sales-pipeline") ||
          isActive("/forecast") ||
          isActive("/customer-management") ? (
            <FaChevronDown size={12} color="#ffffff" />
          ) : (
            <FaChevronRight size={12} color="#ffffff" />
          )}
        </li>

        {(isCrmOpen ||
          isActive("/leads-management") ||
          isActive("/sales-activities") ||
          isActive("/sales-pipeline") ||
          isActive("/forecast") ||
          isActive("/customer-management")) && (
          <>
            <li
              onClick={handleLeadsManagementClick}
              style={{
                paddingLeft: "45px",
                backgroundColor: "transparent",
                color: isActive("/leads-management") ? "#0ea5e9" : "#ffffff",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Leads Management
            </li>

            <li
              onClick={handleSalesActivitiesClick}
              style={{
                paddingLeft: "45px",
                backgroundColor: "transparent",
                color: isActive("/sales-activities") ? "#0ea5e9" : "#ffffff",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Sales Activities
            </li>

            <li
              onClick={handleSalesPipelineClick}
              style={{
                paddingLeft: "45px",
                backgroundColor: "transparent",
                color: isActive("/sales-pipeline") ? "#0ea5e9" : "#ffffff",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Sales Pipeline & Forecast
            </li>

            <li
              onClick={handleCustomerManagementClick}
              style={{
                paddingLeft: "45px",
                backgroundColor: "transparent",
                color: isActive("/customer-management") ? "#0ea5e9" : "#ffffff",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Customer Management
            </li>
          </>
        )}

        <li>
          <GiHandBag size={16} color="#ffffff" /> HRMS
        </li>
        <li>
          <RiRobot2Fill size={16} color="#ffffff" /> AI Center
        </li>
        <li>
          <FaChartSimple size={16} color="#ffffff" /> Reports
        </li>
        <li>
          <MdOutlineSecurity size={16} color="#ffffff" /> Security
        </li>
        <li>
          <IoSettings size={16} color="#ffffff" /> Settings
        </li>

        <li
          className="logout"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;


