const aiService = require("../../../utils/aiService");

exports.generateFromQuery = async (req, res) => {
  try {
    const { query, max_results = 10, persist = true } = req.body;

    if (!query) {
      return res.status(400).json({ success: false, message: "query is required" });
    }

    const result = await aiService.generateLeadsFromQuery({ query, max_results, persist });

    if (!result) {
      return res.status(503).json({ success: false, message: "AI Lead Generation service unavailable" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Lead Generation Query Error:", error);
    res.status(500).json({ success: false, message: "Error generating leads from query", error: error.message });
  }
};

exports.qualifyResults = async (req, res) => {
  try {
    const { query, search_results, max_results = 10, persist = true } = req.body;

    if (!search_results || !Array.isArray(search_results)) {
      return res.status(400).json({ success: false, message: "search_results array is required" });
    }

    const result = await aiService.qualifySearchResults({ query, search_results, max_results, persist });

    if (!result) {
      return res.status(503).json({ success: false, message: "AI Lead Qualification service unavailable" });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Lead Qualification Error:", error);
    res.status(500).json({ success: false, message: "Error qualifying search results", error: error.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const { limit = 100, category } = req.query;

    const result = await aiService.getLeadGenerationDashboard({ limit, category });

    if (!result) {
      return res.status(503).json({ success: false, message: "AI Lead Generation Dashboard service unavailable" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Lead Generation Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Error fetching dashboard data", error: error.message });
  }
};
