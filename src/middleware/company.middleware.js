module.exports = (req, res, next) => {
  if (!req.user.company)
    return res.status(400).json({ message: "Company missing in token" });

  next();
};
