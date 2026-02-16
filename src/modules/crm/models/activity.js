const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Call", "Meeting", "Email", "Follow-up"]
  },
  description: String,
  date: Date
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);
