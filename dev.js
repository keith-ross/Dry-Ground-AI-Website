/**
 * Development server script
 * Runs both the API server and the frontend dev server
 */
import dotenv from 'dotenv';
import { spawn } from 'child_process';

// Load environment variables
dotenv.config();

// Verify environment variables
if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please make sure your .env file is properly configured.');
  process.exit(1);
}

// Function to start a process (simplified from original)
function startProcess(command, args, name) {
  console.log(`Starting ${name}...`);

  const proc = spawn(command, args, {
    stdio: 'inherit',
  });

  proc.on('error', (error) => {
    console.error(`${name} failed to start:`, error);
  });

  proc.on('exit', (code, signal) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code} and signal ${signal}`);
    }
  });

  return proc;
}

// Start backend API server
console.log('Starting API server...');
const apiServer = startProcess('node', ['server.js'], 'API Server');

// Start frontend dev server
console.log('Starting frontend dev server...');
const frontendServer = startProcess('npx', ['vite'], 'Frontend');

// Handle process termination (improved from original)
process.on('SIGTERM', () => {
  console.log('Shutting down dev environment...');
  apiServer.kill();
  frontendServer.kill();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Shutting down dev environment...');
  apiServer.kill();
  frontendServer.kill();
  process.exit(0);
});