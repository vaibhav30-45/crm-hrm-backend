import React, { useState } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";

const AttendanceManagement = () => {

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const employeeData = [
    {
      id: "EM-001",
      name: "Rahul Patidar",
      date: "10 Jan 2026",
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
      status: "Present"
    },
    {
      id: "EM-002",
      name: "Neha Shah",
      date: "12 Jan 2026",
      checkIn: "Mid Set",
      checkOut: "05:00 PM",
      status: "Absent"
    },
    {
      id: "EM-003",
      name: "Pooja Patel",
      date: "14 Jan 2026",
      checkIn: "09:15 AM",
      checkOut: "05:10 PM",
      status: "Present"
    },
    {
      id: "EM-004",
      name: "Amit Verma",
      date: "15 Jan 2026",
      checkIn: "09:05 AM",
      checkOut: "05:00 PM",
      status: "Absent"
    },
    {
      id: "EM-005",
      name: "Riya Sharma",
      date: "16 Jan 2026",
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
      status: "Present"
    },
    {
      id: "EM-006",
      name: "Karan Mehta",
      date: "17 Jan 2026",
      checkIn: "09:20 AM",
      checkOut: "05:00 PM",
      status: "Present"
    },
     {
      id: "EM-005",
      name: "Aditi Sharma",
      date: "16 Jan 2026",
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
      status: "Present"
    },
    {
      id: "EM-006",
      name: "Ansh Bhargav",
      date: "17 Jan 2026",
      checkIn: "09:15 AM",
      checkOut: "05:00 PM",
      status: "Present"
    }
  ];

  const totalPages = Math.ceil(employeeData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = employeeData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <DashboardLayout>
      <div style={{ padding: "20px", background: "#f5f6fa", minHeight: "100vh" }}>
        
        <h2 style={{ marginBottom: "20px", fontWeight: "600" }}>
          HRMS / Attendance Management
        </h2>

        {/* Top Section */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          
          {/* Left Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "250px" }}>
            
            <div style={cardStyle}>
              <h4 style={{ margin: 0, color: "#555" }}>Present</h4>
              <h2 style={{ margin: "10px 0", color: "#000" }}>124</h2>
              <span style={{ color: "green", fontSize: "14px" }}>+5.8% this week</span>
            </div>

            <div style={cardStyle}>
              <h4 style={{ margin: 0, color: "#555" }}>Absent</h4>
              <h2 style={{ margin: "10px 0", color: "#000" }}>26</h2>
              <span style={{ color: "red", fontSize: "14px" }}>-3.4% this week</span>
            </div>
          </div>

          {/* Anomalies Section */}
          <div style={cardStyleFlex}>
            <h4 style={{ marginBottom: "15px" }}>Anomalies detected</h4>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8f9fb", textAlign: "left" }}>
                  <th style={thStyle}>Employee</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>Rahul Patidar</td>
                  <td style={tdStyle}>10 Jan 2026</td>
                  <td style={tdStyle}>Late Check-In</td>
                  <td style={tdStyle}><button style={reviewBtn}>Review</button></td>
                </tr>
                <tr>
                  <td style={tdStyle}>Neha Shah</td>
                  <td style={tdStyle}>12 Jan 2026</td>
                  <td style={tdStyle}>Early Check Out</td>
                  <td style={tdStyle}><button style={reviewBtn}>Review</button></td>
                </tr>
                <tr>
                  <td style={tdStyle}>Pooja Patel</td>
                  <td style={tdStyle}>14 Jan 2026</td>
                  <td style={tdStyle}>Missed Punch</td>
                  <td style={tdStyle}><button style={reviewBtn}>Review</button></td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Employee Table */}
        <div style={cardStyle}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f9fb", textAlign: "left" }}>
                <th style={thStyle}>Employee ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Check-in</th>
                <th style={thStyle}>Check-out</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((emp, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{emp.id}</td>
                  <td style={tdStyle}>{emp.name}</td>
                  <td style={tdStyle}>{emp.date}</td>
                  <td style={tdStyle}>{emp.checkIn}</td>
                  <td style={tdStyle}>{emp.checkOut}</td>
                  <td style={tdStyle}>
                    <span style={emp.status === "Present" ? presentBadge : absentBadge}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Functional Pagination */}
          <div style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "10px"
          }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  background: currentPage === num ? "#00bcd4" : "#fff",
                  color: currentPage === num ? "#fff" : "#000",
                  cursor: "pointer"
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const cardStyleFlex = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const thStyle = {
  padding: "12px",
  fontSize: "14px",
  color: "#666"
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  fontSize: "14px"
};

const reviewBtn = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  background: "#e0f7fa",
  color: "#00796b",
  cursor: "pointer"
};

const presentBadge = {
  padding: "4px 10px",
  borderRadius: "20px",
  background: "#e8f5e9",
  color: "green",
  fontSize: "12px"
};

const absentBadge = {
  padding: "4px 10px",
  borderRadius: "20px",
  background: "#ffebee",
  color: "red",
  fontSize: "12px"
};

export default AttendanceManagement;
