import { Request, Response } from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";

dotenv.config();

export const handleScholarshipEmail = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide your full name, email address, and phone number.",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address format.",
      });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || process.env.EMAIL_USER.includes('placeholder') || process.env.EMAIL_PASS.includes('placeholder')) {
      console.error("Email credentials not properly configured in .env file");
      return res.status(500).json({
        success: false,
        message: "Email service is not configured. Please contact the administrator.",
      });
    }

    // Import nodemailer dynamically to match application handler
    const nodemailerDynamic = await import("nodemailer");
    const transporter = nodemailerDynamic.default.createTransport({
      host: process.env.EMAIL_HOST || "mail.mediacrestcollege.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });

    // Verify transporter configuration (skip in development to match application handler)
    if (process.env.NODE_ENV === 'production') {
      try {
        await transporter.verify();
        console.log("Email transporter verified successfully");
      } catch (verifyError) {
        console.error("Email transporter verification failed:", verifyError);
        return res.status(500).json({
          success: false,
          message: "Email service configuration error. Please check your credentials.",
        });
      }
    } else {
      try {
        await transporter.verify();
        console.log("Email transporter verified successfully");
      } catch (verifyError) {
        console.warn("Email verification failed in development mode, but continuing:", verifyError);
      }
    }

    // Split fullName into firstName and lastName
    const [firstName, ...lastNameParts] = fullName.split(" ");
    const lastName = lastNameParts.join(" ") || "Applicant";

    // Email content for the applicant (detailed)
    const applicantMailOptions = {
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
            <h2 style="color: #621909; margin-top: 0;">Dear ${firstName} ${lastName},</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Thank you for applying for a scholarship at Mediacrest Training College! We're excited to review your application and support your journey in the digital world.
            </p>
            <div style="background-color: #f8f3f1; border-left: 4px solid #EB4823; padding: 20px; margin: 25px 0;">
              <h3 style="color: #621909; margin-top: 0;">Scholarship Details</h3>
              <p style="margin: 10px 0;"><strong>Program:</strong> Digital Marketing & AI Scholarship</p>
              <p style="margin: 10px 0;"><strong>Status:</strong> Under Review</p>
              <p style="margin: 10px 0 0 0; line-height: 1.6;">
                Your application is currently under review by our admissions team. We will contact you within 48 hours with further details.
              </p>
            </div>
            <div style="background-color: #e8f4fd; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #621909; margin-top: 0;">Next Steps:</h3>
              <ol style="color: #333; line-height: 1.8; padding-left: 20px;">
                <li>Admissions team will review your application within 48 hours.</li>
                <li>You may be contacted for additional documentation or an interview.</li>
                <li>Receive your scholarship decision and enrollment details.</li>
                <li>Begin your educational journey with Mediacrest College!</li>
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
              <p>Contact Phone: ${phone}</p>
            </div>
          </div>
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p>© 2024 Mediacrest College. All rights reserved.</p>
            <p>This email was sent because you applied for our scholarship program.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: "SCHOLARSHIP.pdf",
          path: path.resolve(__dirname, "../assets/SCHOLARSHIP.pdf"),
          contentType: "application/pdf"
        }
      ]
    };

    // Send email only to applicant, with detailed logging
    console.log("Attempting to send scholarship email to applicant:", email);
    try {
      const info = await transporter.sendMail(applicantMailOptions);
      console.log("Scholarship confirmation email sent to applicant:", email);
      console.log("Nodemailer response:", info);
    } catch (err) {
      console.error("Failed to send scholarship email to applicant:", err);
    }

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
      console.error("Detailed error:", error.message);
    }
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};