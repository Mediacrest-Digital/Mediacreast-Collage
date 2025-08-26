import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

async function sendTestScholarshipEmail() {
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
      to: "janyango187@gmail.com",
      subject: "Your Scholarship Application Received!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #621909; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Mediacrest Foundation</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Your Scholarship Application Has Been Received!</p>
          </div>
          <div style="padding: 30px;">
            <h2 style="color: #621909; margin-top: 0;">Dear Kennedy,</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Thank you for applying for our scholarship program! We have received your application and will review it soon.
            </p>
            <h3 style="color: #EB4823; margin-top: 24px;">Scholarship Details (Dummy Data)</h3>
            <ul style="font-size: 16px; color: #333; line-height: 1.8;">
              <li><strong>Program:</strong> Digital Marketing & AI Scholarship</li>
              <li><strong>Duration:</strong> 6 Months</li>
              <li><strong>Start Date:</strong> October 1, 2025</li>
              <li><strong>Location:</strong> Nairobi Campus & Online</li>
              <li><strong>Benefits:</strong> Full tuition coverage, mentorship, internship opportunities</li>
            </ul>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 18px;">
              Please find attached a PDF with more information about the scholarship program.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              If you have any questions, reply to this email or contact us at scholarships@mediacrestfoundation.org.
            </p>
            <div style="margin-top: 30px; color: #666; font-size: 12px; text-align: center;">
              <p>© 2025 Mediacrest Foundation. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: "scholarship-info.pdf",
          path: path.join("server/assets/scholarship-info.pdf"),
          contentType: "application/pdf",
        },
      ],
    });

    console.log("✅ Test scholarship email with PDF sent:", info.messageId);
  } catch (error) {
    console.error("❌ Test scholarship email with PDF failed:", error);
  }
}

sendTestScholarshipEmail();
