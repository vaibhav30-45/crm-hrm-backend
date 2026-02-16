const Lead = require("../models/Lead");
const Deal = require("../models/Deal");

exports.dashboardStats = async (req, res) => {
  const totalLeads = await Lead.countDocuments();
  const wonDeals = await Deal.countDocuments({ stage: "Closed Won" });

  const revenue = await Deal.aggregate([
    { $match: { stage: "Closed Won" } },
    { $group: { _id: null, total: { $sum: "$value" } } }
  ]);

  res.json({
    totalLeads,
    wonDeals,
    revenue: revenue[0]?.total || 0
  });
};
