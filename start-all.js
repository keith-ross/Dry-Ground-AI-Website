
// A script to start both the frontend and API server
import { spawn } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Log function with timestamp
function log(message) {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0]; // HH:MM:SS
  console.log(`[${timestamp}] ${message}`);
}

// Start both servers
async function startAll() {
  log('Starting frontend and API server together...');
  
  // Start the API server
  const apiServer = spawn('node', ['src/api/server.js'], {
    stdio: 'pipe',
    env: {
      ...process.env,
      PORT: '3001'
    }
  });

  // Start the frontend (Vite) server
  const frontendServer = spawn('npm', ['run', 'dev', '--', '--host', '0.0.0.0'], {
    stdio: 'pipe'
  });

  // Handle API server output
  apiServer.stdout.on('data', (data) => {
    console.log(`[API] ${data.toString().trim()}`);
  });
  
  apiServer.stderr.on('data', (data) => {
    console.error(`[API ERROR] ${data.toString().trim()}`);
  });

  // Handle frontend server output
  frontendServer.stdout.on('data', (data) => {
    console.log(`[Frontend] ${data.toString().trim()}`);
  });
  
  frontendServer.stderr.on('data', (data) => {
    console.error(`[Frontend ERROR] ${data.toString().trim()}`);
  });

  // Handle process exit
  apiServer.on('exit', (code) => {
    log(`API server exited with code ${code}`);
    process.exit(code);
  });

  frontendServer.on('exit', (code) => {
    log(`Frontend server exited with code ${code}`);
    process.exit(code);
  });

  // Handle process termination
  process.on('SIGINT', () => {
    log('Shutting down all servers...');
    apiServer.kill('SIGINT');
    frontendServer.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    log('Shutting down all servers...');
    apiServer.kill('SIGTERM');
    frontendServer.kill('SIGTERM');
    process.exit(0);
  });
}

// Start everything
startAll().catch(error => {
  console.error('Failed to start servers:', error);
  process.exit(1);
});
