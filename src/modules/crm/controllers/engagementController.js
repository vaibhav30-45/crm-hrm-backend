const aiService = require("../../../utils/aiService");

exports.predictClientLTV = async (req, res) => {
  try {
    const { customer_id, industry_type, engagement_level, purchase_behavior } = req.body;

    if (!customer_id || !industry_type || !engagement_level || !purchase_behavior) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: customer_id, industry_type, engagement_level, and purchase_behavior.",
      });
    }

    const prediction = await aiService.predictClv({
      customer_id,
      industry_type,
      engagement_level,
      purchase_behavior
    });

    if (!prediction) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate Client LTV prediction. AI service may be unavailable.",
      });
    }

    res.status(200).json(prediction);
  } catch (error) {
    console.error("Predict Client LTV Error:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while generating LTV prediction.",
      error: error.message,
    });
  }
};

exports.optimizeFollowupStrategy = async (req, res) => {
  try {
    const { lead_id, interactions } = req.body;

    if (!lead_id || !interactions || !Array.isArray(interactions) || interactions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: lead_id and interactions array.",
      });
    }

    const optimization = await aiService.optimizeFollowup({
      lead_id,
      interactions
    });

    if (!optimization) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate Follow-up Optimization. AI service may be unavailable.",
      });
    }

    res.status(200).json({
      success: true,
      data: optimization
    });
  } catch (error) {
    console.error("Optimize Followup Strategy Error:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while optimizing follow-up strategy.",
      error: error.message,
    });
  }
};
