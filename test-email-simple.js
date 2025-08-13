const nodemailer = require("nodemailer");
require("dotenv").config();

async function testEmail() {
  console.log("🧪 Testing email configuration...");
  console.log("📧 Email Host:", process.env.EMAIL_HOST);
  console.log("📧 Email User:", process.env.EMAIL_USER);
  console.log("📧 Email Port:", process.env.EMAIL_PORT);

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });

    console.log("🔍 Verifying transporter...");
    await transporter.verify();
    console.log("✅ Email transporter verified successfully!");

    // Send test email
    console.log("📤 Sending test email...");
    const info = await transporter.sendMail({
      from: `"Test Email" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: "Test Email - Configuration Working",
      html: `
        <h2>Email Configuration Test</h2>
        <p>This is a test email to verify that the email configuration is working properly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
        <p><strong>Host:</strong> ${process.env.EMAIL_HOST}</p>
        <hr>
        <p>If you received this email, your configuration is working correctly! 🎉</p>
      `,
    });

    console.log("✅ Test email sent successfully!");
    console.log("📧 Message ID:", info.messageId);
    console.log("📨 Email sent to:", process.env.RECIPIENT_EMAIL);
  } catch (error) {
    console.error("❌ Email test failed:", error.message);
    if (error.code) {
      console.error("🔴 Error Code:", error.code);
    }
    if (error.response) {
      console.error("🔴 Server Response:", error.response);
    }
  }
}

testEmail();
