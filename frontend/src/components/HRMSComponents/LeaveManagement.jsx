import React, { useState } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";

const LeaveManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const leaveData = [
    {
      id: "EM-001",
      name: "Rahul Patidar",
      date: "10 Jan 2026",
      type: "Sick Leave",
      duration: "2 Days Ago",
      status: "Approve",
    },
    {
      id: "EM-002",
      name: "Neha Shah",
      date: "12 Jan 2026",
      type: "Emergency Leave",
      duration: "1 Day Ago",
      status: "Pending",
    },
    {
      id: "EM-003",
      name: "Pooja Patel",
      date: "14 Jan 2026",
      type: "Casual Leave",
      duration: "4 Days Ago",
      status: "Reject",
    },
    {
      id: "EM-004",
      name: "Pooja Patel",
      date: "15 Jan 2026",
      type: "Casual Leave",
      duration: "5 Days Ago",
      status: "Approve",
    },
    {
      id: "EM-005",
      name: "Pooja Patel",
      date: "16 Jan 2026",
      type: "Half Day Leave",
      duration: "Half Day",
      status: "Approve",
    },
    {
      id: "EM-006",
      name: "Riya Sharma",
      date: "20 Jan 2026",
      type: "Casual Leave",
      duration: "3 Days Ago",
      status: "Reject",
    },
  ];

  const totalPages = Math.ceil(leaveData.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = leaveData.slice(indexOfFirst, indexOfLast);

  return (
    <DashboardLayout>
      <div
        style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}
      >
        <h2 style={{ marginBottom: "20px" }}>HRMS / Leave Management</h2>

        {/* Top Section */}
        <div style={topGrid}>
          {/* Left Stats */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <StatCard
              title="New Requests"
              value="12"
              growth="+5.8% this week"
              color="green"
            />
            <StatCard
              title="Pending"
              value="8"
              growth="-3.4% this week"
              color="red"
            />
            <StatCard
              title="Approved"
              value="32"
              growth="+3.4% this week"
              color="green"
            />
          </div>

          {/* AI Recommendation */}
          <div style={card}>
            <h4 style={{ marginBottom: "10px" }}>AI Recommendation</h4>

            <p
              style={{
                fontSize: "13px",
                color: "#777",
                marginBottom: "15px",
                lineHeight: "20px",
              }}
            >
              AI-powered leave approval suggestions based on employee behavior
              and leave history.
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                "Rajesh Kumar",
                "Rajesh Kumar",
                "Rajesh Kumar",
                "Rajesh Kumar",
              ].map((name, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    background: "#f8f9fb",
                    borderRadius: "8px",
                  }}
                >
                  <div>
                    <p
                      style={{ margin: 0, fontSize: "14px", fontWeight: "500" }}
                    >
                      {name}
                    </p>
                    <span style={{ fontSize: "12px", color: "#666" }}>
                      3 Days Leave
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#28a745",
                      background: "#e8f5e9",
                      padding: "4px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    Recommended
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "15px", textAlign: "right" }}>
              <button style={primaryBtn}>Review</button>
            </div>
          </div>
        </div>

        {/* Leave Table */}
        <div style={{ ...card, marginTop: "20px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr style={{ background: "#f1f3f6" }}>
                <th style={th}>Employee ID</th>
                <th style={th}>Name</th>
                <th style={th}>Date</th>
                <th style={th}>Leave Type</th>
                <th style={th}>Request Duration</th>
                <th style={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((item, index) => (
                <tr key={index}>
                  <td style={td}>{item.id}</td>
                  <td style={td}>{item.name}</td>
                  <td style={td}>{item.date}</td>
                  <td style={td}>{item.type}</td>
                  <td style={td}>{item.duration}</td>
                  <td style={td}>
                    <span style={getStatusStyle(item.status)}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={pagination}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              style={pageBtn}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                style={{
                  ...pageBtn,
                  background: currentPage === num ? "#00bcd4" : "#fff",
                  color: currentPage === num ? "#fff" : "#000",
                }}
              >
                {num}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              style={pageBtn}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

/* Components */

const StatCard = ({ title, value, growth, color }) => (
  <div style={card}>
    <p style={{ fontSize: "14px", color: "#666" }}>{title}</p>
    <h3 style={{ margin: "5px 0" }}>{value}</h3>
    <p style={{ fontSize: "12px", color }}>{growth}</p>
  </div>
);

/* Styles */

const topGrid = {
  display: "grid",
  gridTemplateColumns: "250px 1fr",
  gap: "20px",
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const primaryBtn = {
  padding: "8px 14px",
  background: "#00bcd4",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
};

const th = {
  padding: "10px",
  textAlign: "left",
  color: "#666",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #eee",
};

const getStatusStyle = (status) => {
  if (status === "Approve")
    return {
      padding: "4px 10px",
      background: "#e8f5e9",
      color: "green",
      borderRadius: "20px",
      fontSize: "12px",
    };
  if (status === "Pending")
    return {
      padding: "4px 10px",
      background: "#fff3cd",
      color: "#856404",
      borderRadius: "20px",
      fontSize: "12px",
    };
  return {
    padding: "4px 10px",
    background: "#ffebee",
    color: "red",
    borderRadius: "20px",
    fontSize: "12px",
  };
};

const pagination = {
  marginTop: "15px",
  display: "flex",
  justifyContent: "center",
  gap: "8px",
};

const pageBtn = {
  padding: "6px 12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};

export default LeaveManagement;
