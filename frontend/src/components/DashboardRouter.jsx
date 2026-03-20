import React from "react";
import { useAuth } from "../contexts/AuthContext";

import AdminDashboard from "../pages/Dashboard";
import ManagerDashboard from "../components/ManagerDashboard/ManagerDashboard";
import EmployeeDashboard from "../components/EmployeeDashboard/EmployeeDashboard";
import HRDashboard from "../components/HRDashboard/HRDashboard";
import BDEDashboard from "../components/SalesDashboard/SalesDashboard";

const DashboardRouter = () => {
  const { user } = useAuth();
  const role = user?.role?.toUpperCase();

  console.log("ROLE:", role);

  if (role === "ADMIN") return <AdminDashboard />;
  if (role === "MANAGER") return <ManagerDashboard />;
  if (role === "EMPLOYEE") return <EmployeeDashboard />;
  if (role === "HR") return <HRDashboard />;
  if (role === "BDE") return <BDEDashboard />;

  return <div>No Dashboard Found</div>;
};

export default DashboardRouter;