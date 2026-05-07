import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import { crmService } from "../../services/crmService";

const SalesDashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    wonDeals: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await crmService.reports.getDashboardStats();
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Leads", value: stats.totalLeads, growth: "+0%", icon: "👥" },
    { title: "Closed Won Deals", value: stats.wonDeals, growth: "+0%", icon: "✅" },
    { title: "Total Revenue", value: `₹${stats.revenue.toLocaleString()}`, growth: "+0%", icon: "💰" },
    { title: "Avg Deal Value", value: `₹${stats.wonDeals > 0 ? (stats.revenue / stats.wonDeals).toLocaleString() : 0}`, growth: "+0%", icon: "📈" },
  ];

  const tableData = [
    { name: "Rahul", owner: "Arjun", delay: "2h Late", priority: "Cold", status: "Open" },
    { name: "Neha", owner: "Neha", delay: "1 Day", priority: "Hot", status: "Open" },
    { name: "Pooja", owner: "Pooja", delay: "3 Days", priority: "Hot", status: "Open" },
    { name: "Riya", owner: "Rahul", delay: "5 Days", priority: "Warm", status: "Pending" },
  ];

  const aiItems = [
    "Lead Priority Suggestions",
    "Deal Close Probability",
    "Best Time to Connect",
    "Auto Follow-Up Reminders",
    "Predicted Deal Value",
  ];

  return (
    <DashboardLayout>
      <div style={container}>
        <h2 style={{ marginBottom: "20px", color: "#1e293b", fontWeight: "600" }}>Sales Dashboard</h2>

        {/* Top Cards */}
        <div style={flexRow}>
          {cards.map((card, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <p style={{ color: "#64748b", fontSize: "14px", fontWeight: "500" }}>{card.title}</p>
                  <h2 style={{ margin: "10px 0", color: "#0f172a" }}>{card.value}</h2>
                </div>
                <span style={{ fontSize: "24px" }}>{card.icon}</span>
              </div>
              <p
                style={{
                  color: card.growth.includes("-") ? "#ef4444" : "#10b981",
                  fontSize: "13px",
                  fontWeight: "500"
                }}
              >
                {card.growth} last month
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={flexRow}>
          <div style={{ ...cardStyle, flex: 2 }}>
            <h3 style={{ color: "#1e293b", fontSize: "16px" }}>Monthly Revenue</h3>
            <div style={chartBox}>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#64748b" }}>Revenue chart placeholder</p>
                <h4 style={{ color: "#0ea5e9" }}>₹{stats.revenue.toLocaleString()}</h4>
              </div>
            </div>
          </div>

          <div style={{ ...cardStyle, flex: 2 }}>
            <h3 style={{ color: "#1e293b", fontSize: "16px" }}>Sales Funnel</h3>
            <div style={chartBox}>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#64748b" }}>Funnel visualization</p>
                <p style={{ fontSize: "12px" }}>Leads: {stats.totalLeads} → Deals: {stats.wonDeals}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={flexRow}>
          <div style={{ ...cardStyle, flex: 3 }}>
            <h3 style={{ color: "#1e293b", fontSize: "16px", marginBottom: "15px" }}>Recent Follow-Ups</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <th align="left" style={thStyle}>Lead</th>
                  <th align="left" style={thStyle}>Owner</th>
                  <th align="left" style={thStyle}>Missed</th>
                  <th align="left" style={thStyle}>Priority</th>
                  <th align="left" style={thStyle}>Status</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f8fafc" }}>
                    <td style={tdStyle}>{row.name}</td>
                    <td style={tdStyle}>{row.owner}</td>
                    <td style={tdStyle}>{row.delay}</td>
                    <td style={tdStyle}>
                      <span style={{ 
                        padding: "4px 8px", 
                        borderRadius: "4px", 
                        fontSize: "12px",
                        background: row.priority === "Hot" ? "#fee2e2" : "#fef3c7",
                        color: row.priority === "Hot" ? "#ef4444" : "#d97706"
                      }}>
                        {row.priority}
                      </span>
                    </td>
                    <td style={tdStyle}>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ ...cardStyle, flex: 1 }}>
            <h3 style={{ color: "#1e293b", fontSize: "16px", marginBottom: "10px" }}>AI Intelligence</h3>
            {aiItems.map((item, i) => (
              <div key={i} style={aiBox}>
                <span style={{ marginRight: "10px" }}>✨</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const thStyle = { padding: "12px 8px", color: "#64748b", fontSize: "13px", fontWeight: "600" };
const tdStyle = { padding: "12px 8px", color: "#334155", fontSize: "14px" };

/* Styles */

const container = {
  padding: "20px",
  background: "#f4f6f9",
  minHeight: "100vh",
};

const flexRow = {
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
};

const cardStyle = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const chartBox = {
  height: "200px",
  marginTop: "10px",
  background: "#e0f2fe",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const aiBox = {
  padding: "10px",
  border: "1px solid #eee",
  borderRadius: "6px",
  marginTop: "10px",
};

export default SalesDashboard;