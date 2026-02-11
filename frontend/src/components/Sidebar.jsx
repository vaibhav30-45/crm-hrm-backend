import { FaUser } from "react-icons/fa6";
import { AiFillShopping } from "react-icons/ai";
import { GiHandBag } from "react-icons/gi";
import { RiRobot2Fill } from "react-icons/ri";
import { FaChartSimple } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img 
          src="/assets/logo.png" 
          alt="DETA Genix Logo" 
          style={{ 
            width: '120px', 
            height: 'auto',
            marginRight: '10px'
          }} 
        />
        
      </div>

      <ul className="menu">
        <li className="active">Dashboard</li>
        <li><FaUser size={16} color="#ffffff" /> User Management</li>
        <li><AiFillShopping size={16} color="#ffffff" /> CRM</li>
        <li><GiHandBag size={16} color="#ffffff" /> HRMS</li>
        <li><RiRobot2Fill size={16} color="#ffffff" /> AI Center</li>
        <li><FaChartSimple size={16} color="#ffffff" /> Reports</li>
        <li><MdOutlineSecurity size={16} color="#ffffff" /> Security</li>
        <li><IoSettings size={16} color="#ffffff" /> Settings</li>
        <li className="logout">Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
