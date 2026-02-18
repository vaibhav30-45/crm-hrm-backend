const User = require("../users/user.model");
const Attendance = require("../attendance/attendance.model");
const Leave = require("../leave/leave.model");
const Payroll = require("../payroll/payroll.model");

const getEmployeeProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const presentDays = await Attendance.countDocuments({
      employee: userId,
      checkOut: { $ne: null }
    });

    const leaveCount = await Leave.countDocuments({
      employee: userId,
      status: "Approved"
    });

    const payroll = await Payroll.findOne({ employee: userId });

    res.json({
      success: true,
      profile: {
        basicInfo: user,
        attendanceSummary: {
          presentDays,
          leavesTaken: leaveCount
        },
        payrollInfo: payroll
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEmployeeProfile };
