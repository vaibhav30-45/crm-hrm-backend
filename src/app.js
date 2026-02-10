const express = require("express");   
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");


const app = express();

app.use(cors());
app.use(express.json());

// Swagger Route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;




