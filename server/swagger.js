const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mediacrest Email API",
      version: "1.0.0",
      description: "API for sending scholarship confirmation emails",
    },
    servers: [{ url: "https://localhost:3001" }],
  },
  apis: ["./server/emailApi.cjs"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
