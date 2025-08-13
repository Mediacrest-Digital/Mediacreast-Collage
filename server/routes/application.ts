import { Request, Response } from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Course information database
const courseInfo = {
  'digital-marketing': {
    title: 'Digital Marketing',
    duration: '6 Months',
    description: 'Master the art of digital marketing with hands-on experience from our affiliate agency, Mediacrest Digital.',
    modules: [
      'Search Engine Optimization (SEO)',
      'Social Media Marketing',
      'Google Ads & PPC Campaigns',
      'Content Marketing Strategy',
      'Email Marketing Automation',
      'Analytics & Performance Tracking',
      'Brand Development',
      'Conversion Rate Optimization'
    ],
    outcomes: [
      'Create and manage successful digital marketing campaigns',
      'Develop comprehensive social media strategies',
      'Master Google Ads and Facebook advertising',
      'Build and optimize websites for search engines',
      'Analyze and improve marketing performance using data'
    ],
    nextSteps: [
      'Our admissions team will contact you within 48 hours',
      'Complete your enrollment and payment process',
      'Receive your welcome package and course materials',
      'Start your transformation journey with us'
    ]
  },
  'graphic-design': {
    title: 'Graphic Design',
    duration: '4 Months',
    description: 'Develop your creative skills with industry-standard design tools and real-world projects.',
    modules: [
      'Adobe Creative Suite Mastery',
      'Typography and Color Theory',
      'Brand Identity Design',
      'Print Design Fundamentals',
      'Digital Design for Web & Mobile',
      'Logo Design & Branding',
      'Layout and Composition',
      'Client Project Management'
    ],
    outcomes: [
      'Create professional brand identities and logos',
      'Design compelling print and digital materials',
      'Master Adobe Photoshop, Illustrator, and InDesign',
      'Develop a strong design portfolio',
      'Work confidently with clients on design projects'
    ],
    nextSteps: [
      'Our creative director will review your application',
      'Schedule a portfolio consultation call',
      'Complete enrollment and receive design software access',
      'Begin your creative journey with expert guidance'
    ]
  },
  'photography': {
    title: 'Photography & Videography',
    duration: '5 Months',
    description: 'Master both photography and videography with hands-on training using professional equipment.',
    modules: [
      'Camera Operation & Settings',
      'Composition & Lighting Techniques',
      'Post-Production & Photo Editing',
      'Video Production Fundamentals',
      'Studio & Location Shooting',
      'Commercial Photography',
      'Video Editing & Motion Graphics',
      'Business & Client Management'
    ],
    outcomes: [
      'Capture stunning photographs in any lighting condition',
      'Produce professional quality videos and films',
      'Master photo and video editing software',
      'Build a compelling creative portfolio',
      'Start your own photography/videography business'
    ],
    nextSteps: [
      'Technical assessment and portfolio review',
      'Equipment orientation and studio tour',
      'Complete enrollment process',
      'Start creating amazing visual content'
    ]
  },
  'cyber-security': {
    title: 'Cyber Security',
    duration: '8 Months',
    description: 'Become a cybersecurity expert with hands-on training in protecting digital assets and systems.',
    modules: [
      'Network Security Fundamentals',
      'Ethical Hacking & Penetration Testing',
      'Risk Assessment & Management',
      'Security Information and Event Management (SIEM)',
      'Incident Response & Digital Forensics',
      'Cloud Security',
      'Compliance & Governance',
      'Security Awareness Training'
    ],
    outcomes: [
      'Identify and mitigate security vulnerabilities',
      'Conduct ethical hacking and penetration testing',
      'Implement robust security frameworks',
      'Respond effectively to security incidents',
      'Work as a cybersecurity analyst or consultant'
    ],
    nextSteps: [
      'Security clearance background check',
      'Technical skills assessment',
      'Complete enrollment and security orientation',
      'Begin your cybersecurity career journey'
    ]
  },
  'data-science': {
    title: 'Data Science',
    duration: '7 Months',
    description: 'Master data analysis, machine learning, and statistical modeling to derive insights from complex datasets.',
    modules: [
      'Python Programming for Data Science',
      'Statistics & Probability',
      'Data Visualization with Tableau & Power BI',
      'Machine Learning Algorithms',
      'SQL & Database Management',
      'Big Data Technologies',
      'Data Mining & Preprocessing',
      'Business Intelligence & Analytics'
    ],
    outcomes: [
      'Build predictive models using machine learning',
      'Create compelling data visualizations',
      'Extract insights from large datasets',
      'Develop data-driven business solutions',
      'Work as a data scientist or business analyst'
    ],
    nextSteps: [
      'Mathematical aptitude assessment',
      'Python programming skills evaluation',
      'Complete enrollment and receive data tools access',
      'Start your data science transformation'
    ]
  },
  'software-engineering': {
    title: 'Software Engineering',
    duration: '10 Months',
    description: 'Learn full-stack development and software engineering principles to build scalable applications.',
    modules: [
      'Programming Fundamentals (Python/JavaScript)',
      'Web Development (HTML, CSS, React)',
      'Backend Development (Node.js, Express)',
      'Database Design & Management',
      'Software Architecture & Design Patterns',
      'Version Control & DevOps',
      'Mobile App Development',
      'Project Management & Agile Methodologies'
    ],
    outcomes: [
      'Build full-stack web applications',
      'Develop mobile applications',
      'Design scalable software architectures',
      'Work with modern development frameworks',
      'Secure a software engineering position'
    ],
    nextSteps: [
      'Coding aptitude assessment',
      'Technical interview with senior developers',
      'Complete enrollment and development environment setup',
      'Begin your software engineering journey'
    ]

  }
};

