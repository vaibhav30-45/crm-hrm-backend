// import { FaUser } from "react-icons/fa6";
// import { AiFillShopping } from "react-icons/ai";
// import { GiHandBag } from "react-icons/gi";
// import { RiRobot2Fill } from "react-icons/ri";
// import { FaChartSimple } from "react-icons/fa6";
// import { MdOutlineSecurity } from "react-icons/md";
// import { IoSettings } from "react-icons/io5";
// import { FaChevronDown, FaChevronRight } from "react-icons/fa";
// import logo from '../assets/logo.webp';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { useEffect } from 'react';

// const Sidebar = () => {
//   const { 
//     isUserManagementOpen, 
//     isCrmOpen, 
//     toggleUserManagement, 
//     toggleCrm,
//     setIsCrmOpen,
//     setIsUserManagementOpen,
//     logout
//   } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

// useEffect(() => {
//   const crmPages = [
//     '/leads-management', 
//     '/sales-activities', 
//     '/sales-pipeline', 
//     '/forecast', 
//     '/customer-management'
//   ];

//   if (crmPages.includes(location.pathname)) {
//     setIsCrmOpen(true);
//     setIsUserManagementOpen(false);
//   }
// }, [location.pathname]);


//   const handleUsersClick = () => {
//     navigate('/users');
//   };

//   const handleDashboardClick = () => {
//     navigate('/dashboard');
//   };

//   const handleLeadsManagementClick = () => {
//     navigate('/leads-management');
//   };

//   const handleSalesActivitiesClick = () => {
//     navigate('/sales-activities');
//   };

//   const handleSalesPipelineClick = () => {
//     navigate('/sales-pipeline');
//   };

//   const handleForecastClick = () => {
//     navigate('/forecast');
//   };

//   const handleCustomerManagementClick = () => {
//     navigate('/customer-management');
//   };

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="sidebar">
//       <div className="logo">
//         <img 
//           src={logo} 
//           alt="DETA Genix Logo" 
//           style={{ 
//             width: '120px', 
//             height: 'auto',
//             marginRight: '10px'
//           }} 
//         />
        
//       </div>

//       <ul className="menu">
//         <li 
//           onClick={handleDashboardClick}
//           style={{ 
//             backgroundColor: isActive('/dashboard') ? '#0ea5e9' : 'transparent',
//             cursor: 'pointer'
//           }}
//         >
//           Dashboard
//         </li>
//         <li 
//           onClick={toggleUserManagement}
//           style={{ 
//             backgroundColor: isUserManagementOpen || isActive('/users') ? '#0ea5e9' : 'transparent',
//             cursor: 'pointer',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//           }}
//         >
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <FaUser size={16} color="#ffffff" />
//             <span style={{ marginLeft: '10px' }}>User Management</span>
//           </div>
//           {isUserManagementOpen || isActive('/users') ? (
//             <FaChevronDown size={12} color="#ffffff" />
//           ) : (
//             <FaChevronRight size={12} color="#ffffff" />
//           )}
//         </li>
//         {(isUserManagementOpen || isActive('/users')) && (
//           <li 
//             onClick={handleUsersClick}
//             style={{ 
//               paddingLeft: '45px',
//               backgroundColor: 'transparent',
//               color: isActive('/users') ? '#0ea5e9' : '#7dd3fc',
//               fontSize: '14px',
//               cursor: 'pointer'
//             }}
//           >
//             Users
//           </li>
//         )}
//         <li 
//           onClick={toggleCrm}
//           style={{ 
//         backgroundColor: isCrmOpen ? '#0ea5e9' : 'transparent',

//             cursor: 'pointer',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//           }}
//         >
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <AiFillShopping size={16} color="#ffffff" />
//             <span style={{ marginLeft: '10px' }}>CRM</span>
//           </div>
//           {isCrmOpen || isActive('/leads-management') || isActive('/sales-activities') || isActive('/sales-pipeline') || isActive('/forecast') || isActive('/customer-management') ? (
//             <FaChevronDown size={12} color="#ffffff" />
//           ) : (
//             <FaChevronRight size={12} color="#ffffff" />
//           )}
//         </li>
//        {isCrmOpen && (
//   <>
//     <li 
//       onClick={handleLeadsManagementClick}
//       style={{ 
//         paddingLeft: '45px',
//         color: isActive('/leads-management') ? '#0ea5e9' : '#ffffff',
//         fontSize: '14px',
//         cursor: 'pointer'
//       }}
//     >
//       Leads Management
//     </li>

