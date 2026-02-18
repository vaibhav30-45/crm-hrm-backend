const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: String,
  email: String
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  },
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "hr", "employee"],
    default: "employee"
  }
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);
const User = mongoose.model("User", userSchema);

module.exports = { Company, User };
