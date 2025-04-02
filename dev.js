
/**
 * Development server script
 * Runs both the API server and the frontend dev server
 */
import dotenv from 'dotenv';
import { spawn } from 'child_process';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Verify environment variables
if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please make sure your .env file is properly configured.');
  process.exit(1);
}

// Function to start a process
function startProcess(command, args, name) {
  console.log(`Starting ${name}...`);

  const proc = spawn(command, args, {
    stdio: 'inherit',
    shell: true
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
console.log('Starting API server on port 3001...');
const apiServer = startProcess('npx', ['ts-node', '--esm', 'server.ts'], 'API Server');

// Start frontend dev server
console.log('Starting frontend dev server...');
const frontendServer = startProcess('npx', ['vite', '--host', '0.0.0.0'], 'Frontend');

// Cleanup on exit
process.on('SIGINT', () => {
  console.log('Shutting down dev environment...');
  apiServer.kill();
  frontendServer.kill();
  process.exit(0);
});