//     <li 
//       onClick={handleSalesActivitiesClick}
//       style={{ 
//         paddingLeft: '45px',
//         color: isActive('/sales-activities') ? '#0ea5e9' : '#ffffff',
//         fontSize: '14px',
//         cursor: 'pointer'
//       }}
//     >
//       Sales Activities
//     </li>

//     <li 
//       onClick={handleSalesPipelineClick}
//       style={{ 
//         paddingLeft: '45px',
//         color: isActive('/sales-pipeline') ? '#0ea5e9' : '#ffffff',
//         fontSize: '14px',
//         cursor: 'pointer'
//       }}
//     >
//       Sales Pipeline & Forecast
//     </li>

//     <li 
//       onClick={handleCustomerManagementClick}
//       style={{ 
//         paddingLeft: '45px',
//         color: isActive('/customer-management') ? '#0ea5e9' : '#ffffff',
//         fontSize: '14px',
//         cursor: 'pointer'
//       }}
//     >
//       Customer Management
//     </li>
//   </>
// )}

//         <li><GiHandBag size={16} color="#ffffff" /> HRMS</li>
//         <li><RiRobot2Fill size={16} color="#ffffff" /> AI Center</li>
//         <li><FaChartSimple size={16} color="#ffffff" /> Reports</li>
//         <li><MdOutlineSecurity size={16} color="#ffffff" /> Security</li>
//         <li><IoSettings size={16} color="#ffffff" /> Settings</li>
//         <li 
//           className="logout"
//           style={{
//             marginTop: '30px',
//             color: '#f87171',
//             cursor: 'pointer',
//             padding: '12px',
//             borderRadius: '6px',
//             backgroundColor: 'transparent',
//             border: 'none',
//             fontSize: '14px'
//           }}
//           onClick={() => {
//             logout();
//             navigate('/login');
//           }}
//         >
//           Logout
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import { FaUser } from "react-icons/fa6";
import { AiFillShopping } from "react-icons/ai";
import { GiHandBag } from "react-icons/gi";
import { RiRobot2Fill } from "react-icons/ri";
import { FaChartSimple } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import logo from '../assets/logo.webp';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const Sidebar = () => {
  const { 
    isUserManagementOpen, 
    isCrmOpen,
    isHrmsOpen,
    toggleUserManagement, 
    toggleCrm,
    toggleHrms,
    setIsCrmOpen,
    setIsUserManagementOpen,
    setIsHrmsOpen,
    logout
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // CRM Auto Open
  useEffect(() => {
    const crmPages = [
      '/leads-management', 
      '/sales-activities', 
      '/sales-pipeline', 
      '/forecast', 
      '/customer-management'
    ];

    if (crmPages.includes(location.pathname)) {
      setIsCrmOpen(true);
      setIsUserManagementOpen(false);
      setIsHrmsOpen(false);
    }
  }, [location.pathname]);

  // HRMS Auto Open
  useEffect(() => {
    const hrmsPages = [
      '/hrms/attendance',
      '/hrms/employee-profile',
      '/hrms/employees-onboarding',
      '/hrms/leave-management',
      '/hrms/payroll-management'
    ];

    if (hrmsPages.includes(location.pathname)) {
      setIsHrmsOpen(true);
      setIsCrmOpen(false);
      setIsUserManagementOpen(false);
    }
  }, [location.pathname]);

  const menuNavigate = (path) => {
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="logo">
        <img 
          src={logo} 
          alt="Logo" 
          style={{ width: '120px', height: 'auto', marginRight: '10px' }} 
        />
      </div>

      <ul className="menu">

        {/* Dashboard */}
        <li 
          onClick={() => menuNavigate('/dashboard')}
          style={{ 
            backgroundColor: isActive('/dashboard') ? '#0ea5e9' : 'transparent',
            cursor: 'pointer'
          }}
        >
          Dashboard
        </li>

        {/* User Management */}
        <li 
          onClick={toggleUserManagement}
          style={{ 
            backgroundColor: isUserManagementOpen || isActive('/users') ? '#0ea5e9' : 'transparent',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaUser size={16} color="#ffffff" />
            <span style={{ marginLeft: '10px' }}>User Management</span>
          </div>
          {isUserManagementOpen ? <FaChevronDown size={12} color="#ffffff" /> : <FaChevronRight size={12} color="#ffffff" />}
        </li>

        {isUserManagementOpen && (
          <li 
            onClick={() => menuNavigate('/users')}
            style={{ 
              paddingLeft: '45px',
              color: isActive('/users') ? '#0ea5e9' : '#ffffff',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Users
          </li>
        )}

        {/* CRM */}
        <li 
          onClick={toggleCrm}
          style={{ 
            backgroundColor: isCrmOpen ? '#0ea5e9' : 'transparent',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AiFillShopping size={16} color="#ffffff" />
            <span style={{ marginLeft: '10px' }}>CRM</span>
          </div>
          {isCrmOpen ? <FaChevronDown size={12} color="#ffffff" /> : <FaChevronRight size={12} color="#ffffff" />}
        </li>

        {isCrmOpen && (
          <>
            <li onClick={() => menuNavigate('/leads-management')} style={{ paddingLeft: '45px', color: isActive('/leads-management') ? '#0ea5e9' : '#ffffff', fontSize: '14px', cursor: 'pointer' }}>
              Leads Management
            </li>
            <li onClick={() => menuNavigate('/sales-activities')} style={{ paddingLeft: '45px', color: isActive('/sales-activities') ? '#0ea5e9' : '#ffffff', fontSize: '14px', cursor: 'pointer' }}>
              Sales Activities
            </li>
            <li onClick={() => menuNavigate('/sales-pipeline')} style={{ paddingLeft: '45px', color: isActive('/sales-pipeline') ? '#0ea5e9' : '#ffffff', fontSize: '14px', cursor: 'pointer' }}>
              Sales Pipeline & Forecast
            </li>
            <li onClick={() => menuNavigate('/customer-management')} style={{ paddingLeft: '45px', color: isActive('/customer-management') ? '#0ea5e9' : '#ffffff', fontSize: '14px', cursor: 'pointer' }}>
              Customer Management
            </li>
          </>
        )}

        {/* HRMS */}
        <li 
          onClick={toggleHrms}
          style={{ 
            backgroundColor: isHrmsOpen ? '#0ea5e9' : 'transparent',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <GiHandBag size={16} color="#ffffff" />
            <span style={{ marginLeft: '10px' }}>HRMS</span>
          </div>
          {isHrmsOpen ? <FaChevronDown size={12} color="#ffffff" /> : <FaChevronRight size={12} color="#ffffff" />}
        </li>

        {isHrmsOpen && (
          <>
            <li onClick={() => menuNavigate('/hrms/attendance')} style={{ paddingLeft: '45px', color: isActive('/hrms/attendance') ? '#0ea5e9' : '#ffffff', fontSize: '14px', cursor: 'pointer' }}>
              Attendance Management
            </li>

            <li onClick={() => menuNavigate('/hrms/employee-profile')} style={{ paddingLeft: '45px', color: isActive('/hrms/employee-profile') ? '#0ea5e9' : '#ffffff', fontSize: '14px', cursor: 'pointer' }}>
              Employees Profile
            </li>
            <li onClick={() => menuNavigate('/hrms/employees-onboarding')} style={{ paddingLeft: '45px', color: isActive('/hrms/employees-onboarding') ? '#0ea5e9' : '#ffffff', fontSize: '14px', cursor: 'pointer' }}>
              Employees OnBoarding
            </li>

            <li onClick={() => menuNavigate('/hrms/leave-management')} style={{ paddingLeft: '45px', color: isActive('/hrms/leave-management') ? '#0ea5e9' : '#ffffff', fontSize: '14px', cursor: 'pointer' }}>
              Leave Management
            </li>

            <li onClick={() => menuNavigate('/hrms/payroll-management')} style={{ paddingLeft: '45px', color: isActive('/hrms/payroll-management') ? '#0ea5e9' : '#ffffff', fontSize: '14px', cursor: 'pointer' }}>
              Payroll Management
            </li>
          </>
        )}

        {/* Other Sections */}
        <li><RiRobot2Fill size={16} color="#ffffff" /> AI Center</li>
        <li><FaChartSimple size={16} color="#ffffff" /> Reports</li>
        <li><MdOutlineSecurity size={16} color="#ffffff" /> Security</li>
        <li><IoSettings size={16} color="#ffffff" /> Settings</li>

        {/* Logout */}
        <li 
          className="logout"
          style={{
            marginTop: '30px',
            color: '#f87171',
            cursor: 'pointer',
            padding: '12px',
            borderRadius: '6px',
            fontSize: '14px'
          }}
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
