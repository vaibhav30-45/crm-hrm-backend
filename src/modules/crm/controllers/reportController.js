const Lead = require("../models/Lead");
const Deal = require("../models/Deal");

exports.dashboardStats = async (req, res) => {
  const totalLeads = await Lead.countDocuments({ tenantId: req.user.tenantId });
  const wonDeals = await Deal.countDocuments({
    tenantId: req.user.tenantId,
    stage: "Closed Won",
  });

  const revenue = await Deal.aggregate([
    {
      $match: {
        tenantId: req.user.tenantId,
        stage: "Closed Won",
      },
    },
    { $group: { _id: null, total: { $sum: "$value" } } },
  ]);

  res.json({
    success: true,
    data: {
      totalLeads,
      wonDeals,
      revenue: revenue[0]?.total || 0,
    },
  });
};
