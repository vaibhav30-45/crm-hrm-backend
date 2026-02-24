// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isCrmOpen, setIsCrmOpen] = useState(false);
//   const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);

//   useEffect(() => {
//     // Check for token in localStorage on app load
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (token && userData) {
//       setIsAuthenticated(true);
//       setUser(JSON.parse(userData));
//     }
//     setLoading(false);
//   }, []);

//   const login = (token, userData) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setIsAuthenticated(true);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   const toggleCrm = () => {
//     setIsCrmOpen(!isCrmOpen);
//   };

//   const toggleUserManagement = () => {
//     setIsUserManagementOpen(!isUserManagementOpen);
//   };

//   const value = {
//     isAuthenticated,
//     user,
//     loading,
//     login,
//     logout,
//     isCrmOpen,
//     setIsCrmOpen,
//     toggleCrm,
//     isUserManagementOpen,
//     setIsUserManagementOpen,
//     toggleUserManagement
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sidebar States
  const [isCrmOpen, setIsCrmOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [isHrmsOpen, setIsHrmsOpen] = useState(false); // ✅ ADDED

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Toggle CRM
  const toggleCrm = () => {
    setIsCrmOpen(!isCrmOpen);
    setIsUserManagementOpen(false);
    setIsHrmsOpen(false); // Close others
  };

  // Toggle User Management
  const toggleUserManagement = () => {
    setIsUserManagementOpen(!isUserManagementOpen);
    setIsCrmOpen(false);
    setIsHrmsOpen(false);
  };

  // ✅ Toggle HRMS
  const toggleHrms = () => {
    setIsHrmsOpen(!isHrmsOpen);
    setIsCrmOpen(false);
    setIsUserManagementOpen(false);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,

    // Sidebar states
    isCrmOpen,
    setIsCrmOpen,
    toggleCrm,

    isUserManagementOpen,
    setIsUserManagementOpen,
    toggleUserManagement,

    isHrmsOpen,          
    setIsHrmsOpen,       
    toggleHrms          
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

