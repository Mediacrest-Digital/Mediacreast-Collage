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

    // Create transporter
    const transporter = nodemailer.createTransport({
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

    // Verify transporter configuration (skip in development)
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

    // Email content for the applicant
    const applicantMailOptions = {
      from: `"Mediacrest Scholarship Applications" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Congratulations! Your Scholarship Application Has Been Approved!",
      html: `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">

          <!-- HEADER -->
          <div style="padding: 20px; text-align: center; background-color: #621909; color: white;">
            <h1 style="margin: 0; font-size: 22px; font-weight: bold;">
              Congratulations! Your Scholarship Application Has Been Approved!
            </h1>
          </div>

          <!-- BODY -->
          <div style="padding: 30px;">
            <h2 style="color: #EB4823; margin-top: 0;">Dear ${firstName},</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              I am pleased to inform you that your application for the 
              <strong>Digital Marketing & AI Certification Course Scholarship Program</strong> 
              at Mediacrest Training College has been approved.<br><br>
              <strong>Congratulations!</strong> We look forward to having you on board and supporting your learning journey.
            </p>

            <!-- PROGRAM DETAILS -->
            <div style="background-color: #f8f3f1; border-left: 4px solid #EB4823; padding: 20px; margin: 25px 0;">
              <h3 style="margin-top: 0;">Program Details</h3>
              <p style="margin: 10px 0;">Classes commence on <strong>1st October 2025</strong>.</p>
              <p style="margin: 10px 0;">Tuition fully covered by our development partners.</p>
              <p style="margin: 10px 0;">
                However, you will be required to pay statutory charges associated with the program. 
                The deadline to settle these statutory charges is <strong>26th September 2025</strong>.
              </p>
              <p style="margin: 10px 0;">This program runs for 4 weeks. Full details are in the attached document.</p>
            </div>

            <!-- CONTACT INFO -->
            <div style="margin: 25px 0; padding: 20px; border: 2px solid #EB4823; border-radius: 8px;">
              <h3 style="color: #621909; margin-top: 0;">Have Questions?</h3>
              <p style="margin: 10px 0; color: #333;">
                📞 <strong>Phone:</strong> +254 725 223 669<br>
                📧 <strong>Email:</strong> admissions@mediacrestcollege.com<br>
                📍 <strong>Location:</strong> Office Suites, Block B - 3rd Floor Parklands Road - Nairobi
              </p>
            </div>

            <!-- SIGNATURE FOOTER -->
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #EB4823; color: #333; font-size: 14px; line-height: 1.6; font-family: Arial, sans-serif;">
              <p style="margin: 0; font-weight: bold; color:#621909;">Humphrey Otwande</p>
              <p style="margin: 0; color:#621909;">Head of Scholarships</p>
              <p style="margin: 0;">Mediacrest Foundation</p>
              <p style="margin: 0;">Office Suites, Block B, 3rd Floor Parklands Rd, Nairobi</p>
              <p style="margin: 0;">
                Mob: <a href="tel:+254725223669" style="color:#333; text-decoration:none;">+254 725 223669</a> | 
                <a href="https://wa.me/254725223669" style="color:#EB4823; text-decoration:none;">WhatsApp</a> | 
                <a href="https://www.mediacrest.africa" style="color:#EB4823; text-decoration:none;">www.mediacrest.africa</a>
              </p>
            </div>
          </div>

          <!-- GENERIC FOOTER -->
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px; line-height: 1.5; font-family: Arial, sans-serif;">
            <p>© 2025 Mediacrest Foundation. All rights reserved.</p>
            <p>You are receiving this email because you applied for our scholarship program.</p>
            <p style="margin-top: 15px; font-size: 11px; color: #999;">
              This email and any attachments are confidential and intended solely for the use of the individual to whom it is addressed. 
              If you have received this email in error, please notify us immediately.
            </p>
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