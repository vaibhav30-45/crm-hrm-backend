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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  // Fetch all employees attendance on component mount
  useEffect(() => {
    fetchAllAttendance();
  }, []);

 const fetchAllAttendance = async () => {
  try {
    setLoading(true);
    setError(null);

    const response = await attendanceService.getAllAttendance();

    if (response?.success) {
      setAttendanceData(response.data || []);
    } else {
      setError(response?.message || "Failed to fetch attendance data");
    }

  } catch (error) {
    console.error("Fetch attendance error:", error);
    setError("Failed to fetch attendance data. Please try again.");
  } finally {
    setLoading(false);
  }
};
 
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
      // Show the actual error message from the API
      alert(error.message || 'Failed to punch in. Please try again.');
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
      // Show the actual error message from the API
      alert(error.message || 'Failed to punch out. Please try again.');
    } finally {
      setPunchingOut(false);
    }
  };

  // Calculate statistics from fetched data
  const calculateStats = () => {
    const present = attendanceData.filter(att => att.status === 'Present').length;
    const absent = attendanceData.filter(att => att.status === 'Absent').length;
    const late = attendanceData.filter(att => att.status === 'Late').length;
    
    return { present, absent, late };
  };

  const stats = calculateStats();

  // Pagination calculations
  const totalPages = Math.ceil(attendanceData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = attendanceData.slice(indexOfFirstRow, indexOfLastRow);

  // Format date and time for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present':
        return presentBadge;
      case 'Absent':
        return absentBadge;
      case 'Late':
        return lateBadge;
      default:
        return presentBadge;
    }
  };

  // Generate employee ID from email or name
  const getEmployeeId = (employee) => {
    if (!employee) return 'N/A';
    // Generate ID from email (first part before @) or use a default format
    if (employee.email) {
      return employee.email.split('@')[0].toUpperCase();
    }
    if (employee.name) {
      return employee.name.split(' ').map(word => word[0]).join('').toUpperCase();
    }
    return 'EMP-' + employee._id?.slice(-6) || 'UNKNOWN';
  };

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

        
        {/* Attendance Table Section */}
        <div style={cardStyle}>
          {/* Table Header with Controls */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '20px' 
          }}>
            <h4 style={{ margin: 0, color: '#333' }}>All Employees Attendance</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={fetchAllAttendance}
                disabled={loading}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  background: loading ? '#f5f5f5' : '#fff',
                  color: loading ? '#999' : '#333',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                🔄 Refresh
              </button>
              <span style={{ 
                padding: '4px 12px', 
                borderRadius: '20px', 
                background: '#e3f2fd', 
                color: '#1976d2', 
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {attendanceData.length} Records
              </span>
            </div>
          </div>
          {/* Loading State */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ 
                display: 'inline-block',
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ marginTop: '10px', color: '#666' }}>Loading attendance data...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ color: '#e74c3c', marginBottom: '10px' }}>{error}</div>
              <button
                onClick={fetchAllAttendance}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#3498db',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          )}

          {/* Data Table */}
          {!loading && !error && (
            <>
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
                  {currentRows.length > 0 ? (
                    currentRows.map((attendance) => (
                      <tr key={attendance._id}>
                        <td style={tdStyle}>{getEmployeeId(attendance.employee)}</td>
                        <td style={tdStyle}>{attendance.employee?.name || 'N/A'}</td>
                        <td style={tdStyle}>{formatDate(attendance.date)}</td>
                        <td style={tdStyle}>{formatTime(attendance.checkIn)}</td>
                        <td style={tdStyle}>{formatTime(attendance.checkOut)}</td>
                        <td style={tdStyle}>
                          <span style={getStatusBadge(attendance.status)}>
                            {attendance.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ 
                        textAlign: 'center', 
                        padding: '40px', 
                        color: '#666',
                        fontStyle: 'italic'
                      }}>
                        No attendance records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
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
              )}
            </>
          )}
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
