import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const handleMasterclassApplication = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, expectations } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }


    // Check if we're in test mode
    if (process.env.TEST_MODE === 'true') {
      console.log("⚠️  TEST MODE ENABLED: No masterclass email will be sent!");
      console.log("TEST MODE: Masterclass email would be sent to:", process.env.RECIPIENT_EMAIL);
      console.log("TEST MODE: Masterclass data:", { firstName, lastName, email, phone, expectations });
      
      return res.status(200).json({
        success: true,
        message: "⚠️ TEST MODE: Masterclass application received but NO EMAIL was sent. Please configure email credentials.",
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

    // Import nodemailer dynamically
    const nodemailer = await import("nodemailer");

    // Create transporter using Gmail settings from .env
    const transporter = nodemailer.default.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });

    // Skip verification in development to avoid blocking the application
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
      // In development, try to verify but don't fail if it doesn't work
      try {
        await transporter.verify();
        console.log("Email transporter verified successfully");
      } catch (verifyError) {
        console.warn("Email verification failed in development mode, but continuing:", verifyError);
      }
    }

    // Email content for admin notification
    const adminMailOptions = {
      from: `"MediaCrest Masterclass" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || "applications@mediacrestcollege.com",
      subject: `New Masterclass Registration: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background-color: #621909; color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">MediaCrest College</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">New Masterclass Registration</p>
          </div>

          <!-- Main Content -->
          <div style="padding: 30px;">
            <h2 style="color: #621909; margin-top: 0;">Digital Marketing Masterclass Registration</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #621909; margin-top: 0;">Participant Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e0e0e0; font-weight: 600;">Name</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e0e0e0;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e0e0e0; font-weight: 600;">Email</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e0e0e0;">
                    <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e0e0e0; font-weight: 600;">Phone</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e0e0e0;">
                    <a href="tel:${phone}" style="color: #007bff; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e0e0e0; font-weight: 600;">Registration Date</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e0e0e0;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>

            ${expectations ? `
              <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
                <h3 style="color: #856404; margin-top: 0;">Participant Expectations</h3>
                <p style="color: #856404; margin-bottom: 0;">${expectations}</p>
              </div>
            ` : ''}

            <div style="background-color: #d1ecf1; padding: 20px; border-radius: 8px; border-left: 4px solid #bee5eb; margin: 20px 0;">
              <h3 style="color: #0c5460; margin-top: 0;">Event Details</h3>
              <ul style="color: #0c5460; margin-bottom: 0;">
                <li><strong>Event:</strong> Digital Marketing Masterclass</li>
                <li><strong>Date:</strong> Saturday, August 23, 2025</li>
                <li><strong>Time:</strong> 10:00 AM</li>
                <li><strong>Registration Time:</strong> ${new Date().toLocaleString()}</li>
              </ul>
            </div>

            <div style="background-color: #f8d7da; padding: 20px; border-radius: 8px; border-left: 4px solid #f5c6cb; margin: 20px 0;">
              <h3 style="color: #721c24; margin-top: 0;">Action Required</h3>
              <p style="color: #721c24; margin-bottom: 0;">
                <strong>Please contact this participant within 24 hours to:</strong><br>
                • Send payment details and confirmation instructions<br>
                • Provide event location and joining details<br>
                • Answer any questions they may have
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p>© 2024 MediaCrest College. All rights reserved.</p>
            <p>This email was sent because someone registered for the Digital Marketing Masterclass.</p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Send email to admin
    console.log("Attempting to send masterclass registration email to:", process.env.RECIPIENT_EMAIL || "applications@mediacrestcollege.com");
    await transporter.sendMail(adminMailOptions);
    console.log("Masterclass registration email sent successfully");

    res.status(200).json({
      success: true,
      message: "Masterclass registration received successfully! We'll contact you with payment details and confirmation.",
    });

  } catch (error) {
    console.error("Masterclass registration error:", error);
    
    // Provide more specific error messages
    let errorMessage = "An error occurred while processing your registration. Please try again later.";
    
    if (error instanceof Error) {
      if (error.message.includes("ENOTFOUND")) {
        errorMessage = "Email server not found. Please contact us directly.";
      } else if (error.message.includes("ECONNREFUSED")) {
        errorMessage = "Connection refused. Please contact us directly.";
      } else if (error.message.includes("Invalid login")) {
        errorMessage = "Email authentication failed. Please contact us directly.";
      } else if (error.message.includes("timeout")) {
        errorMessage = "Connection timeout. Please try again or contact us directly.";
      }
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};
