const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
  title: String,
  value: Number,
  stage: {
    type: String,
    enum: ["Prospecting", "Negotiation", "Closed Won", "Closed Lost"]
  }
}, { timestamps: true });

module.exports = mongoose.model("Deal", dealSchema);
