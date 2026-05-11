const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  source: String,
  status: {
    type: String,
    enum: ["New", "Contacted", "Qualified", "Lost"],
    default: "New"
  },
  // Professional details for AI Prediction
  role_position: { type: String, default: "Not Specified" },
  highest_education: String,
  years_of_experience: { type: Number, default: 0 },
  skills: String,
  location: String,
  expected_salary: { type: Number, default: 0 },
  
  // Link to AI service's unique ID
  ai_unique_id: String,

  // AI ML Prediction Results
  ml_prediction: {
    predicted_temperature: { type: String, enum: ["Hot", "Warm", "Cold", "Unknown"], default: "Unknown" },
    confidence: Number,
    probabilities: Object,
    model_version: String,
    prediction_timestamp: Date
  }
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);
