const Attendance = require("./attendance.model");

// Punch In
exports.punchIn = async (req, res) => {
  const attendance = await Attendance.create({
    employee: req.user.id,
    checkIn: new Date()
  });

  res.json(attendance);
};

// Punch Out
exports.punchOut = async (req, res) => {
  const attendance = await Attendance.findOne({
    employee: req.user.id,
    checkOut: null
  });

  attendance.checkOut = new Date();
  await attendance.save();

  res.json(attendance);
};
