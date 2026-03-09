const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllReviews
} = require("./performance.controller");
const { protect, authorizeRoles } = require("../../middleware/auth.middleware");

// Create Review (HR/Admin)
router.post(
  "/create",
  protect,
  authorizeRoles("ADMIN","HR"),
  createReview
);

// ✅ Get All Reviews
router.get(
  "/all",
  protect,
  authorizeRoles("ADMIN","HR"),
  getAllReviews
);

module.exports = router;
