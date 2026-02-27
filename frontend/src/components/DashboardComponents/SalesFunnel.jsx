// components/SalesFunnel.jsx
import React from "react";

export default function SalesFunnel() {
  const funnel = [
    { label: "Emails", value: "25K" },
    { label: "Visits", value: "21.3K" },
    { label: "Login", value: "12.9K" },
    { label: "Purchases", value: "7.5K" },
    { label: "Payments", value: "5.1K" },
  ];

  return (
    <div className="chart-card">
      <h3>Sales Funnel</h3>
      <div className="funnel">
        {funnel.map((item, i) => (
          <div key={i} className="funnel-step">
            <strong>{item.value}</strong>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
