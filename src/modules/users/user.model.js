const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return this.role !== "ADMIN";
      }
    },

    name: { type: String, required: true },

    email: { type: String, unique: true, required: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["ADMIN", "HR", "MANAGER", "EMPLOYEE", "BDE"],
      required: true
    },

    designation: {
      type: String,
      enum: [
        "Project Manager",
        "Sales Manager",
        "Client Relationship Manager",
        "Developer",
        "Intern"
      ]
    },

    techStack: {
      type: String,
      enum: ["MERN", "Full Stack", "AIML", "Frontend", "Backend"]
    },

    reportingTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    permissions: { type: Object, default: {} },

    createdByRole: String,

    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

