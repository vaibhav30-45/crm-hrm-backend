const express = require("express");
const router = express.Router();

const { generateFromQuery, qualifyResults, getDashboard } = require("../controllers/leadGenerationController");
const { protect } = require("../../../middleware/auth.middleware");
const { authorizeRoles } = require("../../../middleware/role.middleware");

// Protect all routes
router.use(protect);
router.use(authorizeRoles("Admin", "Manager", "BD"));

router.post("/search-query", generateFromQuery);
router.post("/qualify-search-results", qualifyResults);
router.get("/dashboard", getDashboard);

module.exports = router;
