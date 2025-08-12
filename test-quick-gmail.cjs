const nodemailer = require("nodemailer");
require("dotenv").config();

async function quickGmailTest() {
  console.log("🧪 Quick Gmail App Password Test");
  console.log(`📧 Testing: ${process.env.EMAIL_USER}`);
  console.log(`📨 Will send to: ${process.env.RECIPIENT_EMAIL}`);

  const transporter = nodemailer.createTransport({
    service: "gmail", // Use service instead of host for Gmail
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App Password
    },
    // Add timeout settings
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 5000, // 5 seconds
    socketTimeout: 10000, // 10 seconds
  });

  try {
    console.log("🔐 Testing Gmail authentication...");

    // Test with a timeout
    const verifyPromise = transporter.verify();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Authentication timeout")), 15000),
    );

    await Promise.race([verifyPromise, timeoutPromise]);
    console.log("✅ Gmail authentication SUCCESS!");

    // Send test email
    console.log("📤 Sending test email...");
    const info = await transporter.sendMail({
      from: `"MediaCrest Test" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: "Email Test - SUCCESS ✅",
      text: `Email configuration test successful!\n\nFrom: ${process.env.EMAIL_USER}\nTo: ${process.env.RECIPIENT_EMAIL}\nTime: ${new Date().toISOString()}`,
      html: `
        <h2 style="color: #621909;">🎉 Email Configuration Working!</h2>
        <p>Your email system is now working correctly!</p>
        <ul>
          <li><strong>From:</strong> ${process.env.EMAIL_USER}</li>
          <li><strong>To:</strong> ${process.env.RECIPIENT_EMAIL}</li>
          <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
        </ul>
        <p>All applications and contact forms will now be sent to ${process.env.RECIPIENT_EMAIL}</p>
      `,
    });

    console.log("✅ TEST EMAIL SENT SUCCESSFULLY!");
    console.log(`📧 Message ID: ${info.messageId}`);
    console.log(`📨 Check ${process.env.RECIPIENT_EMAIL} for the test email`);
    console.log(
      "\n🎊 Your email system is working! Forms will now send emails.",
    );
  } catch (error) {
    console.error("❌ Test failed:", error.message);

    if (error.message.includes("Invalid login")) {
      console.log("\n🔐 Authentication Issue:");
      console.log("- Check that 2-Factor Authentication is enabled on Gmail");
      console.log("- Verify the App Password is correct: bsob kjqe glvh zgln");
      console.log("- Make sure the Gmail account exists and is accessible");
    } else if (error.message.includes("timeout")) {
      console.log(
        "\n⏰ Connection timeout - this might still work in production",
      );
    }
  }
}

quickGmailTest();
