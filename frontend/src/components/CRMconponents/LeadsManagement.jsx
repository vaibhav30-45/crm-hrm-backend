import { useState } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import "../../styles/layout.css";

const LeadsManagement = () => {
  const [leads] = useState([
    {
      id: 1,
      leadName: "Rahul Patel",
      activity: "Email Opened",
      date: "10 Jan 2026",
      consentStatus: "Opted In",
      status: "Compliant",
    },
    {
      id: 2,
      leadName: "Neha Shah",
      activity: "Call Made",
      date: "12 Jan 2026",
      consentStatus: "Awaiting Response",
      status: "Pending",
    },
    {
      id: 3,
      leadName: "Pooja Patel",
      activity: "Meeting Scheduled",
      date: "14 Jan 2026",
      consentStatus: "No Consent",
      status: "Non-Compliant",
    },
    {
      id: 4,
      leadName: "Pooja Patel",
      activity: "Form Submitted",
      date: "15 Jan 2026",
      consentStatus: "Awaiting Response",
      status: "Pending",
    },
    {
      id: 5,
      leadName: "Pooja Patel",
      activity: "Follow-Up Call",
      date: "16 Jan 2026",
      consentStatus: "Opted In",
      status: "Compliant",
    },
    {
      id: 6,
      leadName: "Riya Sharma",
      activity: "Meeting Scheduled",
      date: "20 Jan 2026",
      consentStatus: "No Consent",
      status: "Non-Compliant",
    },
    {
      id: 7,
      leadName: "Amit Kumar",
      activity: "Email Opened",
      date: "21 Jan 2026",
      consentStatus: "Opted In",
      status: "Compliant",
    },
    {
      id: 8,
      leadName: "Sneha Reddy",
      activity: "Call Made",
      date: "22 Jan 2026",
      consentStatus: "Awaiting Response",
      status: "Pending",
    },
    {
      id: 9,
      leadName: "Vikram Singh",
      activity: "Meeting Scheduled",
      date: "23 Jan 2026",
      consentStatus: "Opted In",
      status: "Compliant",
    },
    {
      id: 10,
      leadName: "Anjali Gupta",
      activity: "Form Submitted",
      date: "24 Jan 2026",
      consentStatus: "No Consent",
      status: "Non-Compliant",
    },
    {
      id: 11,
      leadName: "Rajesh Kumar",
      activity: "Email Opened",
      date: "25 Jan 2026",
      consentStatus: "Awaiting Response",
      status: "Pending",
    },
    {
      id: 12,
      leadName: "Priya Sharma",
      activity: "Call Made",
      date: "26 Jan 2026",
      consentStatus: "Opted In",
      status: "Compliant",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(6);

  // Pagination logic
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const getBadgeStyle = (value) => {
    const styles = {
      Compliant: { bg: "#ecfdf5", color: "#16a34a", border: "#bbf7d0" },
      Pending: { bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
      "Non-Compliant": { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },

      "Opted In": { bg: "#ecfdf5", color: "#16a34a", border: "#bbf7d0" },
      "Awaiting Response": { bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
      "No Consent": { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" },
    };

    return (
      styles[value] || {
        bg: "#f3f4f6",
        color: "#6b7280",
        border: "#e5e7eb",
      }
    );
  };

  return (
    <DashboardLayout>
      <div
        style={{
          padding: "24px",
          backgroundColor: "#f3f4f6",
          minHeight: "100vh",
        }}
      >
        {/* STATS CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#6b7280",
                }}
              >
                Total Leads
              </h3>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "#dbeafe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "20px", color: "#3b82f6" }}>👥</span>
              </div>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              2,543
            </p>
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "12px",
                color: "#059669",
                fontWeight: "500",
              }}
            >
              +12% from last month
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#6b7280",
                }}
              >
                New Leads
              </h3>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "#dcfce7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "20px", color: "#22c55e" }}>✨</span>
              </div>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              843
            </p>
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "12px",
                color: "#059669",
                fontWeight: "500",
              }}
            >
              +8% from last month
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#6b7280",
                }}
              >
                Conversion Rate
              </h3>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "#fef3c7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "20px", color: "#f59e0b" }}>📈</span>
              </div>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              68.2%
            </p>
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "12px",
                color: "#059669",
                fontWeight: "500",
              }}
            >
              +4.5% from last month
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#6b7280",
                }}
              >
                Active Leads
              </h3>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "#fce7f3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "20px", color: "#ec4899" }}>⚡</span>
              </div>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "32px",
                fontWeight: "700",
                color: "#111827",
              }}
            >
              1,293
            </p>
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "12px",
                color: "#dc2626",
                fontWeight: "500",
              }}
            >
              -2% from last month
            </p>
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          {/* TABLE */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f9fafb" }}>
              <tr>
                {[
                  "Lead Name",
                  "Activity",
                  "Date",
                  "Consents Status",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#6b7280",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentLeads.map((lead) => {
                const consentStyle = getBadgeStyle(lead.consentStatus);
                const statusStyle = getBadgeStyle(lead.status);

                return (
                  <tr
                    key={lead.id}
                    style={{ borderBottom: "1px solid #f3f4f6" }}
                  >
                    <td style={{ padding: "14px 16px", fontWeight: 500 }}>
                      {lead.leadName}
                    </td>

                    <td style={{ padding: "14px 16px", color: "#6b7280" }}>
                      {lead.activity}
                    </td>

                    <td style={{ padding: "14px 16px", color: "#6b7280" }}>
                      {lead.date}
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          fontSize: "12px",
                          borderRadius: "6px",
                          background: consentStyle.bg,
                          color: consentStyle.color,
                          border: `1px solid ${consentStyle.border}`,
                          fontWeight: 500,
                        }}
                      >
                        {lead.consentStatus}
                      </span>
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          fontSize: "12px",
                          borderRadius: "6px",
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          border: `1px solid ${statusStyle.border}`,
                          fontWeight: 500,
                        }}
                      >
                        {lead.status}
                      </span>
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          fontSize: "18px",
                          cursor: "pointer",
                          color: "#9ca3af",
                        }}
                      >
                        ⋯
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
              background: "#f9fafb",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                fontSize: "13px",
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              Previous
            </button>

            <div style={{ display: "flex", gap: "6px" }}>
              {(() => {
                const pages = [];
                const maxVisiblePages = 5;
                
                if (totalPages <= maxVisiblePages) {
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  if (currentPage <= 3) {
                    for (let i = 1; i <= 4; i++) {
                      pages.push(i);
                    }
                    pages.push('...');
                    pages.push(totalPages);
                  } else if (currentPage >= totalPages - 2) {
                    pages.push(1);
                    pages.push('...');
                    for (let i = totalPages - 3; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    pages.push(1);
                    pages.push('...');
                    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                      pages.push(i);
                    }
                    pages.push('...');
                    pages.push(totalPages);
                  }
                }
                
                return pages.map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} style={{ 
                      padding: '8px 4px',
                      color: '#64748b',
                      fontSize: '14px'
                    }}>
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      style={{
                        minWidth: "32px",
                        height: "32px",
                        borderRadius: "6px",
                        border:
                          page === currentPage
                            ? "1px solid #0ea5e9"
                            : "1px solid #e5e7eb",
                        background: page === currentPage ? "#e0f2fe" : "#ffffff",
                        fontSize: "13px",
                        cursor: "pointer",
                        color: page === currentPage ? "#0ea5e9" : "#374151",
                        fontWeight: page === currentPage ? "500" : "400",
                      }}
                    >
                      {page}
                    </button>
                  )
                ));
              })()}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                fontSize: "13px",
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeadsManagement;
