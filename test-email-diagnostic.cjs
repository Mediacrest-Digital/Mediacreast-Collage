const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmailWithDiagnostics() {
  console.log('🧪 Testing email configuration with diagnostics...');
  console.log('📧 Email Host:', process.env.EMAIL_HOST);
  console.log('📧 Email User:', process.env.EMAIL_USER);
  console.log('📧 Email Port:', process.env.EMAIL_PORT);
  console.log('📧 Email Secure:', process.env.EMAIL_SECURE);
  
  // Test different common email server configurations
  const configurations = [
    {
      name: "Primary Config (Current)",
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true'
    },
    {
      name: "Alternative SMTP (ssl)",
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true
    },
    {
      name: "Alternative Port (2525)",
      host: process.env.EMAIL_HOST,
      port: 2525,
      secure: false
    },
    {
      name: "Alternative Host (smtp prefix)",
      host: `smtp.${process.env.EMAIL_HOST.replace('mail.', '')}`,
      port: 587,
      secure: false
    }
  ];

  for (const config of configurations) {
    try {
      console.log(`\n🔧 Testing: ${config.name}`);
      console.log(`   Host: ${config.host}, Port: ${config.port}, Secure: ${config.secure}`);
      
      const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 5000,    // 5 seconds
        socketTimeout: 10000,     // 10 seconds
      });

      console.log('🔍 Verifying connection...');
      
      // Set a timeout for the verification
      const verificationPromise = transporter.verify();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Verification timeout')), 15000)
      );

      await Promise.race([verificationPromise, timeoutPromise]);
      
      console.log('✅ Connection successful!');
      
      // If we get here, this configuration works, so let's send a test email
      console.log('📤 Sending test email...');
      const info = await transporter.sendMail({
        from: `"MediaCrest Test" <${process.env.EMAIL_USER}>`,
        to: process.env.RECIPIENT_EMAIL,
        subject: '✅ Email Configuration Test - SUCCESS',
        html: `
          <h2 style="color: #621909;">Email Configuration Test SUCCESS! 🎉</h2>
          <p>Your email configuration is working with the following settings:</p>
          <ul>
            <li><strong>Host:</strong> ${config.host}</li>
            <li><strong>Port:</strong> ${config.port}</li>
            <li><strong>Secure:</strong> ${config.secure}</li>
            <li><strong>User:</strong> ${process.env.EMAIL_USER}</li>
            <li><strong>Test Time:</strong> ${new Date().toLocaleString()}</li>
          </ul>
          <p>Your application forms and contact forms will now work properly!</p>
        `,
      });

      console.log('✅ Test email sent successfully!');
      console.log(`📧 Message ID: ${info.messageId}`);
      console.log(`📨 Email sent to: ${process.env.RECIPIENT_EMAIL}`);
      console.log('\n🎊 SUCCESS! Use this configuration in your .env file:');
      console.log(`EMAIL_HOST=${config.host}`);
      console.log(`EMAIL_PORT=${config.port}`);
      console.log(`EMAIL_SECURE=${config.secure}`);
      
      return; // Success, exit
      
    } catch (error) {
      console.log(`❌ Failed: ${error.message}`);
      if (error.code) {
        console.log(`   Error Code: ${error.code}`);
      }
    }
  }
  
  console.log('\n❌ All configurations failed. Please check:');
  console.log('1. Email server settings with your hosting provider');
  console.log('2. Email account credentials');
  console.log('3. SMTP is enabled for your email account');
  console.log('4. Firewall/network restrictions');
}

testEmailWithDiagnostics();
