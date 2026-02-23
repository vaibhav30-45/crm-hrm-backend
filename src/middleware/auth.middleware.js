const jwt = require("jsonwebtoken");
const User = require("../modules/users/user.model");
const jwtConfig = require("../config/jwt");

// 🔐 PROTECT ROUTES
exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const decoded = jwt.verify(token, jwtConfig.secret);

    const user = await User.findById(decoded.id).select("-password");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User not found or inactive",
      });
    }

    // 🔥 Attach user + tenant info
    req.user = user;
    req.tenantId = user.tenantId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// 🔐 ROLE AUTHORIZATION
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Role ${req.user.role} not allowed`,
      });
    }

    next();
  };
};

// 🔥 OPTIONAL: Designation based protection
exports.authorizeDesignation = (...designations) => {
  return (req, res, next) => {
    if (!designations.includes(req.user.designation)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Designation ${req.user.designation} not allowed`,
      });
    }
    next();
  };
};