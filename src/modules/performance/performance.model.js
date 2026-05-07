// models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  score: Number,
  rating: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Below Average"]
  },
  nextReviewDate: Date,
  status: {
    type: String,
    enum: ["Completed", "Pending"],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
