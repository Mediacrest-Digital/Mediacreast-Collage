// server/emailApi.js
// Example Node.js Express API endpoint for sending confirmation emails with PDF attachment

const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Load environment variables
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-confirmation", async (req, res) => {
  const { fullName, email } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Scholarship Application Confirmation",
      text: `Hello ${fullName}, your application was received!`,
      attachments: [
        {
          filename: "scholarship.pdf",
          path: "https://yourdomain.com/path/to/scholarship.pdf", // Replace with your actual PDF URL
        },
      ],
    });
    res.json({ success: true, message: "Confirmation email sent." });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
