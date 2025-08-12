import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const testEmail = async (req: Request, res: Response) => {
  try {
    // Import nodemailer dynamically
    const nodemailer = await import("nodemailer");

    console.log("Testing email configuration...");
    console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
    console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_SECURE:", process.env.EMAIL_SECURE);

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: "Email credentials missing in .env file",
        config: {
          EMAIL_HOST: process.env.EMAIL_HOST || "NOT SET",
          EMAIL_PORT: process.env.EMAIL_PORT || "NOT SET",
          EMAIL_USER: process.env.EMAIL_USER || "NOT SET",
          EMAIL_PASS: process.env.EMAIL_PASS ? "SET" : "NOT SET",
          EMAIL_SECURE: process.env.EMAIL_SECURE || "NOT SET",
        }
      });
    }

    // Create transporter using custom mail server
    const transporter = nodemailer.default.createTransport({
      host: process.env.EMAIL_HOST || "mail.mediacrestcollege.com",
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

    // Test connection
    console.log("Testing transporter connection...");
    await transporter.verify();
    console.log("✅ Email transporter verified successfully");

    // Send test email
    const testEmailOptions = {
      from: `"MediaCrest Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to same email for testing
      subject: "Email Configuration Test - MediaCrest College",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #621909;">Email Test Successful! 🎉</h2>
          <p>This is a test email to verify your email configuration is working correctly.</p>
          <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Configuration Details:</h3>
            <ul>
              <li><strong>Host:</strong> ${process.env.EMAIL_HOST}</li>
              <li><strong>Port:</strong> ${process.env.EMAIL_PORT}</li>
              <li><strong>Secure:</strong> ${process.env.EMAIL_SECURE}</li>
              <li><strong>User:</strong> ${process.env.EMAIL_USER}</li>
              <li><strong>Test Time:</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>
          <p><em>If you received this email, your configuration is working properly!</em></p>
        </div>
      `,
    };

    console.log("Sending test email...");
    await transporter.sendMail(testEmailOptions);
    console.log("✅ Test email sent successfully");

    res.status(200).json({
      success: true,
      message: "Email test successful! Check your inbox.",
      config: {
        EMAIL_HOST: process.env.EMAIL_HOST,
        EMAIL_PORT: process.env.EMAIL_PORT,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_SECURE: process.env.EMAIL_SECURE,
        testEmailSentTo: process.env.EMAIL_USER,
      }
    });

  } catch (error) {
    console.error("❌ Email test failed:", error);
    
    let errorMessage = "Email test failed";
    let errorDetails = "";
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || "";
      
      if (error.message.includes("ENOTFOUND")) {
        errorMessage = "Email server not found. Check your EMAIL_HOST setting.";
      } else if (error.message.includes("ECONNREFUSED")) {
        errorMessage = "Connection refused. Check your EMAIL_PORT and EMAIL_HOST settings.";
      } else if (error.message.includes("Invalid login")) {
        errorMessage = "Authentication failed. Check your EMAIL_USER and EMAIL_PASS credentials.";
      } else if (error.message.includes("timeout")) {
        errorMessage = "Connection timeout. Check your server settings and internet connection.";
      }
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: errorDetails,
      config: {
        EMAIL_HOST: process.env.EMAIL_HOST || "NOT SET",
        EMAIL_PORT: process.env.EMAIL_PORT || "NOT SET", 
        EMAIL_USER: process.env.EMAIL_USER || "NOT SET",
        EMAIL_PASS: process.env.EMAIL_PASS ? "SET" : "NOT SET",
        EMAIL_SECURE: process.env.EMAIL_SECURE || "NOT SET",
      }
    });
  }
};
