// src/modules/leads/lead.model.js
const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  source: { type: String },
  status: { type: String, default: "new" },
  // add more fields as per requirement
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);
