import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const handleContactForm = async (req: Request, res: Response) => {
  try {
    // Import nodemailer dynamically to avoid issues with Vite config
    const nodemailer = await import("nodemailer");
    
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // Check if we're in test mode
    if (process.env.TEST_MODE === 'true') {
      console.log("⚠️  TEST MODE ENABLED: No email will be sent!");
      console.log("TEST MODE: Email would be sent to:", process.env.RECIPIENT_EMAIL);
      console.log("TEST MODE: Contact form data:", { firstName, lastName, email, phone, subject, message });
      
      return res.status(200).json({
        success: true,
        message: "⚠️ TEST MODE: Your message was received but NO EMAIL was sent. Please configure email credentials.",
      });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email credentials missing in .env file");
      return res.status(500).json({
        success: false,
        message: "Email service is not configured. Please contact the administrator.",
      });
    }

    if (process.env.EMAIL_PASS.includes('your-gmail-app-password') || 
        process.env.EMAIL_USER.includes('your-email@')) {
      console.error("Email credentials are still placeholder values");
      return res.status(500).json({
        success: false,
        message: "Email service is not configured. Please contact the administrator.",
      });
    }


    // Create transporter using custom mail server
    const transporter = nodemailer.default.createTransport({
      host: process.env.EMAIL_HOST || "mail.mediacrestcollege.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

    });

    // Verify transporter configuration
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

    // Email content for the recipient (hr@mediacrest.africa)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || "hr@mediacrest.africa",

      // Add additional options for better reliability
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      },
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
    });

    // Verify transporter configuration (skip in development to avoid blocking)
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

    // Email content for the recipient
    const mailOptions = {
      from: `"MediaCrest College" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || "applications@mediacrestcollege.com",

      subject: `New Contact Form Submission: ${subject}`,
      html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; border-radius: 8px; overflow: hidden;">
      <!-- Header -->
      <div style="background-color: #621909; color: white; padding: 24px; text-align: center;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h2>
      </div>

      <!-- Body -->
      <div style="padding: 24px; background-color: #ffffff;">
        <h3 style="color: #621909; font-size: 20px; font-weight: 600; margin: 0 0 16px;">Contact Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 16px; color: #333;">
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e0e0e0; font-weight: 600; width: 30%;">Name</td>
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
            <td style="padding: 12px 16px; border-bottom: 1px solid #e0e0e0; font-weight: 600;">Subject</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #e0e0e0;">${subject}</td>
          </tr>
        </table>

        <!-- Message Section -->
        <h3 style="color: #621909; font-size: 20px; font-weight: 600; margin: 24px 0 16px;">Message</h3>
        <div style="background-color: #f9f9f9; padding: 16px; border-radius: 6px; border-left: 4px solid #621909; font-size: 16px; color: #333; line-height: 1.5;">
          ${message.replace(/\n/g, '<br>')}
        </div>

        <!-- Footer Note -->
        <div style="margin-top: 24px; padding: 16px; background-color: #e8f4fd; border-radius: 6px; font-size: 14px; color: #555;">
          <p style="margin: 0; line-height: 1.4;">

            <strong>Note:</strong> This email was sent from the MediaCrest College contact form on ${new Date().toLocaleString()}.

          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #621909; color: #ffffff; padding: 16px; text-align: center; font-size: 12px;">

        <p style="margin: 0;">&copy; ${new Date().getFullYear()} MediaCrest College. All rights reserved.</p>

      </div>
    </div>
      `,
      replyTo: email, 
    };

    // Send email
    console.log("Attempting to send email to:", process.env.RECIPIENT_EMAIL);
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    res.status(200).json({
      success: true,
      message: "Thank you! Your message has been sent successfully. We will get back to you soon.",
    });

  } catch (error) {
    console.error("Contact form error:", error);
    
    // Provide more specific error messages
    let errorMessage = "An error occurred while sending your message. Please try again later.";
    
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