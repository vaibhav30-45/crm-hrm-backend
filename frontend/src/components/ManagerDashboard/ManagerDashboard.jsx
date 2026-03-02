import React from "react";
import DashboardLayout from "../DashboardComponents/DashboardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from "recharts";

const ManagerDashboard = () => {

  // Attendance Data
  const attendanceData = [
    { day: "Mon", present: 70, absent: 30 },
    { day: "Tue", present: 80, absent: 20 },
    { day: "Wed", present: 75, absent: 25 },
    { day: "Thu", present: 85, absent: 15 },
    { day: "Fri", present: 72, absent: 28 },
    { day: "Sat", present: 78, absent: 22 },
    { day: "Sun", present: 74, absent: 26 }
  ];

  // Earnings Data
  const earningsData = [
    { day: "Mon", earning: 40 },
    { day: "Tue", earning: 65 },
    { day: "Wed", earning: 60 },
    { day: "Thu", earning: 70 },
    { day: "Fri", earning: 62 }
  ];

  return (
    <DashboardLayout>
      <div style={{ padding: "20px", background: "#f5f7fa", minHeight: "100vh" }}>
        
        <h2 style={{ marginBottom: "20px", fontWeight: "600" }}>Dashboard</h2>

        {/* Top Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          
          {[
            { title: "Team Members", value: "12", sub: "+8% last month" },
            { title: "Present/Absent Today", value: "8 / 12", sub: "+5.2% attendance today" },
            { title: "Pending Approvals", value: "5", sub: "-12% last week" },
            { title: "Team Leads / Tasks", value: "15", sub: "+6.4% task increase" }
          ].map((card, index) => (
            <div key={index} style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
            }}>
              <h4 style={{ marginBottom: "10px", color: "#555" }}>{card.title}</h4>
              <h2 style={{ marginBottom: "5px" }}>{card.value}</h2>
              <p style={{ fontSize: "13px", color: "#4caf50" }}>{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginTop: "20px" }}>
          
          {/* Attendance Chart */}
          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <h4>Attendance Statistic</h4>

            <div style={{ height: "250px", marginTop: "15px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="present" stroke="#4caf50" strokeWidth={3} />
                  <Line type="monotone" dataKey="absent" stroke="#f44336" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Earnings Chart */}
          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <h4>Total Earnings</h4>

            <div style={{ height: "250px", marginTop: "15px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="earning"
                    stroke="#2196f3"
                    fill="#bbdefb"
                    strokeWidth={3}
                  />
                </AreaChart> 
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Tables Section */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
          
          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <h4 style={{ marginBottom: "15px" }}>Team Leads & Tasks</h4>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", fontSize: "14px", color: "#777" }}>
                  <th>Lead Name</th>
                  <th>Task</th>
                  <th>Progress</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Rahul Patidar", task: "UI Review", progress: "65%", status: "Completed" },
                  { name: "Neha Shah", task: "API Integration", progress: "20%", status: "In Progress" },
                  { name: "Pooja Patel", task: "Testing", progress: "100%", status: "Pending" },
                  { name: "Riya Sharma", task: "Bug Fixing", progress: "45%", status: "Pending" }
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop: "1px solid #eee", fontSize: "14px" }}>
                    <td style={{ padding: "10px 0" }}>{row.name}</td>
                    <td>{row.task}</td>
                    <td>{row.progress}</td>
                    <td>
                      <span style={{
                        padding: "5px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        background:
                          row.status === "Completed"
                            ? "#e8f5e9"
                            : row.status === "In Progress"
                            ? "#e3f2fd"
                            : "#fff3e0",
                        color:
                          row.status === "Completed"
                            ? "#2e7d32"
                            : row.status === "In Progress"
                            ? "#1565c0"
                            : "#ef6c00"
                      }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <h4>Pending Approvals</h4>
            <p style={{ color: "#777" }}>Leave, Expense & Shift requests pending...</p>
          </div>

        </div>

        {/* Alerts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
          
          <div style={{
            background: "#fff8e1",
            padding: "15px",
            borderRadius: "10px"
          }}>
            <h4>Low Productivity Alert</h4>
            <p style={{ fontSize: "14px" }}>Priya's performance is below target.</p>
          </div>

          <div style={{
            background: "#fdecea",
            padding: "15px",
            borderRadius: "10px"
          }}>
            <h4>Team Risk Alert</h4>
            <p style={{ fontSize: "14px" }}>High churn risk detected in sales team!</p>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;