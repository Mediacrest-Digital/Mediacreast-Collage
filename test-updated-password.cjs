const nodemailer = require("nodemailer");

async function testGmailWithUpdatedPassword() {
  console.log("🔧 Testing Gmail SMTP with original MediaCrest account...\n");

  // Create transporter with original account
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // TLS
    auth: {
      user: "mediacrestdigital@gmail.com",
      pass: "bahp wzhh kbol crfz", // Original App Password
    },
    debug: true,
    logger: true,
  });

  try {
    console.log("📡 Testing connection...");
    await transporter.verify();
    console.log("✅ Gmail SMTP connection successful!");

    console.log("\n📧 Sending test email...");
    const info = await transporter.sendMail({
      from: '"MediaCrest College Test" <mediacrestdigital@gmail.com>',
      to: "mediacrestdigital@gmail.com",
      subject: "Test Email - MediaCrest Digital Account",
      text: "This is a test email sent using the original MediaCrest Digital Gmail account.",
      html: "<p>This is a test email sent using the <strong>original MediaCrest Digital Gmail account</strong>.</p>",
    });

    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

    return true;
  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.code === "EAUTH") {
      console.error("\n🔍 Authentication failed. Please check:");
      console.error("1. Gmail account has 2-Factor Authentication enabled");
      console.error("2. App Password is correctly generated");
      console.error("3. Gmail account is not locked or restricted");
    }
    return false;
  }
}

testGmailWithUpdatedPassword()
  .then((success) => {
    if (success) {
      console.log("\n🎉 Gmail configuration is working properly!");
    } else {
      console.log("\n❌ Gmail configuration needs attention.");
    }
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Unexpected error:", error);
    process.exit(1);
  });
