import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.verify();
    console.log("✅ SMTP connection successful!");

    const info = await transporter.sendMail({
      from: `"Mediacrest Foundation Scholarships" <${process.env.EMAIL_USER}>`,
      to: "makuanikennedy@gmail.com",
      subject: "Scholarship Application Test",
      html: `
        <h2>Scholarship Email Test</h2>
        <p>This is a test to confirm your scholarship email setup is working.</p>
        <p>If you received this, Nodemailer and your SMTP credentials are correct!</p>
      `,
    });

    console.log("✅ Test email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email test failed:", error);
  }
}

sendTestEmail();
