const express = require("express");
const router = express.Router();
const {
  createDeal,
  getDeals,
updateStage ,
  deleteDeal
} = require("../controllers/deal.controller");


const { protect } = require("../../../middleware/auth.middleware");

router.post("/", protect, createDeal);
router.get("/", protect, getDeals);
router.put("/:id/stage", protect, updateStage );
router.delete("/:id", protect, deleteDeal);

module.exports = router;
 