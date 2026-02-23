const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, required: true },

    title: { type: String, required: true },

    description: String,

    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);