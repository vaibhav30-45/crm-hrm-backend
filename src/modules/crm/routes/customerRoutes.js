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

router.post("/", protect, authorizeRoles("ADMIN", "MANAGER", "BD"), createCustomer);
router.get("/", protect, authorizeRoles("ADMIN", "MANAGER", "BD"), getCustomers);
router.get("/:id", protect, authorizeRoles("ADMIN", "MANAGER", "BD"), getSingleCustomer);
router.put("/:id", protect, authorizeRoles("ADMIN", "MANAGER", "BD"), updateCustomer);
router.delete("/:id", protect, authorizeRoles("ADMIN", "MANAGER", "BD"), deleteCustomer);

module.exports = router;