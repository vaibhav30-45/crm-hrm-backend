import React, { useState } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";

const PayrollManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const payrollData = [
    {
      id: "EM-001",
      name: "Rahul Patidar",
      base: "₹20,500",
      deduct: "₹5,500",
      net: "₹50,500",
      date: "10 Jan 2026",
      status: "Approve",
    },
    {
      id: "EM-002",
      name: "Neha Shah",
      base: "₹25,500",
      deduct: "₹5,500",
      net: "₹60,500",
      date: "12 Jan 2026",
      status: "Pending",
    },
    {
      id: "EM-003",
      name: "Pooja Patel",
      base: "₹15,500",
      deduct: "₹1,500",
      net: "₹30,500",
      date: "14 Jan 2026",
      status: "Reject",
    },
    {
      id: "EM-004",
      name: "Pooja Patel",
      base: "₹26,500",
      deduct: "₹2,500",
      net: "₹50,500",
      date: "15 Jan 2026",
      status: "Approve",
    },
    {
      id: "EM-005",
      name: "Pooja Patel",
      base: "₹20,500",
      deduct: "₹3,500",
      net: "₹80,500",
      date: "18 Jan 2026",
      status: "Approve",
    },
  ];

  // Pagination Logic
  const totalPages = Math.ceil(payrollData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = payrollData.slice(indexOfFirst, indexOfLast);

  return (
    <DashboardLayout>
      <div
        style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}
      >
        <h2 style={{ marginBottom: "20px" }}>HRMS / Payroll Management</h2>

        {/* Top Stats */}
        <div style={statsGrid}>
          <StatCard
            title="Total Payroll"
            value="12"
            growth="+6.6% last month"
          />
          <StatCard title="Disbursed" value="8" growth="+5.5% last month" />
          <StatCard
            title="Employees Paid"
            value="24"
            growth="+4.3% last month"
          />
        </div>

        {/* Middle Section */}
        <div style={middleGrid}>
          {/* Left */}
          <div>
            <div style={card}>
              <h4>Auto Payroll Processing</h4>
              <ul style={{ fontSize: "14px", color: "#666" }}>
                <li>Automatic salary calculation & processing</li>
                <li>Tax deductions, PF, ESI calculations</li>
                <li>Generate & distribute payslips</li>
              </ul>
              <button style={primaryBtn}>Run Payroll</button>
            </div>

            <div style={{ ...card, marginTop: "20px" }}>
              <h4>AI Anomaly Detection</h4>
              <p style={{ fontSize: "14px", color: "#666" }}>
                AI-powered system to detect payroll fraud and mistakes.
              </p>
              <p style={{ fontSize: "14px", color: "red" }}>
                Suspected Fraud: 3 detected this month
              </p>
              <p style={{ fontSize: "14px", color: "#555" }}>
                Payroll Mistakes: 3 detected this month
              </p>
            </div>
          </div>

          {/* Right */}
          <div style={card}>
            <h4>Anomalies detected</h4>

            <table
              style={{
                width: "100%",
                fontSize: "14px",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ background: "#f1f3f6" }}>
                  <th style={th}>Employee</th>
                  <th style={th}>Type</th>
                  <th style={th}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={td}>Rahul Patidar</td>
                  <td style={td}>Suspected Fraud</td>
                  <td style={td}>
                    <span style={reviewBtn}>Review</span>
                  </td>
                </tr>
                <tr>
                  <td style={td}>Neha Shah</td>
                  <td style={td}>Payroll Mistakes</td>
                  <td style={td}>
                    <span style={reviewBtn}>Review</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Payroll Table */}
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
                <th style={th}>Base Salary</th>
                <th style={th}>Deductions</th>
                <th style={th}>Net Salary</th>
                <th style={th}>Paid Date</th>
                <th style={th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item, index) => (
                <tr key={index}>
                  <td style={td}>{item.id}</td>
                  <td style={td}>{item.name}</td>
                  <td style={td}>{item.base}</td>
                  <td style={td}>{item.deduct}</td>
                  <td style={td}>{item.net}</td>
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

          {/* Working Pagination */}
          <div style={pagination}>
            <button
              style={{ ...pageBtn, opacity: currentPage === 1 ? 0.5 : 1 }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                style={{
                  ...pageBtn,
                  background: currentPage === index + 1 ? "#00bcd4" : "#fff",
                  color: currentPage === index + 1 ? "#fff" : "#000",
                }}
              >
                {index + 1}
              </button>
            ))}

            <button
              style={{
                ...pageBtn,
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
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
    <p style={{ fontSize: "12px", color: "green" }}>{growth}</p>
  </div>
);

/* Styles */

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "20px",
};

const middleGrid = {
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

const primaryBtn = {
  marginTop: "10px",
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

const reviewBtn = {
  padding: "4px 10px",
  background: "#e8f5e9",
  color: "green",
  borderRadius: "20px",
  fontSize: "12px",
  cursor: "pointer",
};

const getStatusStyle = (status) => {
  if (status === "Approve") return { ...reviewBtn };
  if (status === "Pending")
    return { ...reviewBtn, background: "#fff3cd", color: "#856404" };
  return { ...reviewBtn, background: "#ffebee", color: "red" };
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

export default PayrollManagement;
