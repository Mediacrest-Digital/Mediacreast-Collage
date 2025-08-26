import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

async function sendTestEmailWithPDF() {
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
      subject: "Scholarship Application Test with PDF",
      html: `
        <h2>Scholarship Email Test</h2>
        <p>This is a test to confirm your scholarship email setup is working and includes a PDF attachment.</p>
        <p>If you received this and the PDF, Nodemailer and your SMTP credentials are correct!</p>
      `,
      attachments: [
        {
          filename: "scholarship-info.pdf",
          path: path.join("server/assets/scholarship-info.pdf"),
          contentType: "application/pdf",
        },
      ],
    });

    console.log("✅ Test email with PDF sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email test with PDF failed:", error);
  }
}

sendTestEmailWithPDF();
