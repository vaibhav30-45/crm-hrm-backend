const Leave = require("./leave.model");

// Apply Leave
exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;

    const leave = await Leave.create({
      tenantId: req.user.tenantId,
      employee: req.user.id,
      leaveType,
      fromDate,
      toDate,
      reason,
    });

    res.status(201).json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get My Leaves
exports.getMyLeaves = async (req, res) => {
  const leaves = await Leave.find({
    employee: req.user.id,
    tenantId: req.user.tenantId,
  });
  res.json(leaves);
};

// Get All Leaves (Admin/HR)
exports.getAllLeaves = async (req, res) => {
  const leaves = await Leave.find({ tenantId: req.user.tenantId }).populate(
    "employee",
    "name email",
  );
  res.json(leaves);
};

// Approve / Reject Leave
exports.updateLeaveStatus = async (req, res) => {
  const leave = await Leave.findOne({
    _id: req.params.id,
    tenantId: req.user.tenantId,
  });

  if (!leave) {
    return res.status(404).json({ message: "Leave not found or unauthorized" });
  }

  leave.status = req.body.status;
  await leave.save();

  res.json({ success: true, leave });
};
