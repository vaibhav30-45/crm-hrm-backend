const express = require("express");
const router = express.Router();

const {
  punchIn,
  punchOut
} = require("./attendance.controller");
const { protect, authorizeRoles } = require("../../middleware/auth.middleware");

// Punch In
router.post(
  "/punch-in",
  protect,
  authorizeRoles("EMPLOYEE"),
  punchIn
);

// Punch Out
router.post(
  "/punch-out",
  protect,
  authorizeRoles("EMPLOYEE"),
  punchOut
);

module.exports = router;
