const express = require("express");
const router = express.Router();
const controller = require("./onboarding.controller");
const { protect, authorizeRoles } = require("../../middleware/auth.middleware");

router.post(
"/start",
protect,
authorizeRoles("HR","ADMIN"),
controller.startOnboarding
);

router.get(
"/",
protect,
authorizeRoles("HR","ADMIN"),
controller.getOnboarding
);

module.exports = router;