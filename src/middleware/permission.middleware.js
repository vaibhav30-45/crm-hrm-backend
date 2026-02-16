module.exports = (moduleName) => {
  return (req, res, next) => {
    const perms = req.user.permissions || {};
    if (!perms[moduleName]) {
      return res.status(403).json({ message: `Access to ${moduleName} denied` });
    }
    next();
  };
};
