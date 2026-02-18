const express = require("express");
const router = express.Router();

const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
} = require("./leave.controller");

const { protect, authorizeRoles } = require("../../middleware/auth.middleware");

// Employee apply leave
router.post(
  "/apply",
  protect,
  authorizeRoles("EMPLOYEE"),
  applyLeave
);

// Employee view own leaves
router.get(
  "/my",
  protect,
  authorizeRoles("EMPLOYEE"),
  getMyLeaves
);

// Admin / HR view all leaves
router.get(
  "/all",
  protect,
  authorizeRoles("ADMIN", "HR"),
  getAllLeaves
);

// Approve / Reject leave
router.put(
  "/update/:id",
  protect,
  authorizeRoles("ADMIN", "HR"),
  updateLeaveStatus
);

module.exports = router;
