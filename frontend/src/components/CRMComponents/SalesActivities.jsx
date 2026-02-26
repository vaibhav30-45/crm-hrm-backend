import { useState } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import SalesActivityCard from "./SalesActivityCard";
import "../../styles/layout.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesActivities = () => {
  const [activities] = useState([
    {
      id: 1,
      date: "10 Jan 2026",
      activity: "Email Opened",
      customer: "Rahul Patel",
      status: "Completed",
    },
    {
      id: 2,
      date: "12 Jan 2026",
      activity: "Call Made",
      customer: "Neha Shah",
      status: "Completed",
    },
    {
      id: 3,
      date: "14 Jan 2026",
      activity: "Meeting Scheduled",
      customer: "Pooja Patel",
      status: "Pending",
    },
    {
      id: 4,
      date: "15 Jan 2026",
      activity: "Form Submitted",
      customer: "Amit Kumar",
      status: "Completed",
    },
    {
      id: 5,
      date: "16 Jan 2026",
      activity: "Follow-Up Call",
      customer: "Sneha Reddy",
      status: "In Progress",
    },
    {
      id: 6,
      date: "20 Jan 2026",
      activity: "Meeting Scheduled",
      customer: "Vikram Singh",
      status: "Pending",
    },
    {
      id: 7,
      date: "21 Jan 2026",
      activity: "Email Opened",
      customer: "Anjali Gupta",
      status: "Completed",
    },
    {
      id: 8,
      date: "22 Jan 2026",
      activity: "Call Made",
      customer: "Rajesh Kumar",
      status: "Completed",
    },
    {
      id: 9,
      date: "23 Jan 2026",
      activity: "Meeting Scheduled",
      customer: "Priya Sharma",
      status: "Pending",
    },
    {
      id: 10,
      date: "24 Jan 2026",
      activity: "Form Submitted",
      customer: "Karthik Nair",
      status: "In Progress",
    },
    {
      id: 11,
      date: "25 Jan 2026",
      activity: "Email Opened",
      customer: "Divya Menon",
      status: "Completed",
    },
    {
      id: 12,
      date: "26 Jan 2026",
      activity: "Call Made",
      customer: "Arjun Verma",
      status: "Completed",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesPerPage] = useState(6);

 
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = activities.slice(indexOfFirstActivity, indexOfLastActivity);
  const totalPages = Math.ceil(activities.length / activitiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const getBadgeStyle = (status) => {
    const styles = {
      Completed: { bg: "#ecfdf5", color: "#16a34a", border: "#bbf7d0" },
      Pending: { bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
      "In Progress": { bg: "#dbeafe", color: "#2563eb", border: "#93c5fd" },
    };

    return (
      styles[status] || {
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
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
          CRM / Sales Activities
        </h2>
       
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          <SalesActivityCard
            title="Calls"
            value="1,847"
            change="+18% this week"
            changeType="positive"
            icon="phone"
            color="#3b82f6"
          />

          <SalesActivityCard
            title="Emails"
            value="215"
            change="+12% last week"
            changeType="positive"
            icon="email"
            color="#22c55e"
          />

          <SalesActivityCard
            title="Whatsapp"
            value="423"
            change="+5% last week"
            changeType="positive"
            icon="whatsapp"
            color="#f59e0b"
          />

          <SalesActivityCard
            title="Meetings"
            value="190"
            change="-3% last week"
            changeType="negative"
            icon="calendar"
            color="#ec4899"
          />
        </div>

      
<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1.6fr", 
    gap: "24px",
    marginTop: "24px",
    alignItems: "stretch",
  }}
>
  
  <div
    style={{
      background: "#ffffff",
      borderRadius: "14px",
      padding: "20px",
      border: "1px solid #e5e7eb",
    }}
  >
    <h3
      style={{
        margin: "0 0 16px 0",
        fontSize: "16px",
        fontWeight: "600",
        color: "#111827",
      }}
    >
      Interaction Analysis
    </h3>

    <div style={{ height: "220px" }}>
      <Pie
        data={{
          labels: ["Calls", "Emails", "WhatsApp", "Meetings"],
          datasets: [
            {
              data: [38, 31, 18, 13],
              backgroundColor: [
                "#0ea5e9", 
                "#93c5fd", 
                "#38bdf8", 
                "#e0f2fe", 
              ],
              borderWidth: 0,
              cutout: "60%",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right", 
              labels: {
                boxWidth: 10,
                padding: 16,
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.label} ${context.parsed}%`;
                },
              },
            },
          },
        }}
      />
    </div>
  </div>

 
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    <h3
      style={{
        margin: "0",
        fontSize: "16px",
        fontWeight: "600",
        color: "#111827",
      }}
    >
      AI Enhancements
    </h3>

    <div
      style={{
        background: "#e0f2fe",
        borderRadius: "12px",
        padding: "18px",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: "14px" }}>
        Follow-Up Reminders
      </div>
      <div style={{ fontSize: "12px", color: "#475569", marginTop: "6px" }}>
        3 Scheduled reminders
      </div>
    </div>

  
    <div
      style={{
        background: "#fce7f3",
        borderRadius: "12px",
        padding: "18px",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: "14px" }}>
        Interaction Insights
      </div>
      <div style={{ fontSize: "12px", color: "#475569", marginTop: "6px" }}>
        120+ points analyzed
      </div>
    </div>
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
          
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f9fafb" }}>
              <tr>
                {[
                  "Date",
                  "Activity",
                  "Customer",
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
              {currentActivities.map((activity) => {
                const statusStyle = getBadgeStyle(activity.status);

                return (
                  <tr
                    key={activity.id}
                    style={{ borderBottom: "1px solid #f3f4f6" }}
                  >
                    <td style={{ padding: "14px 16px", color: "#6b7280" }}>
                      {activity.date}
                    </td>

                    <td style={{ padding: "14px 16px", fontWeight: 500 }}>
                      {activity.activity}
                    </td>

                    <td style={{ padding: "14px 16px", color: "#6b7280" }}>
                      {activity.customer}
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
                        {activity.status}
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

export default SalesActivities;
