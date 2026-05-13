const express = require("express");
const router = express.Router();

const { dashboardStats, getSalesForecast } = require("../controllers/reportController");

const { protect } = require("../../../middleware/auth.middleware");
const { authorizeRoles } = require("../../../middleware/role.middleware");

router.get("/dashboard", protect, authorizeRoles("Admin", "Manager","BD"), dashboardStats);
router.get("/sales-forecast", protect, authorizeRoles("Admin", "Manager","BD"), getSalesForecast);

module.exports = router;
