import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import AlertCard from "../components/DashboardComponents/AlertCard";
import DashboardLayout from "../components/DashboardComponents/DashboardLayout";
import AttendanceTrend from "../components/DashboardComponents/AttendanceTrend";
import EmployeeGrowthTrend from "../components/DashboardComponents/EmployeeGrowthTrend";
import MonthlyRevenueChart from "../components/DashboardComponents/MonthlyRevenueChart";
import DownloadReports from "../components/DashboardComponents/DownloadReports";

import RiskAnomalyCard from "../components/DashboardComponents/RiskAnomalyCard";
import SecurityAlerts from "../components/DashboardComponents/SecurityAlerts";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }
.bottom-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}

        .layout {
          display: flex;
          height: 100vh;
        }

        /* Sidebar */
        .sidebar {
          width: 270px;
          background: #000000;
          color: white;
          padding: 20px;
        }

        .logo {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 30px;
        }

        .menu {
          list-style: none;
        }

        .menu li {
          padding: 12px;
          cursor: pointer;
          border-radius: 6px;
          margin-bottom: 5px;
        }

        .menu li:hover,
        .menu .active {
          background: #17A1CB;
        }

        .logout {
          margin-top: 30px;
          color: #f87171;
        }

        /* Main Area */
        .main {
          flex: 1;
          background: #f1f5f9;
          display: flex;
          flex-direction: column;
        }

        .navbar {
          background: white;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .search {
          padding: 8px;
          width: 250px;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          border-radius: 50%;
        }

        .content {
          padding: 20px;
          overflow-y: auto;
        }

        .page-title {
          margin-bottom: 20px;
        }

        /* Cards Grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .card {
          background: '#ffffff';
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          width:'267px';
          height:'150px';
        }

        .card h4 {
          color: #000000;
          margin-bottom: 15px;
          font-size: 12px;
        }

        .card h2 {
          margin-bottom: 5px;
        }

        .card p {
          font-size: 13px;
          color: #64748b;
        }

        .alert {
          border-left: 4px solid #f87171;
        }

        /* Bottom Section */
        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .chart-placeholder {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .chart-box {
          height: 220px;
          background: #e2e8f0;
          margin-top: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
        }
      `}</style>

      <h1 className="page-title">Dashboard</h1>

      {/* Top Stats */}
      <div className="grid">
        <StatCard
          title="Total Leads"
          value="8,420"
          change="+12% from last month"
          changeType="positive"
          icon="✓"
          color="#10b981"
        />
        <StatCard
          title="Total Customers"
          value="3,265"
          change="+9% Growth"
          changeType="positive"
          icon="✓"
          color="#10b981"
        />
        <StatCard
          title="Total Employees"
          value="182"
          change="+5% new this month"
          changeType="positive"
          icon="✓"
          color="#10b981"
        />
        <StatCard
          title="Active Users"
          value="1,024"
          change="Online right now"
          changeType="neutral"
          icon="👥"
          color="#10b981"
        />
      </div>

      {/* Alerts */}
      <div className="grid">
        <AlertCard
          title="AI Alerts"
          value="5 New Alerts"
          subtitle="Review Required"
        />
        <AlertCard
          title="AI Credits Usage"
          value="75% Credits Used"
          subtitle="Upgrade Recommended"
        />
        <AlertCard
          title="SLA Breaches"
          value="6 Violations"
          subtitle="Immediate Action Needed"
        />
        <AlertCard
          title="System Health"
          value="98% System Stable"
          subtitle="All Services Running"
        />
      </div>

      {/* Bottom Section */}
      <div className="bottom-grid">
        <MonthlyRevenueChart />

        <div className="chart-placeholder">
          <h3>Sales Funnel</h3>
          <div className="chart-box">Chart Placeholder</div>
        </div>

        {/* <div className="chart-placeholder">
    <h3>Attendance Trend</h3>
    <div className="chart-box">Chart Placeholder</div>
  </div> */}
        <AttendanceTrend />

        <EmployeeGrowthTrend />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "8px",
          marginTop: "20px",
          width: "100%",
        }}
      >
        <RiskAnomalyCard />
        <SecurityAlerts />
      </div>

      {/* Download Reports Section */}
      <div style={{ marginTop: "20px" }}>
        <DownloadReports />
      </div>
    </DashboardLayout>
  );
}
