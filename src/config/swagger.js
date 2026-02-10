const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRM + HRM API",
      version: "1.0.0",
      description: "CRM & HRM Backend APIs"
    },
    servers: [
      {
        url: "http://localhost:5000/api"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./src/modules/**/*.js"]
};

module.exports = swaggerJSDoc(options);
