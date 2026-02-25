const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        tenantId: user.tenantId
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" }
    );

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      token,
      user: userData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= CREATE USER =================
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, designation, techStack, reportingTo } =
      req.body;

    const creatorRole = req.user.role;

    // ===== ROLE PERMISSIONS =====

    // ADMIN → Only HR
    if (creatorRole === "ADMIN" && role !== "HR") {
      return res.status(403).json({
        message: "Admin can only create HR"
      });
    }

    // HR → Manager / Employee / BDE
    if (
      creatorRole === "HR" &&
      !["MANAGER", "EMPLOYEE", "BDE"].includes(role)
    ) {
      return res.status(403).json({
        message: "HR can only create Manager, Employee or BDE"
      });
    }

    // Duplicate email check
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      tenantId: req.user.tenantId,
      name,
      email,
      password: hashedPassword,
      role,
      designation,
      techStack,
      reportingTo:
        role === "EMPLOYEE" || role === "BDE" ? reportingTo : null,
      createdByRole: creatorRole
    });

    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userData
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ================= GET USERS =================
exports.getAllUsers = async (req, res) => {
  try {
    let users;

    // ADMIN → All users
    if (req.user.role === "ADMIN") {
      users = await User.find().select("-password");
    }

    // HR → Only their tenant users
    else if (req.user.role === "HR") {
      users = await User.find({
        tenantId: req.user.tenantId
      }).select("-password");
    }

    // MANAGER → Only their team
    else if (req.user.role === "MANAGER") {
      users = await User.find({
        reportingTo: req.user.id
      }).select("-password");
    }

    else {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};