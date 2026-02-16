// components/MonthlyRevenueChart.jsx
import React from "react";

export default function MonthlyRevenueChart() {
  const data = [9500, 10200, 10000, 10800, 11200, 12540, 12100, 13000, 14800];

  const labels = [
    "Sep 1",
    "Sep 5",
    "Sep 9",
    "Sep 13",
    "Sep 17",
    "Sep 21",
    "Sep 25",
    "Sep 29",
    "Sep 30",
  ];

  const maxValue = 15000;
  const minValue = 8000;
  const chartHeight = 220;
  const chartWidth = 650;
  const stepX = chartWidth / (data.length - 1);

  const points = data
    .map((value, index) => {
      const x = index * stepX;
      const y =
        chartHeight -
        ((value - minValue) / (maxValue - minValue)) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  const highlightIndex = 5;
  const highlightX = highlightIndex * stepX;
  const highlightY =
    chartHeight -
    ((data[highlightIndex] - minValue) /
      (maxValue - minValue)) *
      chartHeight;

  return (
    <div className="revenue-card">
      <div className="revenue-header">
        <h3>Monthly Revenue</h3>
        <select className="revenue-dropdown">
          <option>Monthly</option>
        </select>
      </div>

      <div className="chart-wrapper">
        <svg
          width="100%"
          height={chartHeight + 40}
          viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Y Axis Labels + Grid */}
          {[8000, 10000, 12000, 14000].map((value, i) => {
            const y =
              chartHeight -
              ((value - minValue) / (maxValue - minValue)) *
                chartHeight;
            return (
              <g key={i}>
                <text
                  x="-10"
                  y={y + 5}
                  textAnchor="end"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {value / 1000}k
                </text>
                <line
                  x1="0"
                  x2={chartWidth}
                  y1={y}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeDasharray="3"
                />
              </g>
            );
          })}

          {/* Area */}
          <polygon
            fill="url(#areaGradient)"
            points={`0,${chartHeight} ${points} ${chartWidth},${chartHeight}`}
          />

          {/* Line */}
          <polyline
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="3"
            points={points}
          />

          {/* Highlight Point */}
          <circle
            cx={highlightX}
            cy={highlightY}
            r="6"
            fill="#0ea5e9"
          />

          {/* Vertical dashed line */}
          <line
            x1={highlightX}
            x2={highlightX}
            y1="0"
            y2={chartHeight}
            stroke="#d1d5db"
            strokeDasharray="4"
          />

          {/* X Axis Labels */}
          {labels.map((label, i) => (
            <text
              key={i}
              x={i * stepX}
              y={chartHeight + 25}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              {label}
            </text>
          ))}
        </svg>

       
      </div>

      <style>{`
        .revenue-card {
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .revenue-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .revenue-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .revenue-dropdown {
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          font-size: 13px;
          color: #374151;
        }

        .chart-wrapper {
          position: relative;
          margin-top: 25px;
        }

        .tooltip-box {
          position: absolute;
          top: 30px;
          transform: translateX(-50%);
          background: white;
          padding: 10px 14px;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          border: 1px solid #e5e7eb;
          text-align: center;
        }

        .tooltip-title {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .tooltip-box h4 {
          font-size: 16px;
          margin: 0;
          color: #111827;
        }

        .tooltip-box span {
          font-size: 11px;
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
}
