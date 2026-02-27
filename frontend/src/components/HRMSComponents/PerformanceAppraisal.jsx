import React, { useState } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";

const PerformanceAppraisal = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const data = [
    {
      id: "EM-001",
      name: "Rahul Patidar",
      score: "₹ 8,500",
      rating: "Excellent",
      review: "10 Jan 2026",
      status: "Completed",
    },
    {
      id: "EM-002",
      name: "Neha Shah",
      score: "₹ 7,500",
      rating: "Good",
      review: "12 Jan 2026",
      status: "Overdue",
    },
    {
      id: "EM-003",
      name: "Pooja Patel",
      score: "₹ 6,500",
      rating: "Average",
      review: "14 Jan 2026",
      status: "Completed",
    },
    {
      id: "EM-004",
      name: "Pooja Patel",
      score: "₹ 2,500",
      rating: "Overdue",
      review: "15 Jan 2026",
      status: "Overdue",
    },
    {
      id: "EM-005",
      name: "Pooja Patel",
      score: "₹ 3,500",
      rating: "Below Average",
      review: "16 Jan 2026",
      status: "Completed",
    },
    {
      id: "EM-006",
      name: "Riya Sharma",
      score: "₹ 4,500",
      rating: "Excellent",
      review: "20 Jan 2026",
      status: "Overdue",
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
        <h2 style={{ marginBottom: "20px" }}>HRMS / Performance & Appraisal</h2>

        {/* Top Cards */}
        <div style={topCards}>
          <StatCard
            title="Total Employee"
            value="186"
            growth="+5.8% this week"
          />
          <StatCard
            title="Reviews Completed"
            value="93"
            growth="+5.1% last cycle"
          />
          <StatCard
            title="Pending Reviews"
            value="27"
            growth="-3.4% last cycle"
          />
          <StatCard
            title="High Performance"
            value="42"
            growth="+4% last cycle"
          />
        </div>

        {/* Table Card */}
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
                <th style={th}>Score</th>
                <th style={th}>Rating</th>
                <th style={th}>Next Review</th>
                <th style={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((item, index) => (
                <tr key={index}>
                  <td style={td}>{item.id}</td>
                  <td style={td}>{item.name}</td>
                  <td style={td}>{item.score}</td>
                  <td style={td}>
                    <span style={getRatingStyle(item.rating)}>
                      {item.rating}
                    </span>
                  </td>
                  <td style={td}>{item.review}</td>
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

const topCards = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
  if (status === "Completed")
    return {
      padding: "4px 10px",
      background: "#e8f5e9",
      color: "green",
      borderRadius: "20px",
      fontSize: "12px",
    };

  return {
    padding: "4px 10px",
    background: "#fff3cd",
    color: "#856404",
    borderRadius: "20px",
    fontSize: "12px",
  };
};

const getRatingStyle = (rating) => {
  if (rating === "Excellent") return { color: "green", fontWeight: "500" };
  if (rating === "Good") return { color: "#0d6efd", fontWeight: "500" };
  if (rating === "Average") return { color: "#f39c12", fontWeight: "500" };
  return { color: "red", fontWeight: "500" };
};

export default PerformanceAppraisal;
