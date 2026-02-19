const express = require("express");
const router = express.Router();

const { protect } = require("../../middleware/auth.middleware");

// Employee Controller
const { employeeDashboard } = require("./dashboard.controller");

// Manager Routes (separate module)
const managerRoutes = require("./manager/manager.dashboard.routes");

// ===============================
// EMPLOYEE DASHBOARD
// ===============================
router.get("/employee", protect, employeeDashboard);

// ===============================
// MANAGER DASHBOARD (Nested)
// ===============================
router.use("/manager", protect, managerRoutes);

module.exports = router;
