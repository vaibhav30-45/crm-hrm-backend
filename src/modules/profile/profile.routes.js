const express = require("express");
const router = express.Router();
const { getEmployeeProfile } = require("./profile.controller");
const { protect, authorizeRoles } = require("../../middleware/auth.middleware");

router.get(
  "/:id",
  protect,
  authorizeRoles("ADMIN", "HR", "EMPLOYEE"),
  getEmployeeProfile
);

module.exports = router;
