import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import { leaveService } from "../../services/leaveService";
import { attendanceService } from "../../services/attendanceService";

const HRDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [leaveRes, attendanceRes] = await Promise.all([
        leaveService.getAllLeaves(),
        attendanceService.getAllAttendance(),
      ]);

      setLeaves(leaveRes.data || []);
      setAttendance(attendanceRes.data || []);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Stats
  const totalEmployees = 245;
  const presentToday = attendance.filter(a => a.status === "Present").length;
  const absentToday = attendance.filter(a => a.status === "Absent").length;
  const pendingLeaves = leaves.filter(l => l.status === "Pending").length;

  return (
    <DashboardLayout>
      <div style={container}>

        <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

        {/* ===== Top Cards ===== */}
        <div style={flexRow}>
          <Card title="Total Employees" value={totalEmployees} color="#3498db" />
          <Card title="Present Today" value={presentToday} color="#2ecc71" />
          <Card title="Absent Today" value={absentToday} color="#e74c3c" />
          <Card title="Pending Leaves" value={pendingLeaves} color="#f39c12" />
        </div>

        {/* ===== Middle Section ===== */}
        <div style={flexRow}>
          
          {/* Attendance Chart */}
          <div style={{ ...card, flex: 2 }}>
            <h3>Attendance Statistic</h3>

            <div style={chartContainer}>
              {[70, 80, 60, 85, 75, 82, 70].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: "20px",
                    height: `${h}%`,
                    background: "#00bcd4",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Leave Applications */}
          <div style={{ ...card, flex: 1 }}>
            <h3>Leave Application</h3>

            {loading ? (
              <p>Loading...</p>
            ) : leaves.length > 0 ? (
              leaves.slice(0, 5).map((leave, i) => (
                <div key={i} style={listRow}>
                  <span>{leave.employeeName || "Employee"}</span>

                  <span
                    style={{
                      ...statusBadge,
                      background:
                        leave.status === "Pending" ? "#fff3cd" : "#d4edda",
                      color:
                        leave.status === "Pending" ? "#856404" : "#155724",
                    }}
                  >
                    {leave.status}
                  </span>
                </div>
              ))
            ) : (
              <p>No data</p>
            )}
          </div>
        </div>

        {/* ===== Bottom Section ===== */}
        <div style={flexRow}>
          
          {/* Performance */}
          <div style={{ ...card, flex: 2 }}>
            <h3>Employee Performance Ratings</h3>

            {["Rahul", "Pooja", "Riya", "Aman", "Neha"].map((name, i) => (
              <div key={i} style={{ marginTop: "15px" }}>
                <p>{name}</p>

                <div style={progressBg}>
                  <div
                    style={{
                      ...progressFill,
                      width: `${60 + i * 5}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Loan */}
          <div style={{ ...card, flex: 1, textAlign: "center" }}>
            <h3>Loan Payment</h3>
            <h1 style={{ marginTop: "30px" }}>8440</h1>
            <p>Total Loan Amount</p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

/* ===== Reusable Components ===== */

const Card = ({ title, value, color }) => (
  <div style={card}>
    <p style={{ color: "#777", fontSize: "14px" }}>{title}</p>
    <h2 style={{ margin: "5px 0" }}>{value}</h2>
    <p style={{ color, fontSize: "13px" }}>Updated</p>
  </div>
);

/* ===== Styles ===== */

const container = {
  padding: "20px",
  background: "#f4f6f9",
  minHeight: "100vh",
};

const flexRow = {
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
};

const card = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const chartContainer = {
  display: "flex",
  alignItems: "end",
  gap: "10px",
  height: "200px",
  marginTop: "20px",
};

const listRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
};

const statusBadge = {
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

const progressBg = {
  height: "8px",
  background: "#eee",
  borderRadius: "5px",
};

const progressFill = {
  height: "100%",
  background: "#00bcd4",
  borderRadius: "5px",
};

export default HRDashboard;