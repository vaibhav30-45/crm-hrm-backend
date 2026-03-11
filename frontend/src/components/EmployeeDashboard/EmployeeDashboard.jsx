import React from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";

const EmployeeDashboard = () => {
  return (
    <DashboardLayout>
      <div
        style={{ padding: "20px", background: "#f5f6fa", minHeight: "100vh" }}
      >
        <h2 style={{ marginBottom: "20px", fontWeight: "600" }}>Dashboard</h2>

        {/* Top Cards */}

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={cardStyle}>
            <p style={cardTitle}>Today Status</p>
            <h3 style={cardValue}>Present</h3>
            <span style={{ color: "#2ecc71", fontSize: "13px" }}>
              +2% better than yesterday
            </span>
          </div>

          <div style={cardStyle}>
            <p style={cardTitle}>Working Hours</p>
            <h3 style={cardValue}>7h 45m</h3>
            <span style={{ color: "#2ecc71", fontSize: "13px" }}>
              +3 min vs yesterday
            </span>
          </div>

          <div style={cardStyle}>
            <p style={cardTitle}>Leave Balance</p>
            <h3 style={cardValue}>12 Days</h3>
            <span style={{ color: "#2ecc71", fontSize: "13px" }}>
              1 used this month
            </span>
          </div>

          <div style={cardStyle}>
            <p style={cardTitle}>Payroll</p>
            <h3 style={cardValue}>₹ 38,500</h3>
            <span style={{ color: "#2ecc71", fontSize: "13px" }}>
              +5% Increment
            </span>
          </div>
        </div>

        {/* Chart + Payslip */}

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          {/* Attendance Chart */}

          <div style={{ ...cardStyle, flex: 2 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "15px",
              }}
            >
              <h4 style={{ margin: 0 }}>Attendance Statistic</h4>
              <div style={{ display: "flex", gap: "10px" }}>
                <select style={selectStyle}>
                  <option>Production</option>
                </select>
                <select style={selectStyle}>
                  <option>Weekly</option>
                </select>
              </div>
            </div>

            <div style={chartPlaceholder}>Attendance Chart</div>
          </div>

          {/* Payslip */}

          <div style={{ ...cardStyle, flex: 1 }}>
            <h4 style={{ marginBottom: "20px" }}>Payslip</h4>

            <p style={{ color: "#888", fontSize: "14px" }}>Pay Month</p>

            <div style={{ marginTop: "10px" }}>
              <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                Net Salary
              </p>
              <h3>12 Days</h3>
            </div>

            <div style={{ marginTop: "15px" }}>
              <p style={{ fontSize: "14px", marginBottom: "5px" }}>Present</p>
              <h3>₹ 38,500</h3>
            </div>

            <p style={{ marginTop: "15px", fontSize: "13px", color: "#888" }}>
              Check-in: 09:12 AM
            </p>

            <p style={{ color: "#2ecc71", fontSize: "13px" }}>
              +2% better than yesterday
            </p>

            <button style={downloadBtn}>⬇ Download</button>
          </div>
        </div>

        {/* Leave Request Table */}

        <div style={cardStyle}>
          <h4 style={{ marginBottom: "20px" }}>Leave Request</h4>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f9fb", textAlign: "left" }}>
                <th style={thStyle}>Leave Type</th>
                <th style={thStyle}>From Date</th>
                <th style={thStyle}>To Date</th>
                <th style={thStyle}>Total Days</th>
                <th style={thStyle}>Reason</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={tdStyle}>Casual</td>
                <td style={tdStyle}>12-01-2026</td>
                <td style={tdStyle}>14-01-2026</td>
                <td style={tdStyle}>2 Days</td>
                <td style={tdStyle}>Medical appointment</td>
                <td style={tdStyle}>
                  <span style={approvedBadge}>Approved</span>
                </td>
              </tr>

              <tr>
                <td style={tdStyle}>Sick</td>
                <td style={tdStyle}>14-01-2026</td>
                <td style={tdStyle}>16-01-2026</td>
                <td style={tdStyle}>2 Days</td>
                <td style={tdStyle}>Family function</td>
                <td style={tdStyle}>
                  <span style={pendingBadge}>Pending</span>
                </td>
              </tr>

              <tr>
                <td style={tdStyle}>Earned</td>
                <td style={tdStyle}>15-01-2026</td>
                <td style={tdStyle}>19-01-2026</td>
                <td style={tdStyle}>3 Days</td>
                <td style={tdStyle}>Personal work</td>
                <td style={tdStyle}>
                  <span style={rejectedBadge}>Rejected</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

/* ---------- Styles ---------- */

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const cardTitle = {
  fontSize: "14px",
  color: "#777",
  marginBottom: "5px",
};

const cardValue = {
  margin: "5px 0",
};

const selectStyle = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "13px",
};

const chartPlaceholder = {
  height: "220px",
  background: "#f3f6fb",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#777",
};

const downloadBtn = {
  marginTop: "15px",
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#00bcd4",
  color: "#fff",
  cursor: "pointer",
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

const approvedBadge = {
  background: "#e8f5e9",
  color: "green",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

const pendingBadge = {
  background: "#fff3e0",
  color: "#ff9800",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

const rejectedBadge = {
  background: "#ffebee",
  color: "red",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
};

export default EmployeeDashboard;
