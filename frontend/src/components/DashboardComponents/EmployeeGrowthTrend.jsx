import React from 'react';

const EmployeeGrowthTrend = () => {
  // Hardcoded employee growth data
  const employeeGrowthData = {
    current: 182,
    previous: 173,
    growth: 9,
    growthPercentage: 5.2,
    stages: [
      { label: "Applications", value: "450" },
      { label: "Screened", value: "280" },
      { label: "Interviewed", value: "120" },
      { label: "Selected", value: "45" },
      { label: "Onboarded", value: "182" },
    ]
  };

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
      marginBottom: '20px'
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
    statsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '24px'
    },
    statItem: {
      textAlign: 'center'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#000000',
      margin: '0 0 4px 0'
    },
    statLabel: {
      fontSize: '12px',
      color: '#6b7280',
      margin: 0
    },
    growthIndicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px',
      marginTop: '8px'
    },
    growthArrow: {
      fontSize: '16px',
      color: '#10b981'
    },
    growthText: {
      fontSize: '14px',
      color: '#10b981',
      fontWeight: '500'
    },
    funnel: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    funnelStep: {
      backgroundColor: '#f8fafc',
      padding: '16px',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderLeft: '4px solid #0ea5e9',
      transition: 'all 0.2s ease'
    },
    funnelStepHover: {
      backgroundColor: '#f1f5f9',
      transform: 'translateX(4px)'
    },
    stepValue: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#000000',
      margin: 0
    },
    stepLabel: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Employee Growth Trend</h3>
        <p style={styles.date}>Last 6 months</p>
      </div>
      
      <div style={styles.statsContainer}>
        <div style={styles.statItem}>
          <p style={styles.statValue}>{employeeGrowthData.current}</p>
          <p style={styles.statLabel}>Current</p>
        </div>
        <div style={styles.statItem}>
          <p style={styles.statValue}>{employeeGrowthData.previous}</p>
          <p style={styles.statLabel}>Previous</p>
        </div>
        <div style={styles.statItem}>
          <p style={styles.statValue}>+{employeeGrowthData.growth}</p>
          <p style={styles.statLabel}>New Hires</p>
          <div style={styles.growthIndicator}>
            <span style={styles.growthArrow}>↑</span>
            <span style={styles.growthText}>{employeeGrowthData.growthPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Funnel Placeholder */}
      <div style={styles.funnel}>
        {employeeGrowthData.stages.map((stage, index) => (
          <div
            key={index}
            style={{
              ...styles.funnelStep,
              borderLeftColor: [
                '#0ea5e9', // Sky blue
                '#38bdf8', // Light sky blue
                '#7dd3fc', // Lighter sky blue
                '#bae6fd', // Very light sky blue
                '#e0f2fe'  // Ultra light sky blue
              ][index],
              opacity: 1 - (index * 0.15)
            }}
            onMouseEnter={(e) => {
              Object.assign(e.target.style, styles.funnelStepHover);
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f8fafc';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            <strong style={styles.stepValue}>{stage.value}</strong>
            <p style={styles.stepLabel}>{stage.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeGrowthTrend;
