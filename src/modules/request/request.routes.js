const express = require("express");
const router = express.Router();

const {
  raiseRequest,
  getAllRequests
} = require("./request.controller");

const { protect, authorizeRoles } = require("../../middleware/auth.middleware");

// Employee Raise Request
router.post(
  "/raise",
  protect,
  authorizeRoles("HR","MANAGER","BDE","EMPLOYEE"),
  raiseRequest
);

// HR/Admin View Requests
router.get(
  "/all",
  protect,
  authorizeRoles("ADMIN","HR"),
  getAllRequests
);

module.exports = router;