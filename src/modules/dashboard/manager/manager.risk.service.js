// ===============================
// Risk Detection Logic
// ===============================

const detectRisk = (absentCount = 0, overdueTasks = 0) => {

  if (absentCount >= 5 && overdueTasks >= 5) {
    return "High Risk";
  }

  if (absentCount >= 3 || overdueTasks >= 3) {
    return "Medium Risk";
  }

  return "Low Risk";
};

// Separate API support
const getRiskData = async (user) => {
  return {
    riskLevel: "Low Risk"
  };
};

module.exports = {
  detectRisk,
  getRiskData
};
