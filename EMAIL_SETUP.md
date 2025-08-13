# Email Configuration Setup for Contact Form

## Overview

The contact form has been configured to send emails to `hr@mediacrest.africa` when users submit the contact form.

## Required Setup Steps

### 1. Configure Environment Variables

Update the `.env` file with your Gmail credentials:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=hr@mediacrest.africa
```

### 2. Gmail App Password Setup

Since you're using Gmail, you need to create an App Password:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to Security → 2-Step Verification (enable if not already enabled)
3. Navigate to Security → App passwords
4. Select "Mail" as the app and generate a password
5. Use this generated password in the `EMAIL_PASS` field in `.env`

### 3. Alternative Email Providers

If you're not using Gmail, update the `EMAIL_SERVICE` in `.env`:

For other providers:

```env
EMAIL_SERVICE=outlook  # or yahoo, etc.
```

Or for custom SMTP:

```env
EMAIL_SERVICE=custom
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

## Features Implemented

✅ **Email Sending**: All contact form submissions are sent to `hr@mediacrest.africa`
✅ **Professional Email Template**: Styled HTML email with company branding
✅ **Form Validation**: Client and server-side validation
✅ **Error Handling**: Proper error messages for failed submissions
✅ **Success Feedback**: User confirmation when email is sent successfully
✅ **Reply-To Header**: Recipients can easily reply to the sender
✅ **Loading States**: Submit button shows "Sending..." during submission

## Email Template Features

The email includes:

- Professional styling with Mediacrest College branding
- Contact details in a formatted table
- Full message content
- Timestamp of submission
- Reply-to functionality for easy responses

## Testing

1. Fill out the contact form on your website
2. Check the `hr@mediacrest.africa` inbox for the email
3. Verify all form data is properly displayed in the email

## Troubleshooting

**Common Issues:**

1. **"Authentication failed"** - Check your app password and email credentials
2. **"Invalid email address"** - Verify the recipient email is correct
3. **Emails not received** - Check spam folder, verify email credentials

**Debug Mode:**
Check server console logs for detailed error messages when emails fail to send.
