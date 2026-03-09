const Payroll = require("./payroll.model");

// Run Payroll
exports.runPayroll = async (req, res) => {
  const { employeeId, baseSalary, deductions, month } = req.body;

  const netSalary = baseSalary - deductions;

  const payroll = await Payroll.create({
    employee: employeeId,
    baseSalary,
    deductions,
    netSalary,
    month
  });

  res.json(payroll);
};

// Mark as Paid
exports.markPaid = async (req, res) => {
  const payroll = await Payroll.findById(req.params.id);

  payroll.status = "Paid";
  payroll.paidDate = new Date();

  await payroll.save();

  res.json(payroll);
};

// ✅ Get All Payroll
exports.getAllPayroll = async (req, res) => {
  try {

    const payrolls = await Payroll.find()
      .populate("employee", "name email role");

    res.status(200).json({
      success: true,
      count: payrolls.length,
      data: payrolls
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};