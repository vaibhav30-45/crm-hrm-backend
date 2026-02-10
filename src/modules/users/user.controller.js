const User = require("./user.model");
const bcrypt = require("bcryptjs");
const ROLES = require("../../constants/roles");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, permissions } = req.body;
    const creatorRole = req.user.role;

    // 🔐 ROLE RULES
    if (creatorRole === ROLES.ADMIN && role !== ROLES.HR)
      return res.status(403).json({ message: "Admin can only create HR" });

    if (
      creatorRole === ROLES.HR &&
      ![ROLES.MANAGER, ROLES.EMPLOYEE, ROLES.BDE].includes(role)
    )
      return res.status(403).json({ message: "HR cannot create this role" });

    const user = await User.create({
      tenantId: req.user.tenantId, // 🔥 NOW AVAILABLE
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      permissions: permissions || {},
      createdByRole: creatorRole
    });

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({
      message: "User creation failed",
      error: err.message
    });
  }
};
