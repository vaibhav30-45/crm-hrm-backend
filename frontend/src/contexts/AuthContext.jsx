import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

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
  const [isCrmOpen, setIsCrmOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);

  useEffect(() => {
    // Check for existing authentication on app load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (token, userData) => {
    try {
      // Handle direct token and user data from Login component
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      } else {
        // Handle credentials login via authService
        const response = await authService.login(credentials);
        setIsAuthenticated(true);
        setUser(response.data.user);
        return response;
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const toggleCrm = () => {
    setIsCrmOpen(!isCrmOpen);
  };

  const toggleUserManagement = () => {
    setIsUserManagementOpen(!isUserManagementOpen);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    isCrmOpen,
    setIsCrmOpen,
    toggleCrm,
    isUserManagementOpen,
    setIsUserManagementOpen,
    toggleUserManagement
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
