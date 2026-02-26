const express = require("express");
const router = express.Router();

const {
  createCustomer,
  getCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer
} = require("../controllers/customerController");

const { protect, authorizeRoles } = require("../../../middleware/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: CRM Customer APIs
 */

router.post("/", protect, authorizeRoles("Admin", "Manager", "BD"), createCustomer);
router.get("/", protect, authorizeRoles("ADMIN", "MANAGER", "BD"), getCustomers);
router.get("/:id", protect, authorizeRoles("Admin", "Manager", "BD"), getSingleCustomer);
router.put("/:id", protect, authorizeRoles("Admin", "Manager", "BD"), updateCustomer);
router.delete("/:id", protect, authorizeRoles("Admin", "Manager", "BD"), deleteCustomer);

module.exports = router;
