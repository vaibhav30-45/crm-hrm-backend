const Lead = require("../models/Lead");
const Deal = require("../models/Deal");
const aiService = require("../../../utils/aiService");

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

exports.getSalesForecast = async (req, res) => {
  try {
    const months = parseInt(req.query.months) || 3;
    const forecast = await aiService.getSalesForecast(months);

    if (!forecast || !forecast.success) {
      return res.status(503).json({
        success: false,
        message: "AI Sales Forecast service unavailable or failed."
      });
    }

    res.status(200).json({
      success: true,
      message: "Sales Forecast generated successfully",
      data: forecast.forecast
    });
  } catch (error) {
    console.error("Get Sales Forecast error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching sales forecast",
      error: error.message,
    });
  }
};
