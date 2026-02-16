import React from 'react';

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

  // Calculate angles for circular segments
  const calculateSegment = (value, total, startAngle) => {
    const percentage = (value / total) * 100;
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const x1 = 50 + 40 * Math.cos(startAngleRad);
    const y1 = 50 + 40 * Math.sin(startAngleRad);
    const x2 = 50 + 40 * Math.cos(endAngleRad);
    const y2 = 50 + 40 * Math.sin(endAngleRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    return {
      path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
      percentage: percentage.toFixed(1)
    };
  };

  // Create segments for the circular chart
  const segments = [
    { 
      ...calculateSegment(attendanceData.present, attendanceData.total, -90), 
      color: '#0ea5e9', // Sky blue
      label: 'Present',
      value: attendanceData.present 
    },
    { 
      ...calculateSegment(attendanceData.absent, attendanceData.total, -90 + (attendanceData.present / attendanceData.total) * 360), 
      color: '#38bdf8', // Light sky blue
      label: 'Absent',
      value: attendanceData.absent 
    },
    { 
      ...calculateSegment(attendanceData.late, attendanceData.total, -90 + ((attendanceData.present + attendanceData.absent) / attendanceData.total) * 360), 
      color: '#7dd3fc', // Lighter sky blue
      label: 'Late',
      value: attendanceData.late 
    },
    { 
      ...calculateSegment(attendanceData.onLeave, attendanceData.total, -90 + ((attendanceData.present + attendanceData.absent + attendanceData.late) / attendanceData.total) * 360), 
      color: '#bae6fd', // Very light sky blue
      label: 'On Leave',
      value: attendanceData.onLeave 
    }
  ];

  const styles = {
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      width: '100%',
      maxWidth: '400px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#000000',
      margin: 0
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
    svg: {
      width: '100%',
      height: '100%',
      transform: 'rotate(-90deg)'
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
      margin: 0
    },
    percentageLabel: {
      fontSize: '12px',
      color: '#6b7280',
      margin: 0
    },
    legend: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    legendColor: {
      width: '12px',
      height: '12px',
      borderRadius: '2px'
    },
    legendText: {
      fontSize: '14px',
      color: '#374151'
    },
    legendValue: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#000000',
      marginLeft: '4px'
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Attendance Trend</h3>
        <p style={styles.date}>16 Feb, 2025</p>
      </div>
      
      <div style={styles.content}>
        {/* Circular Chart */}
        <div style={styles.chartContainer}>
          <svg style={styles.svg} viewBox="0 0 100 100">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={segment.path}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
              />
            ))}
          </svg>
          
          {/* Center Text */}
          <div style={styles.centerText}>
            <p style={styles.percentage}>{attendanceData.percentage}%</p>
            <p style={styles.percentageLabel}>Present</p>
          </div>
        </div>
        
        {/* Legend */}
        <div style={styles.legend}>
          {segments.map((segment, index) => (
            <div key={index} style={styles.legendItem}>
              <div 
                style={{ 
                  ...styles.legendColor, 
                  backgroundColor: segment.color 
                }} 
              />
              <span style={styles.legendText}>
                {segment.label}
              </span>
              <span style={styles.legendValue}>
                {segment.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceTrend;
