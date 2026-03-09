const express = require("express");
const router = express.Router();

const {
  runPayroll,
  markPaid,
   getAllPayroll,
   downloadPayslip

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
// ✅ Get All Payroll
router.get(
  "/all",
  protect,
  authorizeRoles("ADMIN", "HR"),
  getAllPayroll
);
router.get(
  "/payslip/:id",
  protect,
  authorizeRoles("ADMIN","HR","EMPLOYEE"),
  downloadPayslip
);

module.exports = router;
