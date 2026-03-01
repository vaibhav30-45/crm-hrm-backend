console.log("✅ SRC Attendance Routes Loaded");

const express = require("express");
const router = express.Router();

const {
  punchIn,
  punchOut,
  getMyAttendance,
  getAllAttendance
} = require("./attendance.controller");

const { protect, authorizeRoles } = require("../../middleware/auth.middleware");

// 🔥 TEMP TEST ROUTE (DEBUG PURPOSE)
router.get("/test", (req, res) => {
  res.json({ message: "Attendance test working" });
});

// Employee Punch In
router.post("/punch-in", protect, authorizeRoles("EMPLOYEE"), punchIn);

// Employee Punch Out
router.post("/punch-out", protect, authorizeRoles("EMPLOYEE"), punchOut);

// Employee - View Own Attendance
router.get("/my-attendance", protect, authorizeRoles("EMPLOYEE"), getMyAttendance);

// HR - View All Employees Attendance
router.get("/all", protect, authorizeRoles("HR", "ADMIN"), getAllAttendance);

module.exports = router;