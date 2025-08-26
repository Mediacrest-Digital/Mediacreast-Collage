// server/index.js
// Main Express server to test the email API

const express = require("express");
const emailApi = require("./emailApi");
const app = express();

app.use(express.json());
app.use("/api", emailApi);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
