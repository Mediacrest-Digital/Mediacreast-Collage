const nodemailer = require("nodemailer");
require("dotenv").config();

async function fullTest() {
  console.log("🚀 Full Gmail Authentication and Email Test");
  console.log("");
  console.log("📧 Configuration:");
  console.log(`   Email: ${process.env.EMAIL_USER}`);
  console.log(`   Host: ${process.env.EMAIL_HOST}`);
  console.log(`   Port: ${process.env.EMAIL_PORT}`);
  console.log(
    `   Password: ${process.env.EMAIL_PASS ? "[SET - Length: " + process.env.EMAIL_PASS.length + "]" : "[NOT SET]"}`,
  );
  console.log(`   Recipient: ${process.env.RECIPIENT_EMAIL}`);
  console.log("");

  try {
    // Remove spaces from password (App passwords sometimes have spaces)
    const cleanPassword = process.env.EMAIL_PASS.replace(/\s+/g, "");
    console.log(`🔧 Cleaned password length: ${cleanPassword.length}`);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: cleanPassword, // Use cleaned password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log("🔍 Step 1: Testing connection...");
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Connection timeout after 30 seconds"));
      }, 30000);

      transporter.verify((error, success) => {
        clearTimeout(timeout);
        if (error) {
          reject(error);
        } else {
          resolve(success);
        }
      });
    });

    console.log("✅ Step 1: Connection successful!");
    console.log("");

    console.log("📤 Step 2: Sending test email...");
    const info = await transporter.sendMail({
      from: `"MediaCrest Test System" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: "🎉 Email System Test - SUCCESS!",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background-color: #621909; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">🎉 Email System Working!</h1>
          </div>
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #621909; margin-top: 0;">Congratulations!</h2>
            <p>Your email system is now fully configured and working!</p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #621909; margin-top: 0;">Configuration Details:</h3>
              <ul style="color: #333; line-height: 1.6;">
                <li><strong>Sender:</strong> ${process.env.EMAIL_USER}</li>
                <li><strong>Recipient:</strong> ${process.env.RECIPIENT_EMAIL}</li>
                <li><strong>SMTP Server:</strong> ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}</li>
                <li><strong>Test Time:</strong> ${new Date().toLocaleString()}</li>
              </ul>
            </div>

            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #4caf50;">
              <h4 style="color: #2e7d32; margin-top: 0;">✅ What This Means:</h4>
              <ul style="color: #2e7d32; line-height: 1.6;">
                <li>Contact forms will work perfectly</li>
                <li>Application forms will work perfectly</li>
                <li>All emails will be sent to: ${process.env.RECIPIENT_EMAIL}</li>
                <li>Your website is ready for production!</li>
              </ul>
            </div>

            <p style="margin-top: 30px; color: #666; font-style: italic;">
              This test email was sent from your MediaCrest College application system.
            </p>
          </div>
        </div>
      `,
    });

    console.log("✅ Step 2: Email sent successfully!");
    console.log("");
    console.log("🎊 SUCCESS! Email system is fully working!");
    console.log(`📧 Message ID: ${info.messageId}`);
    console.log(`📨 Test email sent to: ${process.env.RECIPIENT_EMAIL}`);
    console.log("");
    console.log("🎯 Next Steps:");
    console.log("1. Check your inbox at applications@mediacrestcollege.com");
    console.log("2. Your contact and application forms are now ready!");
    console.log(
      "3. All form submissions will be sent to applications@mediacrestcollege.com",
    );
  } catch (error) {
    console.log("");
    console.error("❌ Test failed:", error.message);
    console.log("");

    if (
      error.message.includes("Invalid login") ||
      error.message.includes("authentication")
    ) {
      console.log("🔐 Gmail Authentication Issues:");
      console.log(
        "1. Make sure 2-Factor Authentication is enabled on mediacresttrainingcollage@gmail.com",
      );
      console.log("2. Verify the App Password is exactly: kszs pmyi jstw wgnu");
      console.log("3. Try generating a new App Password from Gmail");
      console.log("4. Make sure you can log into the Gmail account normally");
    } else if (error.message.includes("timeout")) {
      console.log("⏰ Connection Issues:");
      console.log("1. Check your internet connection");
      console.log("2. Gmail SMTP might be temporarily unavailable");
      console.log("3. Try again in a few minutes");
    } else {
      console.log("🔧 Other Issues:");
      console.log("1. Check the error message above");
      console.log("2. Verify all email settings are correct");
    }
  }
}

fullTest();
