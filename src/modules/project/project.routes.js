const express = require("express");
const router = express.Router();
const controller = require("./project.controller");
const { protect, authorizeRoles } = require("../../middleware/auth.middleware");

// Create Project (HR only)
router.post(
  "/create",
  protect,
  authorizeRoles("HR"),
  controller.createProject
);
/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management APIs
 */

/**
 * @swagger
 * /api/projects/create:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Project created successfully
 */

/**
 * @swagger
 * /api/projects/assign-team:
 *   post:
 *     summary: Assign employee to project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee assigned successfully
 */

/**
 * @swagger
 * /api/projects/my-team:
 *   get:
 *     summary: Get team members of manager
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Team list
 */

// Assign Team (Manager only)
router.post(
  "/assign-team",
  protect,
  authorizeRoles("MANAGER","HR","ADMIN"),
  controller.assignTeam
);

// Get My Team (Manager only)
router.get(
  "/my-team",
  protect,
  authorizeRoles("MANAGER"),
  controller.getMyTeam
);

module.exports = router;   // ✅ VERY IMPORTANT