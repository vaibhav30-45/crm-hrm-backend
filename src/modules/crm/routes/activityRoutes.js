const express = require("express");
const router = express.Router();

const {
  createActivity,
  getActivities
} = require("../controllers/activityController");
const { protect } = require("../../../middleware/auth.middleware");


router.post("/", protect, createActivity);
router.get("/", protect, getActivities);

module.exports = router;
