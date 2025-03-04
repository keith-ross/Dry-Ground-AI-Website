
// start-contact-api.js - Simplified script to start the contact API server
require('dotenv').config();
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Contact API server...');

// Check environment variables
console.log('\nEnvironment variables:');
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'Set ✓' : 'Not set ✗');
console.log('FROM_EMAIL:', process.env.FROM_EMAIL ? process.env.FROM_EMAIL : 'Not set ✗');
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL : 'Not set ✗');

if (!process.env.SENDGRID_API_KEY) {
  console.error('\n⚠️ WARNING: SENDGRID_API_KEY is not set. Email sending will fail.');
  console.error('Please add your SendGrid API key to the .env file or Replit Secrets.');
}

// Start the server
const serverProcess = spawn('node', ['src/api/contactServer.js'], {
  stdio: 'inherit',
  env: process.env
});

serverProcess.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

serverProcess.on('exit', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

// Handle termination
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  serverProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  serverProcess.kill('SIGTERM');
  process.exit(0);
});
