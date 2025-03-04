
// Server startup script
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Ensure .env file exists with the required variables
const envPath = path.join(__dirname, '.env');
const envFile = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

// Check for required environment variables
if (!process.env.SENDGRID_API_KEY && !envFile.includes('SENDGRID_API_KEY')) {
  console.log('\x1b[33m%s\x1b[0m', '⚠️ WARNING: SENDGRID_API_KEY is not set in environment or .env file.');
  console.log('\x1b[33m%s\x1b[0m', '   The contact form will not be able to send emails.');
  console.log('\x1b[33m%s\x1b[0m', '   Please add it to the Replit Secrets tool or .env file.\n');
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
