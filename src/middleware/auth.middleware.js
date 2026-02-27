const jwt = require("jsonwebtoken");
const User = require("../modules/users/user.model");

/**
 * 🔐 Protect Middleware
 * Verifies JWT token and attaches user to req
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided",
      });
    }

    // 2️⃣ Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Check if user still exists
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // 4️⃣ Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Protect Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

/**
 * 🛡 Role Authorization Middleware
 * Usage: authorizeRoles("ADMIN", "MANAGER")
 */
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const userRole = req.user.role?.toUpperCase();
    const allowedRoles = roles.map((role) => role.toUpperCase());

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Role '${req.user.role}' not allowed`,
      });
    }

    next();
  };
};