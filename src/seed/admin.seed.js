const bcrypt = require("bcryptjs");
const User = require("../modules/users/user.model");
const Tenant = require("../modules/tenants/tenant.model");

const seedAdmin = async () => {
  const adminExists = await User.findOne({ role: "ADMIN" });
  if (adminExists) {
    console.log("✅ Admin already exists");
    return;
  }

  //  CREATE FIRST TENANT
  const tenant = await Tenant.create({
    companyName: "CRM HRM Root Company",
    companyCode: "ROOT"
  });

  //  CREATE ADMIN
  const admin = await User.create({
    tenantId: tenant._id,
    name: "Super Admin",
    email: "admin@crmhrm.com",
    password: await bcrypt.hash("Admin@123", 10),
    role: "ADMIN",
    permissions: { ALL: true },
    isActive: true
  });

  console.log("First ADMIN & TENANT created");
};

module.exports = seedAdmin;
