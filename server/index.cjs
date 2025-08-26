// Main Express server to test the email API (CommonJS)
const express = require("express");
const emailApi = require("./emailApi.cjs");
const { swaggerUi, specs } = require("./swagger.cjs");
const cors = require("cors");
const { handleApplicationEmail } = require("./routes/application.ts");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", emailApi);

// Route for application submissions
app.post("/application", (req, res) => {
  handleApplicationEmail(req, res);
});

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
