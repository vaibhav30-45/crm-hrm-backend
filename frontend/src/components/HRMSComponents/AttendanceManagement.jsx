import React, { useState, useEffect } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import { attendanceService } from "../../services/attendanceService";

const AttendanceManagement = () => {
  // State for attendance data
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [punchingIn, setPunchingIn] = useState(false);
  const [punchingOut, setPunchingOut] = useState(false);
  const [todayAttendance, setTodayAttendance] = useState(null);

  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

 
  const handlePunchIn = async () => {
    try {
      setPunchingIn(true);
      
      // Call punch in API
      const response = await attendanceService.punchIn();
      
      if (response) {
        setTodayAttendance({ checkIn: new Date().toLocaleTimeString() });
        alert('Punched in successfully!');
      } else {
        alert('Failed to punch in');
      }
    } catch (error) {
      console.error('Punch in error:', error);
      alert('Failed to punch in. Please try again.');
    } finally {
      setPunchingIn(false);
    }
  };

  // Handle Punch Out
  const handlePunchOut = async () => {
    try {
      setPunchingOut(true);
      
      // Call punch out API
      const response = await attendanceService.punchOut();
      
      if (response) {
        setTodayAttendance({ ...todayAttendance, checkOut: new Date().toLocaleTimeString() });
        alert('Punched out successfully!');
      } else {
        alert('Failed to punch out');
      }
    } catch (error) {
      console.error('Punch out error:', error);
      alert('Failed to punch out. Please try again.');
    } finally {
      setPunchingOut(false);
    }
  };

  // Use hardcoded data until APIs are available
  const hardcodedData = [
    {
      _id: "1",
      employee: { id: "EM-001", name: "Rahul Patidar" },
      date: "2026-01-10T00:00:00.000Z",
      checkIn: "2026-01-10T09:00:00.000Z",
      checkOut: "2026-01-10T17:00:00.000Z",
      status: "Present",
    },
    {
      _id: "2",
      employee: { id: "EM-002", name: "Neha Shah" },
      date: "2026-01-12T00:00:00.000Z",
      checkIn: null,
      checkOut: null,
      status: "Absent",
    },
    {
      _id: "3",
      employee: { id: "EM-003", name: "Pooja Patel" },
      date: "2026-01-14T00:00:00.000Z",
      checkIn: "2026-01-14T09:15:00.000Z",
      checkOut: "2026-01-14T17:10:00.000Z",
      status: "Present",
    },
    {
      _id: "4",
      employee: { id: "EM-004", name: "Amit Verma" },
      date: "2026-01-15T00:00:00.000Z",
      checkIn: "2026-01-15T09:05:00.000Z",
      checkOut: null,
      status: "Absent",
    },
  ];

  // Calculate statistics from hardcoded data
  const calculateStats = () => {
    const present = hardcodedData.filter(att => att.status === 'Present').length;
    const absent = hardcodedData.filter(att => att.status === 'Absent').length;
    const late = hardcodedData.filter(att => att.status === 'Late').length;
    
    return { present, absent, late };
  };

  const stats = calculateStats();

  const totalPages = Math.ceil(hardcodedData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = hardcodedData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <DashboardLayout>
      <div
        style={{ padding: "20px", background: "#f5f6fa", minHeight: "100vh" }}
      >
        <h2 style={{ marginBottom: "20px", fontWeight: "600" }}>
          HRMS / Attendance Management
        </h2>

        {/* Top Section */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          {/* Left Cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "250px",
            }}
          >
            <div style={cardStyle}>
              <h4 style={{ margin: 0, color: "#555" }}>Present</h4>
              <h2 style={{ margin: "10px 0", color: "#000" }}>{stats.present}</h2>
              <span style={{ color: "green", fontSize: "14px" }}>
                0% this week
              </span>
            </div>

            <div style={cardStyle}>
              <h4 style={{ margin: 0, color: "#555" }}>Absent</h4>
              <h2 style={{ margin: "10px 0", color: "#000" }}>{stats.absent}</h2>
              <span style={{ color: "red", fontSize: "14px" }}>
                0% this week
              </span>
            </div>

           
            <div style={cardStyle}>
              <h4 style={{ margin: 0, color: "#555", marginBottom: "15px" }}>Today's Status</h4>
              <p style={{ margin: "10px 0", fontSize: "14px", color: "#666" }}>
                Use Punch In/Out buttons to mark attendance
              </p>
              
              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                <button
                  onClick={handlePunchIn}
                  disabled={punchingIn}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "none",
                    background: punchingIn ? "#ccc" : "#4caf50",
                    color: "white",
                    cursor: punchingIn ? "not-allowed" : "pointer",
                    fontSize: "14px"
                  }}
                >
                  {punchingIn ? 'Punching In...' : 'Punch In'}
                </button>
                
                <button
                  onClick={handlePunchOut}
                  disabled={punchingOut}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "6px",
                    border: "none",
                    background: punchingOut ? "#ccc" : "#f44336",
                    color: "white",
                    cursor: punchingOut ? "not-allowed" : "pointer",
                    fontSize: "14px"
                  }}
                >
                  {punchingOut ? 'Punching Out...' : 'Punch Out'}
                </button>
              </div>
            </div>
          </div>

         
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
                  <td style={tdStyle}>
                    <button style={reviewBtn}>Review</button>
                  </td>
                </tr>
                <tr>
                  <td style={tdStyle}>Neha Shah</td>
                  <td style={tdStyle}>12 Jan 2026</td>
                  <td style={tdStyle}>Early Check Out</td>
                  <td style={tdStyle}>
                    <button style={reviewBtn}>Review</button>
                  </td>
                </tr>
                <tr>
                  <td style={tdStyle}>Pooja Patel</td>
                  <td style={tdStyle}>14 Jan 2026</td>
                  <td style={tdStyle}>Missed Punch</td>
                  <td style={tdStyle}>
                    <button style={reviewBtn}>Review</button>
                  </td>
                </tr>
            </tbody>
            </table>
          </div>
        </div>

        
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
                <tr>
                  <td style={tdStyle}>EM-001</td>
                  <td style={tdStyle}>Rahul Patidar</td>
                  <td style={tdStyle}>10 Jan 2026</td>
                  <td style={tdStyle}>09:00 AM</td>
                  <td style={tdStyle}>05:00 PM</td>
                  <td style={tdStyle}>
                    <span style={presentBadge}>Present</span>
                  </td>
                </tr>
                <tr>
                  <td style={tdStyle}>EM-002</td>
                  <td style={tdStyle}>Neha Shah</td>
                  <td style={tdStyle}>12 Jan 2026</td>
                  <td style={tdStyle}>Mid Set</td>
                  <td style={tdStyle}>05:00 PM</td>
                  <td style={tdStyle}>
                    <span style={absentBadge}>Absent</span>
                  </td>
                </tr>
                <tr>
                  <td style={tdStyle}>EM-003</td>
                  <td style={tdStyle}>Pooja Patel</td>
                  <td style={tdStyle}>14 Jan 2026</td>
                  <td style={tdStyle}>09:15 AM</td>
                  <td style={tdStyle}>05:10 PM</td>
                  <td style={tdStyle}>
                    <span style={presentBadge}>Present</span>
                  </td>
                </tr>
                <tr>
                  <td style={tdStyle}>EM-004</td>
                  <td style={tdStyle}>Amit Verma</td>
                  <td style={tdStyle}>15 Jan 2026</td>
                  <td style={tdStyle}>09:05 AM</td>
                  <td style={tdStyle}>05:00 PM</td>
                  <td style={tdStyle}>
                    <span style={absentBadge}>Absent</span>
                  </td>
                </tr>
            </tbody>
          </table>

          {/* Functional Pagination */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
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
                  cursor: "pointer",
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
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const cardStyleFlex = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const thStyle = {
  padding: "12px",
  fontSize: "14px",
  color: "#666",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  fontSize: "14px",
};

const reviewBtn = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  background: "#e0f7fa",
  color: "#00796b",
  cursor: "pointer",
};

const presentBadge = {
  padding: "4px 10px",
  borderRadius: "20px",
  background: "#e8f5e9",
  color: "green",
  fontSize: "12px",
};

const absentBadge = {
  padding: "4px 10px",
  borderRadius: "20px",
  background: "#ffebee",
  color: "red",
  fontSize: "12px",
};

const lateBadge = {
  padding: "4px 10px",
  borderRadius: "20px",
  background: "#fff3e0",
  color: "#ff9800",
  fontSize: "12px",
};

export default AttendanceManagement;
