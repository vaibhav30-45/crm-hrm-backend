import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PublicRoutes from "./components/routes/PublicRoutes";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTPVerification";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import Dashboard from "./pages/Dashboard";
import Users from "./components/Users";
import LeadsManagement from "./components/CRMconponents/LeadsManagement";
import SalesActivities from "./components/CRMconponents/SalesActivities";
import SalesPipeline from "./components/CRMconponents/SalesPipeline";

import CustomerManagement from "./components/CRMconponents/CustomerManagement";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicRoutes>
                <Home />
              </PublicRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoutes>
                <ForgotPassword />
              </PublicRoutes>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoutes>
                <ResetPassword />
              </PublicRoutes>
            }
          />
          <Route
            path="/otp-verification"
            element={
              <PublicRoutes>
                <OTPVerification />
              </PublicRoutes>
            }
          />
          <Route
            path="/new-password"
            element={
              <PublicRoutes>
                <NewPassword />
              </PublicRoutes>
            }
          />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoutes>
                <Users />
              </PrivateRoutes>
            }
          />
          <Route
            path="/leads-management"
            element={
              <PrivateRoutes>
                <LeadsManagement />
              </PrivateRoutes>
            }
          />
          <Route
            path="/sales-activities"
            element={
              <PrivateRoutes>
                <SalesActivities />
              </PrivateRoutes>
            }
          />
          <Route
            path="/sales-pipeline"
            element={
              <PrivateRoutes>
                <SalesPipeline />
              </PrivateRoutes>
            }
          />
          <Route
            path="/customer-management"
            element={
              <PrivateRoutes>
                <CustomerManagement />
              </PrivateRoutes>
            }
          />

          {/* Catch all route */}
          <Route
            path="*"
            element={
              <div className="text-center mt-20 text-2xl">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
