const express = require("express");
const router = express.Router();

const { employeeDashboard } = require("./dashboard.controller");
const { protect } = require("../../middleware/auth.middleware");

router.get("/employee", protect, employeeDashboard);

module.exports = router;
