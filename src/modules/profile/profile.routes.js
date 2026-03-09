const express = require("express");
const router = express.Router();

const {
  getEmployeeProfile,
  updateEmployeeProfile
} = require("./profile.controller");

const { protect, authorizeRoles } = require("../../middleware/auth.middleware");

// Get Profile
router.get(
  "/:id",
  protect,
  authorizeRoles("ADMIN", "HR", "EMPLOYEE"),
  getEmployeeProfile
);

// ✅ Update Profile
router.put(
  "/update/:id",
  protect,
  authorizeRoles("ADMIN","HR","EMPLOYEE"),
  updateEmployeeProfile
);

module.exports = router;