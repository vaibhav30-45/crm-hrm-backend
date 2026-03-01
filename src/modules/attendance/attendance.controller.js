const Attendance = require("./attendance.model");


// ==========================
// ✅ Punch In
// ==========================
exports.punchIn = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already punched in today
    const existing = await Attendance.findOne({
      employee: req.user.id,
      date: { $gte: today },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already punched in today",
      });
    }

    const attendance = await Attendance.create({
      employee: req.user.id,
      checkIn: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Punch in successful",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ==========================
// ✅ Punch Out
// ==========================
exports.punchOut = async (req, res) => {
  try {
    const attendance = await Attendance.findOne({
      employee: req.user.id,
      checkOut: null,
    });

    if (!attendance) {
      return res.status(400).json({
        success: false,
        message: "No active punch-in found",
      });
    }

    attendance.checkOut = new Date();
    await attendance.save();

    res.status(200).json({
      success: true,
      message: "Punch out successful",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ==========================
// ✅ Employee - Get My Attendance
// ==========================
exports.getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      employee: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ==========================
// ✅ HR - Get All Employees Attendance
// ==========================
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("employee", "name email role")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};