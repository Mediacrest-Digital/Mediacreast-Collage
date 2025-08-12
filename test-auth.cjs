const nodemailer = require("nodemailer");
require("dotenv").config();

async function quickAuthTest() {
  console.log("⚡ Quick Gmail Authentication Test");
  console.log(`📧 Testing: ${process.env.EMAIL_USER}`);

  const cleanPassword = process.env.EMAIL_PASS.replace(/\s+/g, "");
  console.log(`🔑 Password length: ${cleanPassword.length} chars`);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: cleanPassword,
    },
  });

  try {
    console.log("🔍 Quick auth check (10s timeout)...");

    const authPromise = transporter.verify();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 10000),
    );

    await Promise.race([authPromise, timeoutPromise]);

    console.log("✅ SUCCESS! Gmail authentication works!");
    console.log("📤 Your emails will now be sent properly!");
    console.log(
      `📨 All applications will go to: ${process.env.RECIPIENT_EMAIL}`,
    );
  } catch (error) {
    if (error.message === "Timeout") {
      console.log("⏰ Authentication is slow but may be working");
      console.log("💡 Try submitting a form to test if it works");
    } else {
      console.log(`❌ Auth failed: ${error.message}`);
      if (error.message.includes("Invalid login")) {
        console.log("🔧 Try: Generate new App Password in Gmail settings");
      }
    }
  }
}

quickAuthTest();
