const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  email: String,
  plan: { type: String, default: "basic" }
});

module.exports = mongoose.model("Company", companySchema);
