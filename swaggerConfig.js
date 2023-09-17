const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0", // Change this to "2.0" if you're using Swagger 2.0
    info: {
      title: "Ghoomlo Backend",
      version: "1.0.0",
      description: "API documentation for Ghoomlo backend",
    },
    securityDefinitions: {
      // Define security scheme
      Authorization: {
        type: "apiKey",
        in: "header",
        name: "x-auth-token",
      },
    },
  },
  // Path to the API specs
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
