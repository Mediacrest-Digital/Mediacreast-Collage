const nodemailer = require("nodemailer");
require("dotenv").config();

async function testGmailConfiguration() {
  console.log("🧪 Testing Gmail Configuration...");
  console.log("📧 Current Config:");
  console.log(`   HOST: ${process.env.EMAIL_HOST}`);
  console.log(`   PORT: ${process.env.EMAIL_PORT}`);
  console.log(`   USER: ${process.env.EMAIL_USER}`);
  console.log(`   RECIPIENT: ${process.env.RECIPIENT_EMAIL}`);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    console.log("🔍 Verifying Gmail connection...");

    // Add timeout to verification
    const verifyPromise = transporter.verify();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Verification timeout after 45 seconds")),
        45000,
      ),
    );

    await Promise.race([verifyPromise, timeoutPromise]);
    console.log("✅ Gmail authentication successful!");

    // Send test email
    console.log("📤 Sending test email...");
    const info = await transporter.sendMail({
      from: `"MediaCrest Test" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: "Email Configuration Test - SUCCESS ✅",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background-color: #621909; color: white; padding: 20px; text-align: center;">
            <h2>🎉 Email Configuration Working!</h2>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Your email configuration is now working correctly!</p>
            <div style="background-color: white; padding: 15px; border-radius: 5px;">
              <h3>Configuration Details:</h3>
              <ul>
                <li><strong>From:</strong> ${process.env.EMAIL_USER}</li>
                <li><strong>To:</strong> ${process.env.RECIPIENT_EMAIL}</li>
                <li><strong>SMTP:</strong> ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}</li>
                <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
              </ul>
            </div>
            <p><strong>What this means:</strong></p>
            <ul>
              <li>✅ Contact forms will work</li>
              <li>✅ Application forms will work</li>
              <li>✅ Emails will be sent to: ${process.env.RECIPIENT_EMAIL}</li>
            </ul>
          </div>
        </div>
      `,
    });

    console.log("\n🎊 SUCCESS! Email system is working!");
    console.log(`📧 Message ID: ${info.messageId}`);
    console.log(`📨 Test email sent to: ${process.env.RECIPIENT_EMAIL}`);
    console.log("\n💡 Your forms will now send emails successfully!");
  } catch (error) {
    console.error("\n❌ Gmail test failed:", error.message);

    if (error.message.includes("Invalid login")) {
      console.log("\n🔐 Gmail Authentication Issue:");
      console.log(
        "The password might be incorrect or you need an App Password.",
      );
      console.log("");
      console.log("📋 To fix this:");
      console.log("1. Make sure the Gmail account exists");
      console.log(
        "2. If 2-Factor Authentication is enabled, create an App Password:",
      );
      console.log("   - Go to Gmail → Settings → Security");
      console.log("   - Generate App Password");
      console.log("   - Use that password instead of your regular password");
      console.log(
        '3. Make sure "Less secure app access" is enabled (if not using App Password)',
      );
    }

    console.log("\n💡 Alternative: You could also:");
    console.log(
      "- Use your regular mediacresttrainingcollege@gmail.com with correct password",
    );
    console.log(
      "- Set up a proper email server for application@mediacresttrainingcollege.com",
    );
  }
}

testGmailConfiguration();
