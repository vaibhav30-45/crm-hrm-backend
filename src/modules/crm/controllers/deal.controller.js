const Deal = require("../models/Deal");

exports.createDeal = async (req, res) => {
  const deal = await Deal.create(req.body);
  res.status(201).json(deal);
};
exports.getDeals = async (req, res) => {
  const deals = await Deal.find();
  res.json(deals);
};

exports.deleteDeal = async (req, res) => {
  await Deal.findByIdAndDelete(req.params.id);
  res.json({ message: "Deal deleted successfully" });
};


exports.updateStage = async (req, res) => {
  const deal = await Deal.findByIdAndUpdate(
    req.params.id,
    { stage: req.body.stage },
    { new: true }
  );
  res.json(deal);
};
