const express = require("express");
const router = express.Router();

const {
  getManagerDashboard,
  getManagerGraph,
  getProductivityScore,
  getRiskAnalysis
} = require("./manager.dashboard.controller");

const { protect } = require("../../../middleware/auth.middleware");

// Role Middleware
const authorizeManager = (req, res, next) => {
  if (!req.user || req.user.role !== "MANAGER") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Manager only."
    });
  }
  next();
};  

// Routes
router.get("/", protect, authorizeManager, getManagerDashboard);
router.get("/graph", protect, authorizeManager, getManagerGraph);
router.get("/productivity", protect, authorizeManager, getProductivityScore);
router.get("/risk", protect, authorizeManager, getRiskAnalysis);

module.exports = router;  
