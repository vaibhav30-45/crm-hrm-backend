const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    basicSalary: Number,
    hra: Number,
    pf: Number,
    bonus: Number,

    totalSalary: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model("SalaryStructure", salarySchema);
