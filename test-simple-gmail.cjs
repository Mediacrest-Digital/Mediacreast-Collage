const nodemailer = require("nodemailer");
require("dotenv").config();

async function quickTest() {
  console.log("🚀 Quick Gmail Auth Test");
  console.log(`📧 Testing: ${process.env.EMAIL_USER}`);

  const transporter = nodemailer.createTransport({
    service: "gmail", // Use service instead of host for Gmail
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    console.log("🔍 Testing authentication...");
    await transporter.verify();
    console.log("✅ SUCCESS! Gmail authentication works!");

    // Send test email
    const info = await transporter.sendMail({
      from: `"MediaCrest College" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: "Test - Email Configuration Working ✅",
      text: `Test email sent at ${new Date().toLocaleString()}`,
      html: `
        <h2>✅ Email Test Successful!</h2>
        <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
        <p><strong>To:</strong> ${process.env.RECIPIENT_EMAIL}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p>Your application forms will now work correctly!</p>
      `,
    });

    console.log(`📧 Test email sent to: ${process.env.RECIPIENT_EMAIL}`);
    console.log(`📬 Message ID: ${info.messageId}`);
    console.log("\n🎉 Your email system is now working!");
  } catch (error) {
    console.log("❌ Failed:", error.message);

    if (error.message.includes("Invalid login")) {
      console.log("\n💡 Gmail App Password needed:");
      console.log("1. Go to Gmail → Account → Security");
      console.log("2. Turn on 2-Factor Authentication");
      console.log("3. Generate App Password");
      console.log("4. Use that password in your .env file");
    }
  }
}

quickTest();
