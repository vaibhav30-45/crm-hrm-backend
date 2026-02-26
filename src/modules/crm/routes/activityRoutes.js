const express = require("express");
const router = express.Router();

const {
  createActivity,
  getAllActivities,
  getMyActivities,
} = require("../controllers/activityController");

const { protect } = require("../../../middleware/auth.middleware");

router.post("/", protect, createActivity);
router.get("/", protect, getAllActivities);
router.get("/me", protect, getMyActivities);

module.exports = router;