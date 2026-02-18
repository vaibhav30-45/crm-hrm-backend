const mongoose = require("mongoose");

const leaveBalanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  year: Number,
  totalLeaves: { type: Number, default: 20 },
  remainingLeaves: { type: Number, default: 20 }
});

leaveBalanceSchema.index({ employee: 1, year: 1 }, { unique: true });

module.exports = mongoose.model("LeaveBalance", leaveBalanceSchema);
