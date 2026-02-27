import React, { useState } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";

const EmployeeSelfService = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const data = [
    {
      id: "EM-001",
      name: "Rahul Patidar",
      date: "10 Jan 2026",
      status: "Under View",
    },
    { id: "EM-002", name: "Neha Shah", date: "12 Jan 2026", status: "Pending" },
    {
      id: "EM-003",
      name: "Pooja Patel",
      date: "14 Jan 2026",
      status: "Approved",
    },
    {
      id: "EM-004",
      name: "Pooja Patel",
      date: "15 Jan 2026",
      status: "Approved",
    },
    {
      id: "EM-005",
      name: "Pooja Patel",
      date: "16 Jan 2026",
      status: "Escalated",
    },
    {
      id: "EM-006",
      name: "Riya Sharma",
      date: "20 Jan 2026",
      status: "Pending",
    },
  ];

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = data.slice(indexOfFirst, indexOfLast);

  return (
    <DashboardLayout>
      <div
        style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}
      >
        <h2 style={{ marginBottom: "20px" }}>HRMS / Employee Self-Service</h2>

        {/* Top Section */}
        <div style={topGrid}>
          {/* Left Cards */}
          <div style={{ display: "flex", gap: "20px" }}>
            <StatCard title="Outstanding" value="3" growth="+5.8% this week" />
            <StatCard title="Under Review" value="5" growth="+4% this week" />
          </div>

          {/* Auto Payroll Card */}
          <div style={card}>
            <h4 style={{ marginBottom: "15px" }}>Auto Payroll Processing</h4>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                "Apply Leave",
                "Punch In/Out",
                "Download Payslip",
                "Raise Request",
              ].map((btn, index) => (
                <button key={index} style={actionBtn}>
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
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
                <th style={th}>Rating</th>
                <th style={th}>Date</th>
                <th style={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((item, index) => (
                <tr key={index}>
                  <td style={td}>{item.id}</td>
                  <td style={td}>{item.name}</td>
                  <td style={{ ...td, color: "#0ea5e9", cursor: "pointer" }}>
                    View
                  </td>
                  <td style={td}>{item.date}</td>
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

const StatCard = ({ title, value, growth }) => (
  <div style={card}>
    <p style={{ fontSize: "14px", color: "#666" }}>{title}</p>
    <h3 style={{ margin: "5px 0" }}>{value}</h3>
    <p style={{ fontSize: "12px", color: "#28a745" }}>{growth}</p>
  </div>
);

/* Styles */

const topGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const actionBtn = {
  padding: "8px 12px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "#f8f9fb",
  cursor: "pointer",
  fontSize: "12px",
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

const pagination = {
  marginTop: "20px",
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

const getStatusStyle = (status) => {
  if (status === "Approved")
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

  if (status === "Under View")
    return {
      padding: "4px 10px",
      background: "#e3f2fd",
      color: "#0d6efd",
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

export default EmployeeSelfService;