export const handleApplicationEmail = async (req: Request, res: Response) => {
  try {
    // Import nodemailer dynamically to avoid issues with Vite config
    const nodemailer = await import("nodemailer");
    
    const { course, firstName, lastName, email, phone } = req.body;

    // Validate required fields
    if (!course || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // Check if we're in test mode
    if (process.env.TEST_MODE === 'true') {
      console.log("⚠️  TEST MODE ENABLED: No application email will be sent!");
      console.log("TEST MODE: Application email would be sent to:", email);
      console.log("TEST MODE: Course application data:", { course, firstName, lastName, email, phone });
      
      return res.status(200).json({
        success: true,
        message: "⚠️ TEST MODE: Application received but NO EMAIL was sent. Please configure email credentials.",
      });
    }


    // Check if application emails are disabled
    if (process.env.APPLICATION_EMAIL_DISABLED === 'true') {
      console.log("⚠️  APPLICATION EMAILS DISABLED: No application email will be sent!");
      console.log("APPLICATION_EMAIL_DISABLED: Application email would be sent to:", email);
      console.log("APPLICATION_EMAIL_DISABLED: Course application data:", { course, firstName, lastName, email, phone });
      
      return res.status(200).json({
        success: true,
        message: "Application received successfully! We'll contact you soon with next steps.",
      });
    }


    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || 
        process.env.EMAIL_USER.includes('placeholder') || 
        process.env.EMAIL_PASS.includes('placeholder')) {
      console.error("Email credentials not properly configured in .env file");
      return res.status(500).json({
        success: false,
        message: "Email service is not configured. Please contact the administrator.",
      });
    }

    // Create transporter
    const transporter = nodemailer.default.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",

    // Create transporter using custom mail server
    const transporter = nodemailer.default.createTransport({
      host: process.env.EMAIL_HOST || "mail.mediacrestcollege.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log("Email transporter verified successfully");
    } catch (verifyError) {
      console.error("Email transporter verification failed:", verifyError);
      return res.status(500).json({
        success: false,
        message: "Email service configuration error. Please check your credentials.",
      });

      // Add additional options for better reliability
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      },
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
    });

    // Verify transporter configuration (skip in development to avoid blocking)
    if (process.env.NODE_ENV === 'production') {
      try {
        await transporter.verify();
        console.log("Email transporter verified successfully");
      } catch (verifyError) {
        console.error("Email transporter verification failed:", verifyError);
        return res.status(500).json({
          success: false,
          message: "Email service configuration error. Please check your credentials.",
        });
      }
    } else {
      // In development, try to verify but don't fail if it doesn't work
      try {
        await transporter.verify();
        console.log("Email transporter verified successfully");
      } catch (verifyError) {
        console.warn("Email verification failed in development mode, but continuing:", verifyError);
      }

    }

    // Get course information
    const courseData = courseInfo[course as keyof typeof courseInfo];
    if (!courseData) {
      return res.status(400).json({
        success: false,
        message: "Invalid course selection.",
      });
    }

    // Email content for the applicant
    const applicantMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Welcome to MediaCrest College - ${courseData.title} Application Received!`,

      from: `"Mediacrest Applications" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Welcome to Mediacrest Training College - ${courseData.title} Application Received!`,

      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background-color: #621909; color: white; padding: 30px; text-align: center;">

            <h1 style="margin: 0; font-size: 28px;">MediaCrest College</h1>

            <p style="margin: 10px 0 0 0; font-size: 16px;">Your Application Has Been Received!</p>
          </div>

          <!-- Main Content -->
          <div style="padding: 30px;">
            <h2 style="color: #621909; margin-top: 0;">Dear ${firstName} ${lastName},</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Thank you for your interest in our <strong>${courseData.title}</strong> program! We're excited to help you start your journey in the digital world.
            </p>

            <!-- Course Information -->
            <div style="background-color: #f8f3f1; border-left: 4px solid #EB4823; padding: 20px; margin: 25px 0;">
              <h3 style="color: #621909; margin-top: 0;">Course Details</h3>
              <p style="margin: 10px 0;"><strong>Program:</strong> ${courseData.title}</p>
              <p style="margin: 10px 0;"><strong>Duration:</strong> ${courseData.duration}</p>
              <p style="margin: 10px 0 0 0; line-height: 1.6;">${courseData.description}</p>
            </div>

            <!-- What You'll Learn -->
            <div style="margin: 25px 0;">
              <h3 style="color: #621909;">What You'll Learn:</h3>
              <ul style="color: #333; line-height: 1.6;">
                ${courseData.modules.map(module => `<li>${module}</li>`).join('')}
              </ul>
            </div>

            <!-- Career Outcomes -->
            <div style="margin: 25px 0;">
              <h3 style="color: #621909;">After Completion, You'll Be Able To:</h3>
              <ul style="color: #333; line-height: 1.6;">
                ${courseData.outcomes.map(outcome => `<li>${outcome}</li>`).join('')}
              </ul>
            </div>

            <!-- Next Steps -->
            <div style="background-color: #e8f4fd; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #621909; margin-top: 0;">Next Steps:</h3>
              <ol style="color: #333; line-height: 1.8; padding-left: 20px;">
                ${courseData.nextSteps.map(step => `<li>${step}</li>`).join('')}
              </ol>
            </div>

            <!-- Contact Information -->
            <div style="margin: 25px 0; padding: 20px; border: 2px solid #EB4823; border-radius: 8px;">
              <h3 style="color: #621909; margin-top: 0;">Have Questions?</h3>
              <p style="margin: 10px 0; color: #333;">
                📞 <strong>Phone:</strong> +254 725 223 669<br>
                📧 <strong>Email:</strong> info@mediacrestcollege.com<br>
                📍 <strong>Location:</strong> Office Suites, Block B - 3rd Floor Parklands Road - Nairobi
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 16px; color: #666;">
                Follow us on social media for updates and tips!
              </p>
              <div style="margin: 15px 0;">
                <a href="#" style="text-decoration: none; margin: 0 10px; color: #EB4823;">Facebook</a>
                <a href="#" style="text-decoration: none; margin: 0 10px; color: #EB4823;">Instagram</a>
                <a href="#" style="text-decoration: none; margin: 0 10px; color: #EB4823;">LinkedIn</a>
              </div>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
              <p><strong>Application Details:</strong></p>
              <p>Application submitted on: ${new Date().toLocaleString()}</p>
              <p>Course: ${courseData.title}</p>
              <p>Contact Email: ${email}</p>
              <p>Contact Phone: ${phone}</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px;">

            <p>© 2024 MediaCrest College. All rights reserved.</p>

            <p>This email was sent because you applied for our ${courseData.title} program.</p>
          </div>
        </div>
      `,
    };

    // Email notification for admin/HR
    const adminMailOptions = {

      from: `"Mediacrest Collage" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL || "applications@mediacrestcollege.com",

      subject: `New Course Application: ${courseData.title} - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #621909; color: white; padding: 20px; text-align: center;">
            <h2>New Course Application Received</h2>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <h3 style="color: #621909;">Application Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Course:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${courseData.title}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Applicant Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Application Date:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e8f4fd; border-radius: 5px;">
              <p style="margin: 0; color: #666;">
                <strong>Action Required:</strong> Please follow up with this applicant within 48 hours to discuss next steps and enrollment details.
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Send both emails
    console.log("Attempting to send application emails...");
    
    // Send to applicant
    await transporter.sendMail(applicantMailOptions);
    console.log("Application confirmation email sent to applicant:", email);
    
    // Send to admin
    await transporter.sendMail(adminMailOptions);
    console.log("Application notification email sent to admin:", process.env.RECIPIENT_EMAIL);

    res.status(200).json({
      success: true,
      message: "Application received successfully! Please check your email for course details and next steps.",
    });

  } catch (error) {
    console.error("Application email error:", error);
    
    let errorMessage = "An error occurred while processing your application. Please try again later.";
    
    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        errorMessage = "Email authentication failed. Please contact the administrator.";
      } else if (error.message.includes("connect")) {
        errorMessage = "Unable to connect to email service. Please try again later.";
      }
      console.error("Detailed error:", error.message);
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};
