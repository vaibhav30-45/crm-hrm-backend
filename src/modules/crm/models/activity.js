const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Call", "Meeting", "Email", "Follow-up"],
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    ipAddress: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);