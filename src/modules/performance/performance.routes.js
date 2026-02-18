const express = require("express");
const router = express.Router();

const {
  createReview
} = require("./performance.controller");
const { protect, authorizeRoles } = require("../../middleware/auth.middleware");

// Create Review (HR/Admin)
router.post(
  "/create",
  protect,
  authorizeRoles("ADMIN","HR"),
  createReview
);

module.exports = router;
