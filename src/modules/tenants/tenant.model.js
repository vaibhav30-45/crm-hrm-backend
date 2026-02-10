const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyCode: { type: String, unique: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Tenant", tenantSchema);
