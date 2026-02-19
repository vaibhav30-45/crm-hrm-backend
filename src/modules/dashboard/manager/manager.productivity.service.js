// ===============================
// Productivity Calculation Logic
// ===============================

const calculateProductivityScore = (
  completedTasks = 0,
  convertedLeads = 0,
  overdueTasks = 0
) => {

  const score =
    (completedTasks * 2) +
    (convertedLeads * 3) -
    (overdueTasks * 2);

  if (score >= 80) return { score, level: "Excellent" };
  if (score >= 50) return { score, level: "Good" };
  if (score >= 20) return { score, level: "Average" };

  return { score, level: "Needs Improvement" };
};

// Separate API support
const calculateScore = async (user) => {
  return {
    score: 70,
    level: "Good"
  };
};

module.exports = {
  calculateProductivityScore,
  calculateScore
};
