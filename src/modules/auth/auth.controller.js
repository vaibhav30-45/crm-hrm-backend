const User = require("../users/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find active user
    const user = await User.findOne({ email, isActive: true });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // 2️⃣ Compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // 3️⃣ Generate token (Multi-tenant ready)
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        tenantId: user.tenantId,
        permissions: user.permissions
      },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    // 4️⃣ Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        permissions: user.permissions
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message
    });
  }
};
