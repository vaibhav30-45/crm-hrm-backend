const express = require("express");
const router = express.Router();
const controller = require("./dashboard.controller");
const { protect } = require("../../middleware/auth.middleware");

router.get("/", protect, controller.getDashboard);


module.exports = router;

