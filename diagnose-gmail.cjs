const nodemailer = require("nodemailer");
require("dotenv").config();

async function diagnoseGmailAuth() {
  console.log("🔍 Gmail Authentication Diagnosis");
  console.log("================================");
  console.log("");

  console.log("Current Configuration:");
  console.log(`📧 Email: ${process.env.EMAIL_USER}`);
  console.log(`🏠 Host: ${process.env.EMAIL_HOST}`);
  console.log(`🔌 Port: ${process.env.EMAIL_PORT}`);
  console.log(`🔒 Secure: ${process.env.EMAIL_SECURE}`);
  console.log(
    `🔑 Password: ${process.env.EMAIL_PASS ? "[HIDDEN - Length: " + process.env.EMAIL_PASS.length + "]" : "NOT SET"}`,
  );
  console.log("");

  // Test different Gmail configurations
  const configs = [
    {
      name: "Current Config",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
    },
    {
      name: "Gmail SSL",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
    },
    {
      name: "Gmail TLS Alt",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
    },
  ];

  for (const config of configs) {
    try {
      console.log(`🧪 Testing: ${config.name}`);
      console.log(
        `   ${config.host}:${config.port} (secure: ${config.secure})`,
      );

      const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        requireTLS: config.requireTLS || false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      });

      // Test with timeout
      const verifyPromise = transporter.verify();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout after 15 seconds")), 15000),
      );

      await Promise.race([verifyPromise, timeoutPromise]);

      console.log("   ✅ SUCCESS! This configuration works.");
      console.log("");

      // If successful, send a test email
      console.log("📤 Sending test email...");
      const info = await transporter.sendMail({
        from: `"MediaCrest Test" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Send to same email
        subject: "✅ Gmail SMTP Test Successful",
        html: `
          <h2 style="color: #621909;">✅ Gmail SMTP Working!</h2>
          <p>Your Gmail SMTP configuration is working correctly.</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <h3>Working Configuration:</h3>
            <ul>
              <li>Host: ${config.host}</li>
              <li>Port: ${config.port}</li>
              <li>Secure: ${config.secure}</li>
              <li>Email: ${process.env.EMAIL_USER}</li>
            </ul>
          </div>
          <p>Your contact and application forms should now work!</p>
        `,
      });

      console.log("   📧 Test email sent successfully!");
      console.log(`   📨 Message ID: ${info.messageId}`);

      // Update .env recommendation
      console.log("");
      console.log("🎊 RECOMMENDATION: Update your .env file with:");
      console.log(`EMAIL_HOST=${config.host}`);
      console.log(`EMAIL_PORT=${config.port}`);
      console.log(`EMAIL_SECURE=${config.secure}`);
      if (config.requireTLS) {
        console.log(`EMAIL_REQUIRE_TLS=true`);
      }

      return; // Exit on first success
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);

      if (
        error.message.includes("Invalid login") ||
        error.message.includes("535")
      ) {
        console.log("   🔐 Authentication issue - likely password problem");
      } else if (error.message.includes("Timeout")) {
        console.log("   ⏰ Connection timeout");
      }
    }
    console.log("");
  }

  console.log("❌ All Gmail configurations failed.");
  console.log("");
  console.log("🚨 TROUBLESHOOTING STEPS:");
  console.log("");
  console.log("1. 📧 Verify Gmail Account:");
  console.log(`   - Log into ${process.env.EMAIL_USER} directly`);
  console.log("   - Make sure the account exists and works");
  console.log("");
  console.log("2. 🔑 Check Password/App Password:");
  console.log("   - If 2FA is enabled: Generate App Password");
  console.log("   - Go to: https://myaccount.google.com/apppasswords");
  console.log('   - Create app password for "Mail"');
  console.log("   - Use that 16-character password (no spaces)");
  console.log("");
  console.log("3. 🔒 Enable Less Secure Apps (if not using 2FA):");
  console.log("   - Go to: https://myaccount.google.com/lesssecureapps");
  console.log('   - Turn ON "Less secure app access"');
  console.log("");
  console.log("4. 🌐 Alternative: Use a different email service");
  console.log("   - Consider using your hosting provider's SMTP");
  console.log("   - Or use a service like SendGrid, Mailgun, etc.");
}

diagnoseGmailAuth();
