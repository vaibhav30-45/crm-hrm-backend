const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);

    req.user = decoded;               // full user payload
    req.tenantId = decoded.tenantId;  // 🔥 MAGIC LINE

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
