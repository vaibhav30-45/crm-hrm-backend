import React, { useState } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";

const EmployeesOnboarding = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const employees = [
    {
      id: "EM-001",
      name: "Rahul Patidar",
      dept: "IT",
      role: "Software Engineer",
      status: "Active",
    },
    {
      id: "EM-002",
      name: "Neha Shah",
      dept: "Human Resources",
      role: "HR",
      status: "Inactive",
    },
    {
      id: "EM-003",
      name: "Pooja Patel",
      dept: "Finance",
      role: "Accountant",
      status: "Inactive",
    },
    {
      id: "EM-004",
      name: "Pooja Patel",
      dept: "Sales",
      role: "Sales",
      status: "Active",
    },
    {
      id: "EM-005",
      name: "Pooja Patel",
      dept: "Sales",
      role: "Sales",
      status: "Active",
    },
    {
      id: "EM-006",
      name: "Riya Sharma",
      dept: "IT",
      role: "Software Engineer",
      status: "Inactive",
    },
    {
      id: "EM-007",
      name: "Karan Mehta",
      dept: "IT",
      role: "Developer",
      status: "Active",
    },
  ];

  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = employees.slice(indexOfFirst, indexOfLast);

  return (
    <DashboardLayout>
      <div
        style={{ padding: "20px", background: "#f5f6fa", minHeight: "100vh" }}
      >
        {/* Heading */}
        <h2 style={{ marginBottom: "20px" }}>HRMS / Employees Onboarding</h2>

        {/* Top Cards */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          {/* Card 1 */}
          <div style={cardStyle}>
            <h4>Digital Onboarding</h4>
            <p style={{ color: "#777", fontSize: "14px" }}>
              Streamline the new hire onboarding process with ease.
            </p>
            <ul style={{ fontSize: "14px", color: "#555" }}>
              <li>Automated onboarding checklists</li>
              <li>Employee document upload & verification</li>
              <li>Welcome emails & training modules</li>
            </ul>
            <button style={primaryBtn}>Start Onboarding</button>
          </div>

          {/* Card 2 */}
          <div style={cardStyle}>
            <h4>Digital Onboarding</h4>

            <table
              style={{ width: "100%", fontSize: "14px", marginBottom: "10px" }}
            >
              <tbody>
                <tr>
                  <td>Basic Salary</td>
                  <td style={{ textAlign: "right" }}>25,000</td>
                </tr>
                <tr>
                  <td>House Rent Allowance (HRV)</td>
                  <td style={{ textAlign: "right" }}>10,000</td>
                </tr>
                <tr>
                  <td>Provident Fund (PF)</td>
                  <td style={{ textAlign: "right" }}>1,800</td>
                </tr>
              </tbody>
            </table>

            <button style={primaryBtn}>Manage Salary Structure</button>
          </div>
        </div>

        {/* Employee Table */}
        <div style={tableCard}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f9fb", textAlign: "left" }}>
                <th style={thStyle}>Employee ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.map((emp, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{emp.id}</td>
                  <td style={tdStyle}>{emp.name}</td>
                  <td style={tdStyle}>{emp.dept}</td>
                  <td style={tdStyle}>{emp.role}</td>
                  <td style={tdStyle}>
                    <span
                      style={
                        emp.status === "Active" ? activeBadge : inactiveBadge
                      }
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td style={tdStyle}>⋯</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={paginationContainer}>
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

/* Styles */

const cardStyle = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const tableCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const primaryBtn = {
  marginTop: "10px",
  padding: "8px 14px",
  borderRadius: "6px",
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

const activeBadge = {
  padding: "4px 10px",
  borderRadius: "20px",
  background: "#e8f5e9",
  color: "green",
  fontSize: "12px",
};

const inactiveBadge = {
  padding: "4px 10px",
  borderRadius: "20px",
  background: "#ffebee",
  color: "red",
  fontSize: "12px",
};

const paginationContainer = {
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

export default EmployeesOnboarding;
