// models/Attendance.js
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  checkIn: Date,
  checkOut: Date,
  status: {
    type: String,
    enum: ["Present", "Absent", "Late"],
    default: "Present"
  }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
