const express = require("express");
const router = express.Router();

const {
  runPayroll,
  markPaid
} = require("./payroll.controller");
const { protect, authorizeRoles } = require("../../middleware/auth.middleware");
// Run Payroll (Admin/HR)
router.post(
  "/run",
  protect,
  authorizeRoles("ADMIN", "HR"),
  runPayroll
);

// Mark Salary Paid
router.put(
  "/pay/:id",
  protect,
  authorizeRoles("ADMIN", "HR"),
  markPaid
);

module.exports = router;
