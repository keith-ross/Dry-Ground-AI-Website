
// Server startup script
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env file if it exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log(`Loading environment variables from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.log('No .env file found, using environment variables from Replit Secrets');
}

// Check for required environment variables
if (!process.env.SENDGRID_API_KEY) {
  console.log('\x1b[33m%s\x1b[0m', '⚠️ WARNING: SENDGRID_API_KEY is not found in environment variables.');
  console.log('\x1b[33m%s\x1b[0m', '   The contact form will not be able to send emails.');
  console.log('\x1b[33m%s\x1b[0m', '   Please ensure it is set in the Replit Secrets tool.\n');
  console.log('\x1b[36m%s\x1b[0m', '   You can add it by going to:');
  console.log('\x1b[36m%s\x1b[0m', '   Tools > Secrets > Add a new secret with key "SENDGRID_API_KEY"\n');
} else {
  console.log('\x1b[32m%s\x1b[0m', '✅ SENDGRID_API_KEY found in environment variables.');
  console.log('\x1b[32m%s\x1b[0m', `   Key length: ${process.env.SENDGRID_API_KEY.length} characters`);
  
  // Validate basic API key format
  if (process.env.SENDGRID_API_KEY.startsWith('SG.') && process.env.SENDGRID_API_KEY.length > 50) {
    console.log('\x1b[32m%s\x1b[0m', '   Key format appears to be valid (starts with SG. and has sufficient length)\n');
  } else {
    console.log('\x1b[33m%s\x1b[0m', '   ⚠️ WARNING: Key format may be invalid (should start with SG. and be 50+ characters)');
    console.log('\x1b[33m%s\x1b[0m', '   SendGrid API keys typically start with "SG." and are about 69 characters long\n');
  }
}

// Set default port if not provided
if (!process.env.PORT) {
  process.env.PORT = 3001;
  console.log('\x1b[33m%s\x1b[0m', `ℹ️ No PORT specified in environment, using default: ${process.env.PORT}\n`);
}

// Start the server
try {
  console.log('Starting the API server...');
  require('./src/api/server');
  console.log('\x1b[32m%s\x1b[0m', '✅ API server started successfully!\n');
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Failed to start API server:');
  console.error(error);
  process.exit(1);
}
