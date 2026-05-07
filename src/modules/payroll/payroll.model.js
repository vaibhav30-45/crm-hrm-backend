// models/Payroll.js
const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  baseSalary: Number,
  deductions: Number,
  netSalary: Number,
  month: String,
  status: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending"
  },
  paidDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Payroll", payrollSchema);
