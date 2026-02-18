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
