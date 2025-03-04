import dotenv from 'dotenv';
import './src/api/contactServer.js';

// Load environment variables
dotenv.config();

// Log environment configuration
console.log('Environment Variables');
console.log('==================');
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'Set (hidden)' : 'Not set ⚠️');
console.log('FROM_EMAIL:', process.env.FROM_EMAIL || 'Not set ⚠️'); 
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'Not set ⚠️');


// Start the server (from original code, adapted)
const { spawn } = require('child_process');
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

// Handle termination (from original code)
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