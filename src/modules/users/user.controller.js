const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ROLES = require("../../constants/roles");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.json({ token, user });
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, designation, techStack } = req.body;
    const creatorRole = req.user.role;

    if (creatorRole === ROLES.ADMIN && role !== ROLES.HR)
      return res.status(403).json({ message: "Admin can only create HR" });

    if (
      creatorRole === ROLES.HR &&
      ![ROLES.MANAGER, ROLES.EMPLOYEE, ROLES.BDE].includes(role)
    )
      return res.status(403).json({ message: "HR cannot create this role" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      tenantId: req.user.tenantId,
      name,
      email,
      password: hashedPassword,
      role,
      designation,
      techStack,
      createdByRole: creatorRole
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};