const express = require("express");
const router = express.Router();
const controller = require("./user.controller");
const auth = require("../../middlewares/auth.middleware");

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user (HR → Employee / BD Manager)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [EMPLOYEE, BD_MANAGER, MANAGER]
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/", auth, controller.createUser);

module.exports = router;
