module.exports = {
  secret: process.env.JWT_SECRET || "supersecretkey",
  expiresIn: process.env.JWT_EXPIRES || "1d"
};
