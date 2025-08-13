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

    // Log the application locally (you can store in database here if needed)
    console.log("=== MASTERCLASS APPLICATION ===");
    console.log(`Date: ${new Date().toISOString()}`);
    console.log(`Name: ${firstName} ${lastName}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Expectations: ${expectations || 'Not provided'}`);
    console.log("===============================");

    // Check if application emails are disabled
    if (process.env.APPLICATION_EMAIL_DISABLED === 'true') {
      console.log("⚠️  APPLICATION EMAILS DISABLED: No masterclass email will be sent!");
      console.log("APPLICATION_EMAIL_DISABLED: Masterclass email would be sent to admin");
      console.log("APPLICATION_EMAIL_DISABLED: Masterclass application data:", { firstName, lastName, email, phone, expectations });
      
      return res.status(200).json({
        success: true,
        message: "Masterclass application received successfully! We'll contact you with payment details and confirmation.",
      });
    }

    // Try to forward to external API
    try {
      const response = await fetch("https://admin.mediacrestcollege.com/applications/api/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course: "masterclass",
          firstName,
          lastName,
          email,
          phone,
          expectations
        }),
      });

      if (response.ok) {
        console.log("Successfully forwarded to external admin API");
      } else {
        console.warn("Failed to forward to external admin API");
      }
    } catch (forwardError) {
      console.warn("Could not forward to external admin API:", forwardError);
    }

    // Send confirmation email
    try {
      // Import nodemailer dynamically
      const nodemailer = await import("nodemailer");

      // Create transporter
      const transporter = nodemailer.default.createTransporter({
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: parseInt(process.env.EMAIL_PORT || "587"),
        secure: process.env.EMAIL_SECURE === "true",    
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        },
        // Add timeout settings for better reliability
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
          console.warn("Email verification failed, but continuing:", verifyError);
        }
      }

      // Email to admin
      const adminEmail = {
        from: `"Mediacrest Applications" <${process.env.EMAIL_USER}>`,
        to: process.env.RECIPIENT_EMAIL || "applications@mediacrestcollege.com",
        subject: `New Masterclass Application: ${firstName} ${lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #621909; color: white; padding: 20px; text-align: center;">
              <h2>New Masterclass Application</h2>
            </div>
            <div style="padding: 20px; background-color: #f9f9f9;">
              <h3>Digital Marketing Masterclass Registration</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Name:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Date:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #ddd;">Saturday, August 23, 2025 at 10:00 AM</td>
                </tr>
              </table>
              
              ${expectations ? `
                <h4>Expectations:</h4>
                <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #621909;">
                  ${expectations}
                </p>
              ` : ''}
              
              <div style="margin-top: 20px; padding: 15px; background-color: #e8f4fd; border-radius: 5px;">
                <p style="margin: 0; color: #666;">
                  <strong>Action Required:</strong> Please confirm attendance and send payment details.
                </p>
              </div>
            </div>
          </div>
        `,
        replyTo: email,
      };

      await transporter.sendMail(adminEmail);
      console.log("Masterclass application email sent to admin");

    } catch (emailError) {
      console.warn("Failed to send masterclass email:", emailError);
    }

    res.status(200).json({
      success: true,
      message: "Masterclass application received successfully! We'll contact you with payment details and confirmation.",
    });

  } catch (error) {
    console.error("Masterclass application error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your application. Please try again later.",
    });
  }
};
