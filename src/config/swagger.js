const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRM + HRM API",
      version: "1.0.0",
      description: "CRM & HRM Backend APIs",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  // 🔥 THIS IS THE KEY FIX
  apis: ["./src/modules/**/*.js"], // routes + controllers
};

module.exports = swaggerJsdoc(options);
