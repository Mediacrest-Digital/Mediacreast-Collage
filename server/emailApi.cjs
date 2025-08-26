// Example Node.js Express API endpoint for sending confirmation emails with PDF attachment (CommonJS)
const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

require("dotenv").config();

/**
 * @swagger
 * /api/send-confirmation:
 *   post:
 *     summary: Send scholarship confirmation email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Confirmation email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Error sending email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
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
    // Validate required fields
    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide your full name and email address.",
      });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS ||
        process.env.EMAIL_USER.includes('placeholder') ||
        process.env.EMAIL_PASS.includes('placeholder')) {
      console.error("Email credentials not properly configured in .env file");
      return res.status(500).json({
        success: false,
        message: "Email service is not configured. Please contact the administrator.",
      });
    }

    // Verify transporter
    try {
      await transporter.verify();
      console.log("Email transporter verified successfully");
    } catch (verifyError) {
      console.warn("Email verification failed, but continuing:", verifyError);
    }

    // Compose scholarship confirmation email
    const mailOptions = {
      from: `"Mediacrest Applications" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Mediacrest Training College - Scholarship Application Received!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #621909; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Mediacrest Training College</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Your Scholarship Application Has Been Received!</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #621909; margin-top: 0;">Dear ${fullName},</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Thank you for your interest in our scholarship program! We're excited to help you start your journey in the digital world.
            </p>
            <div style="background-color: #f8f3f1; border-left: 4px solid #EB4823; padding: 20px; margin: 25px 0;">
              <h3 style="color: #621909; margin-top: 0;">Scholarship Details</h3>
              <p style="margin: 10px 0;"><strong>Program:</strong> Scholarship</p>
              <p style="margin: 10px 0;"><strong>Duration:</strong> Varies</p>
              <p style="margin: 10px 0 0 0; line-height: 1.6;">Your application is under review. We will contact you soon with next steps.</p>
            </div>
            <div style="background-color: #e8f4fd; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #621909; margin-top: 0;">Next Steps:</h3>
              <ol style="color: #333; line-height: 1.8; padding-left: 20px;">
                <li>Our admissions team will contact you within 48 hours</li>
                <li>Complete your enrollment and payment process</li>
                <li>Receive your welcome package and course materials</li>
                <li>Start your transformation journey with us</li>
              </ol>
            </div>
            <div style="margin: 25px 0; padding: 20px; border: 2px solid #EB4823; border-radius: 8px;">
              <h3 style="color: #621909; margin-top: 0;">Have Questions?</h3>
              <p style="margin: 10px 0; color: #333;">
                📞 <strong>Phone:</strong> +254 725 223 669<br>
                📧 <strong>Email:</strong> info@mediacrestcollege.com<br>
                📍 <strong>Location:</strong> Office Suites, Block B - 3rd Floor Parklands Road - Nairobi
              </p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 16px; color: #666;">
                Follow us on social media for updates and tips!
              </p>
              <div style="margin: 15px 0;">
                <a href="#" style="text-decoration: none; margin: 0 10px; color: #EB4823;">Facebook</a>
                <a href="#" style="text-decoration: none; margin: 0 10px; color: #EB4823;">Instagram</a>
                <a href="#" style="text-decoration: none; margin: 0 10px; color: #EB4823;">LinkedIn</a>
              </div>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
              <p><strong>Application Details:</strong></p>
              <p>Application submitted on: ${new Date().toLocaleString()}</p>
              <p>Contact Email: ${email}</p>
            </div>
          </div>
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p>© 2024 Mediacrest College. All rights reserved.</p>
            <p>This email was sent because you applied for our scholarship program.</p>
          </div>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Scholarship confirmation email sent to applicant:", email);
      res.status(200).json({
        success: true,
        message: "Scholarship application received successfully! Please check your email for details and next steps.",
      });
    } catch (error) {
      console.error("Scholarship email error:", error);
      let errorMessage = "An error occurred while processing your scholarship application. Please try again later.";
      if (error instanceof Error) {
        if (error.message.includes("Invalid login")) {
          errorMessage = "Email authentication failed. Please contact the administrator.";
        } else if (error.message.includes("connect")) {
          errorMessage = "Unable to connect to email service. Please try again later.";
        }
      }
      res.status(500).json({ success: false, message: errorMessage });
  }
});

module.exports = router;
