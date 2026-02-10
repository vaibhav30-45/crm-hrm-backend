exports.getDashboard = (req, res) => {
  const role = req.user.role;
  const perms = req.user.permissions || {};

  let dashboard = {};

  if (role === "ADMIN") dashboard = { CRM: true, HRM: true, Users: true };
  else dashboard = perms;

  res.json({ dashboard });
};
