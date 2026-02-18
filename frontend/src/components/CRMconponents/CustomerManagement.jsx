import { useState } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";

const CustomerManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const customers = [
    {
      company: "Acme Corp",
      renewal: "78% Likely to Renew",
      health: "8.9 Excellent",
      lastInteraction: "2 Days Ago",
      churn: "Low",
    },
    {
      company: "Beta Solution",
      renewal: "65% Moderate",
      health: "7.4 Good",
      lastInteraction: "4 Days Ago",
      churn: "High",
    },
    {
      company: "Global Tech",
      renewal: "85% Very Likely",
      health: "9.2 Strong",
      lastInteraction: "Today",
      churn: "High",
    },
    {
      company: "Innovatech INC",
      renewal: "58% At Risk",
      health: "6.5 Fair",
      lastInteraction: "5 Days Ago",
      churn: "Low",
    },
    {
      company: "Starlight Media",
      renewal: "90% Very Likely",
      health: "8.5 Good",
      lastInteraction: "1 Week Ago",
      churn: "Low",
    },
    {
      company: "Global Tech",
      renewal: "80% Moderate",
      health: "9.0 Excellent",
      lastInteraction: "3 Days Ago",
      churn: "Medium",
    },
    {
      company: "Tech Solutions",
      renewal: "72% Likely to Renew",
      health: "8.1 Good",
      lastInteraction: "1 Day Ago",
      churn: "Low",
    },
    {
      company: "Digital Innovations",
      renewal: "88% Very Likely",
      health: "9.5 Excellent",
      lastInteraction: "2 Days Ago",
      churn: "Medium",
    },
    {
      company: "Smart Systems",
      renewal: "45% At Risk",
      health: "5.8 Poor",
      lastInteraction: "1 Week Ago",
      churn: "High",
    },
    {
      company: "Future Tech",
      renewal: "92% Very Likely",
      health: "9.8 Excellent",
      lastInteraction: "Today",
      churn: "Low",
    },
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const getChurnColor = (value) => {
    if (value === "Low") return "#16a34a";
    if (value === "Medium") return "#f97316";
    if (value === "High") return "#dc2626";
    return "#6b7280";
  };

  return (
    <DashboardLayout>
      <div style={{ padding: "24px", background: "#f3f4f6", minHeight: "100vh" }}>
        
       
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
          CRM / Customer Management
        </h2>

     
        <div
          style={{
            background: "#ffffff",
            padding: "16px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          {["CRM Insights", "Support Insights", "Finance Insights"].map(
            (btn, index) => (
              <button
                key={index}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                {btn} ▾
              </button>
            )
          )}
        </div>

       
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f9fafb" }}>
              <tr>
                {[
                  "Company",
                  "Renewal Probability",
                  "Health Score",
                  "Last Interaction",
                  "Churn Risk",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: 600,
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
              {currentItems.map((item, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "14px 16px", fontWeight: 500 }}>
                    {item.company}
                  </td>

                  <td style={{ padding: "14px 16px", color: "#6b7280" }}>
                    {item.renewal}
                  </td>

                  <td style={{ padding: "14px 16px", color: "#6b7280" }}>
                    {item.health}
                  </td>

                  <td style={{ padding: "14px 16px", color: "#6b7280" }}>
                    {item.lastInteraction}
                  </td>

                  <td
                    style={{
                      padding: "14px 16px",
                      fontWeight: 500,
                      color: getChurnColor(item.churn),
                    }}
                  >
                    {item.churn}
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
              ))}
            </tbody>
          </table>

        
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

export default CustomerManagement;
