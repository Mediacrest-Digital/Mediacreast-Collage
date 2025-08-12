const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  console.log('🧪 Testing email configuration...');
  console.log('📧 Email Host:', process.env.EMAIL_HOST);
  console.log('📧 Email User:', process.env.EMAIL_USER);
  console.log('📧 Email Port:', process.env.EMAIL_PORT);
  
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true',
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

    console.log('🔍 Verifying transporter...');
    await transporter.verify();
    console.log('✅ Email transporter verified successfully!');

    // Send test email
    console.log('📤 Sending test email...');
    const info = await transporter.sendMail({
      from: `"Test Email" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'Test Email - Configuration Working',
      html: `
        <h2>Email Configuration Test</h2>
        <p>This is a test email to verify that the email configuration is working properly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
        <p><strong>Host:</strong> ${process.env.EMAIL_HOST}</p>
        <hr>
        <p>If you received this email, your configuration is working correctly! 🎉</p>
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📨 Email sent to:', process.env.RECIPIENT_EMAIL);
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    if (error.code) {
      console.error('🔴 Error Code:', error.code);
    }
    if (error.response) {
      console.error('🔴 Server Response:', error.response);
    }
  }
}

testEmail();

  // Check if required variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ ERROR: EMAIL_USER or EMAIL_PASS not configured in .env file');
    console.log('\n💡 Please update your .env file with the correct credentials:');
    console.log('   EMAIL_HOST=mail.mediacrestcollege.com');
    console.log('   EMAIL_PORT=587');
    console.log('   EMAIL_SECURE=false');
    console.log('   EMAIL_USER=application@mediacrestcollege.com');
    console.log('   EMAIL_PASS=your_actual_password');
    process.exit(1);
  }

  if (process.env.EMAIL_PASS === 'your_email_password_here') {
    console.error('❌ ERROR: Please replace "your_email_password_here" with your actual email password');
    process.exit(1);
  }

  try {
    // Create transporter
    console.log('🔧 Creating email transporter...');
    const transporter = nodemailer.createTransporter({
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
    console.log('🔍 Testing connection to email server...');
    await transporter.verify();
    console.log('✅ Connection successful!\n');

    // Send test email
    console.log('📤 Sending test email...');
    const testEmailOptions = {
      from: `"MediaCrest Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to same email for testing
      subject: "✅ Email Configuration Test - MediaCrest College",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #621909; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0;">🎉 Email Configuration Test Successful!</h2>
          </div>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px;">
            <p>Congratulations! Your email configuration is working correctly.</p>
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #621909; margin-top: 0;">Configuration Details:</h3>
              <ul style="color: #333;">
                <li><strong>Host:</strong> ${process.env.EMAIL_HOST}</li>
                <li><strong>Port:</strong> ${process.env.EMAIL_PORT}</li>
                <li><strong>Secure:</strong> ${process.env.EMAIL_SECURE}</li>
                <li><strong>User:</strong> ${process.env.EMAIL_USER}</li>
                <li><strong>Test Time:</strong> ${new Date().toLocaleString()}</li>
              </ul>
            </div>
            <p style="color: #666; font-style: italic;">
              Your contact forms and application forms will now work properly using the application@mediacrestcollege.com email address.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(testEmailOptions);
    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    if (info.accepted && info.accepted.length > 0) {
      console.log(`   Accepted: ${info.accepted.join(', ')}`);
    }
    if (info.rejected && info.rejected.length > 0) {
      console.log(`   Rejected: ${info.rejected.join(', ')}`);
    }

    console.log('\n🎊 SUCCESS! Your email configuration is working properly.');
    console.log(`📬 Check your inbox at ${process.env.EMAIL_USER} for the test email.`);
    
  } catch (error) {
    console.error('\n❌ Email test failed:');
    
    if (error.message.includes('ENOTFOUND')) {
      console.error('   🔍 Email server not found. Check your EMAIL_HOST setting.');
      console.error('   💡 Try these common alternatives:');
      console.error('      - smtp.mediacrestcollege.com');
      console.error('      - mail.mediacrestcollege.com');
      console.error('      - mediacrestcollege.com');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('   🚫 Connection refused. Check your EMAIL_PORT and EMAIL_HOST settings.');
      console.error('   💡 Common ports: 587 (TLS), 465 (SSL), 25 (non-secure)');
    } else if (error.message.includes('Invalid login')) {
      console.error('   🔐 Authentication failed. Check your EMAIL_USER and EMAIL_PASS credentials.');
    } else if (error.message.includes('timeout')) {
      console.error('   ⏰ Connection timeout. Check your server settings and internet connection.');
    } else {
      console.error(`   Error: ${error.message}`);
    }
    
    console.log('\n💡 Troubleshooting steps:');
    console.log('   1. Contact your hosting provider for correct email server settings');
    console.log('   2. Verify the email account exists and credentials are correct');
    console.log('   3. Check if the email account has SMTP enabled');
    console.log('   4. Try different port numbers (587, 465, 25)');
    
    process.exit(1);
  }
}

// Run the test
testEmailConfiguration();
