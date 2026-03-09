const express = require("express");
const router = express.Router();
const controller = require("./salaryStructure.controller");
const { protect, authorizeRoles } = require("../../middleware/auth.middleware");

router.post(
"/",
protect,
authorizeRoles("HR","ADMIN"),
controller.createSalary
);

router.get(
"/:employeeId",
protect,
authorizeRoles("HR","ADMIN"),
controller.getSalary
);

module.exports = router;