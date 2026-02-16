const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  getSingleLead,
  updateLead,
  deleteLead
} = require("../controllers/leadController");

const { protect } = require("../../../middleware/auth.middleware");
const { authorizeRoles } = require("../../../middleware/role.middleware");

/* ================= ROUTES ================= */

// Create Lead
router.post("/", protect, createLead);

// Get All Leads
router.get("/", protect, authorizeRoles("Admin", "Manager","BDE"), getLeads);

// Get Single Lead
router.get("/:id", protect, getSingleLead);

// Update Lead
router.put("/:id", protect, updateLead);

// Delete Lead
router.delete("/:id", protect, authorizeRoles("Admin"), deleteLead);

module.exports = router;

