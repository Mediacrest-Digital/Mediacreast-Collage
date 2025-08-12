const net = require("net");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Test basic connectivity first
async function testConnectivity(host, port) {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    const timeout = 5000;

    socket.setTimeout(timeout);

    socket.on("connect", () => {
      console.log(`✅ Can connect to ${host}:${port}`);
      socket.destroy();
      resolve(true);
    });

    socket.on("timeout", () => {
      console.log(`⏰ Connection timeout to ${host}:${port}`);
      socket.destroy();
      reject(new Error("Connection timeout"));
    });

    socket.on("error", (err) => {
      console.log(`❌ Cannot connect to ${host}:${port} - ${err.message}`);
      reject(err);
    });

    socket.connect(port, host);
  });
}

async function quickEmailTest() {
  console.log("🚀 Quick Email Configuration Test\n");

  // Test configurations to try
  const configs = [
    { host: "mediacrestcollege.com", port: 587 },
    { host: "mail.mediacrestcollege.com", port: 587 },
    { host: "smtp.mediacrestcollege.com", port: 587 },
    { host: "mediacrestcollege.com", port: 465 },
    { host: "mediacrestcollege.com", port: 25 },
  ];

  let workingConfig = null;

  // Test basic connectivity first
  for (const config of configs) {
    console.log(`🔍 Testing connectivity to ${config.host}:${config.port}...`);
    try {
      await testConnectivity(config.host, config.port);
      workingConfig = config;
      break;
    } catch (error) {
      console.log(`   Failed: ${error.message}`);
    }
  }

  if (!workingConfig) {
    console.log("\n❌ No email server responded. Possible issues:");
    console.log("1. Domain DNS is not properly configured");
    console.log("2. Email service is not set up on this domain");
    console.log("3. Firewall blocking connections");
    console.log("4. Need to contact hosting provider for correct settings");
    return;
  }

  console.log(
    `\n✅ Found working server: ${workingConfig.host}:${workingConfig.port}`,
  );

  // Now test SMTP authentication
  console.log("\n📧 Testing SMTP authentication...");

  try {
    const transporter = nodemailer.createTransport({
      host: workingConfig.host,
      port: workingConfig.port,
      secure: workingConfig.port === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    });

    await transporter.verify();
    console.log("✅ SMTP authentication successful!");

    // Send test email
    console.log("\n📤 Sending test email...");
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Email Test - SUCCESS!",
      text: `Email configuration working! Server: ${workingConfig.host}:${workingConfig.port}`,
    });

    console.log("✅ Test email sent!");
    console.log(`📧 Message ID: ${info.messageId}`);

    console.log("\n🎊 SUCCESS! Update your .env file:");
    console.log(`EMAIL_HOST=${workingConfig.host}`);
    console.log(`EMAIL_PORT=${workingConfig.port}`);
    console.log(`EMAIL_SECURE=${workingConfig.port === 465}`);
  } catch (error) {
    console.log(`❌ SMTP test failed: ${error.message}`);

    if (error.message.includes("Invalid login")) {
      console.log("\n🔐 Authentication failed. Please check:");
      console.log("1. Email address is correct");
      console.log("2. Password is correct (not app password)");
      console.log("3. Email account exists on the server");
    }
  }
}

quickEmailTest().catch(console.error);
