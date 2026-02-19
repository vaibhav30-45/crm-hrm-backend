const express = require("express");   
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const leadRoutes = require("./modules/crm/routes/leadRoutes");
const customerRoutes = require("./modules/crm/routes/customerRoutes");
const activityRoutes = require("./modules/crm/routes/activityRoutes");
const dealRoutes = require("./modules/crm/routes/dealRoutes");
const reportRoutes = require("./modules/crm/routes/reportRoutes");
const leaveRoutes = require("./modules/leave/leave.routes");
const attendanceRoutes = require("./modules/attendance/attendance.routes");
const payrollRoutes = require("./modules/payroll/payroll.routes");
const reviewRoutes = require("./modules/performance/performance.routes");
const profileRoutes = require("./modules/profile/profile.routes");
const managerDashboardRoutes = require("./modules/dashboard/manager/manager.dashboard.routes");




const app = express();

app.use(cors());
app.use(express.json());

// Swagger Route
// Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Auth & Users
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Dashboard
app.use("/api/dashboard", dashboardRoutes);

// CRM routes
app.use("/api/crm/leads", leadRoutes);
app.use("/api/crm/customers", customerRoutes);
app.use("/api/crm/activities", activityRoutes);
app.use("/api/crm/deals", dealRoutes);
app.use("/api/crm/reports", reportRoutes);
//hrm 
app.use("/api/hrm/leaves", leaveRoutes);
app.use("/api/hrm/attendance", attendanceRoutes);
app.use("/api/hrm/payroll", payrollRoutes);
app.use("/api/hrm/review", reviewRoutes);


app.use("/api/hrm/profile", profileRoutes);
app.use("/api/manager/dashboard", managerDashboardRoutes);
module.exports = app;






























































































































































































