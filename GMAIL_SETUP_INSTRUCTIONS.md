# Gmail Setup Instructions for mediacresttrainingcollage@gmail.com

## Current Issue

Gmail is rejecting the App Password with error: "Username and Password not accepted"

## Step-by-Step Fix

### 1. Verify Gmail Account Access

- Go to https://gmail.com
- Log in with: mediacresttrainingcollage@gmail.com
- Make sure you can access the account

### 2. Enable 2-Factor Authentication (Required for App Passwords)

- Go to https://myaccount.google.com/security
- Click "2-Step Verification"
- Follow the setup process (you'll need your phone)

### 3. Generate App Password (After 2FA is enabled)

- Go to https://myaccount.google.com/apppasswords
- Select "Mail" as the app
- Select "Other" as device and type "Mediacrest College"
- Gmail will generate a 16-character password
- Use this password in your .env file

### 4. Alternative: Enable Less Secure Apps (NOT RECOMMENDED)

If you can't use 2FA:

- Go to https://myaccount.google.com/lesssecureapps
- Turn ON "Less secure app access"
- Use your regular Gmail password

### 5. Test Configuration

After making changes, run: `node test-quick-gmail.cjs`

## Current Password Format

Your App Password should look like: `abcd efgh ijkl mnop` (16 chars with spaces)
In .env file, remove spaces: `abcdefghijklmnop`

## If Still Failing

Try these alternatives:

1. Use a different Gmail account that you control
2. Use your hosting provider's SMTP server
3. Use a dedicated email service like SendGrid
