import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceTrend = () => {
  // Hardcoded attendance data
  const attendanceData = {
    present: 142,
    absent: 23,
    late: 8,
    onLeave: 7,
    total: 180,
    percentage: 78.9
  };

  const chartData = {
    labels: ['Present', 'Absent', 'Late', 'On Leave'],
    datasets: [
      {
        data: [attendanceData.present, attendanceData.absent, attendanceData.late, attendanceData.onLeave],
        backgroundColor: [
          '#0ea5e9', 
          '#38bdf8', 
          '#7dd3fc', 
          '#bae6fd'  
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  };

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      display: false  
    },
    tooltip: {
      backgroundColor: 'rgba(0,0,0,0.8)',
      padding: 10,
      callbacks: {
        label: function (context) {
          const value = context.parsed;
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${context.label}: ${value} (${percentage}%)`;
        }
      }
    }
  }
};

  const styles = {
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      width: '100%',
      maxWidth: '500px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#000000',
    },
    date: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px'
    },
    chartContainer: {
      position: 'relative',
      width: '120px',
      height: '120px'
    },
    centerText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center'
    },
    percentage: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#000000',
      margin: '0 0 4px 0'
    },
    percentageLabel: {
      fontSize: '12px',
      color: '#6b7280',
      margin: 0
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Attendance Trend</h3>
        <p style={styles.date}>16 Feb, 2025</p>
      </div>
      
      <div style={styles.content}>
       
        <div style={styles.chartContainer}>
          <Doughnut data={chartData} options={options} />
          
          
          <div style={styles.centerText}>
            <p style={styles.percentage}>{attendanceData.percentage}%</p>
            <p style={styles.percentageLabel}>Present</p>
          </div>
        </div>
        
        {/* Legend */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {chartData.labels.map((label, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                backgroundColor: chartData.datasets[0].backgroundColor[index]
              }} />
              <span style={{
                fontSize: '14px',
                color: '#374151'
              }}>
                {label}: {chartData.datasets[0].data[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceTrend;
