const express = require("express");
const router = express.Router();

const { analyze, getLeadIntelligence, getOverview } = require("../controllers/conversationIntelligenceController");
const { protect } = require("../../../middleware/auth.middleware");
const { authorizeRoles } = require("../../../middleware/role.middleware");

// Restrict routes to authenticated users with appropriate roles
router.post("/analyze", protect, authorizeRoles("Admin", "Manager", "BD"), analyze);
router.get("/lead/:leadId", protect, authorizeRoles("Admin", "Manager", "BD"), getLeadIntelligence);
router.get("/overview", protect, authorizeRoles("Admin", "Manager", "BD"), getOverview);

module.exports = router;
