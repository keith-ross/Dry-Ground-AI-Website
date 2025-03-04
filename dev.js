
/**
 * Development server script
 * Runs both the API server and the frontend dev server
 */
require('dotenv').config();
const { spawn } = require('child_process');
const fs = require('fs');

// Verify environment variables
if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please make sure your .env file is properly configured.');
  console.error('Creating a default .env file if it doesn\'t exist...');
  
  // Check if .env exists, if not create it with defaults
  if (!fs.existsSync('.env')) {
    fs.writeFileSync('.env', 
      '# Database connection\n' +
      'DATABASE_URL=postgres://username:password@hostname:port/database\n' +
      '# Environment\n' +
      'NODE_ENV=development\n' +
      '# Server port\n' +
      'PORT=3001\n'
    );
    console.error('Created default .env file. Please update it with your actual database credentials.');
  }
}

// Function to start a process with proper logging and error handling
function startProcess(command, args, name) {
  console.log(`Starting ${name}...`);
  
  const process = spawn(command, args, { 
    stdio: 'pipe',
    shell: true
  });
  
  process.stdout.on('data', (data) => {
    console.log(`[${name}] ${data.toString().trim()}`);
  });
  
  process.stderr.on('data', (data) => {
    console.error(`[${name}] ${data.toString().trim()}`);
  });
  
  process.on('error', (error) => {
    console.error(`[${name}] Failed to start: ${error.message}`);
  });
  
  process.on('close', (code) => {
    if (code !== 0) {
      console.error(`[${name}] exited with code ${code}`);
    } else {
      console.log(`[${name}] closed`);
    }
  });
  
  return process;
}

// Start backend API server
const apiServer = startProcess('npx', ['ts-node', '--esm', 'server.ts'], 'API server');

// Start frontend dev server
const frontendServer = startProcess('npm', ['run', 'dev'], 'Frontend');

// Handle process termination
function cleanup() {
  console.log('Shutting down all processes...');
  if (apiServer) apiServer.kill();
  if (frontendServer) frontendServer.kill();
  process.exit(0);
}

// Listen for termination signals
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

console.log('Dev environment started! Press Ctrl+C to stop all processes.');
