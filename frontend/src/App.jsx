import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PublicRoutes from './components/routes/PublicRoutes';
import PrivateRoutes from './components/routes/PrivateRoutes';
import Home from './pages/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <PublicRoutes>
              <Home />
            </PublicRoutes>
          } />
          <Route path="/login" element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          } />
          <Route path="/forgot-password" element={
            <PublicRoutes>
              <ForgotPassword />
            </PublicRoutes>
          } />
          
          {/* Private Routes */}
          <Route path="/dashboard" element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<div className="text-center mt-20 text-2xl">404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
