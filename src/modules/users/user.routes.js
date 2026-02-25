

const express = require("express");
const router = express.Router();
const controller = require("./user.controller");
const { protect, authorizeRoles } = require("../../middleware/auth.middleware");

// ================= CREATE =================
router.post(
  "/",
  protect,
  authorizeRoles("ADMIN", "HR"),
  controller.createUser
);

// ================= GET =================
router.get(
  "/",
  protect,
  authorizeRoles("ADMIN", "HR", "MANAGER"),
  controller.getAllUsers
);

module.exports = router;