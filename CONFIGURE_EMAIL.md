# ⚠️ URGENT: Configure Email Credentials

## Current Status

❌ **Emails are NOT being sent** - TEST_MODE was enabled
✅ **Contact form is working** - but needs real email credentials

## Required Actions

### 1. Get Gmail App Password

1. Go to https://myaccount.google.com/
2. Sign in with `mediacrestdigital@gmail.com`
3. Navigate to Security → 2-Step Verification (enable if needed)
4. Navigate to Security → App passwords
5. Generate an app password for "Mail"
6. Copy the 16-character password

### 2. Update .env File

Replace `your-gmail-app-password-here` in `.env` with the actual app password:

```env
EMAIL_PASS=abcd-efgh-ijkl-mnop  # Replace with your actual app password
```

### 3. Test Email Functionality

After updating credentials:

1. Restart the server: `npm run dev`
2. Fill out the contact form
3. Check `hr@mediacrest.africa` inbox
4. Check spam folder if not in inbox

## Alternative: Use Different Gmail Account

If you don't have access to `mediacrestdigital@gmail.com`, you can:

1. Use any Gmail account you have access to
2. Update `.env` with your email:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

## Verification

Once configured, you should see in server logs:

```
Email transporter verified successfully
Attempting to send email to: hr@mediacrest.africa
Email sent successfully
```

Instead of:

```
TEST MODE: Email would be sent to: hr@mediacrest.africa
```
