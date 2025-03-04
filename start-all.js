
// A script to start both the frontend and API server
import { spawn, exec } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_PORT = process.env.API_PORT || 3001;

// Log function with timestamp
function log(message) {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0]; // HH:MM:SS
  console.log(`[${timestamp}] ${message}`);
}

// Function to check and kill processes on a port
async function cleanupPort(port) {
  return new Promise((resolve) => {
    log(`Checking for processes using port ${port}...`);
    
    // First try to kill using lsof (Linux/Mac)
    exec(`lsof -i:${port} -t`, (error, stdout) => {
      if (error) {
        // No processes found or lsof not available
        log(`No processes found using port ${port} with lsof`);
        resolve(false);
        return;
      }
      
      const pids = stdout.trim().split('\n').filter(Boolean);
      if (pids.length > 0) {
        log(`Found ${pids.length} processes using port ${port}: ${pids.join(', ')}`);
        
        // Kill each process
        pids.forEach(pid => {
          try {
            process.kill(parseInt(pid, 10), 'SIGTERM');
            log(`Terminated process ${pid}`);
          } catch (e) {
            log(`Failed to terminate process ${pid}: ${e.message}`);
          }
        });
        
        // Give processes time to shut down
        setTimeout(() => resolve(true), 1000);
      } else {
        resolve(false);
      }
    });
  });
}

// Start both servers
async function startAll() {
  log('Starting servers...');
  
  try {
    // Clean up any existing processes on API_PORT
    await cleanupPort(API_PORT);
    
    // Additional cleanup: check for stray Node.js processes running the API server
    exec('ps aux | grep "node src/api/server.js" | grep -v grep', (error, stdout) => {
      if (!error && stdout) {
        const lines = stdout.trim().split('\n');
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          if (parts.length > 1) {
            const pid = parts[1];
            try {
              process.kill(parseInt(pid, 10), 'SIGTERM');
              log(`Terminated stray API server process ${pid}`);
            } catch (e) {
              log(`Failed to terminate stray process ${pid}: ${e.message}`);
            }
          }
        });
      }
    });

    log('Starting API server...');
    // Start the API server
    const apiServer = spawn('node', ['src/api/server.js'], {
      stdio: 'pipe',
      env: {
        ...process.env,
        PORT: API_PORT.toString(),
        NODE_ENV: 'development'
      }
    });

    // Wait a moment for the API server to start
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    log('Starting frontend server...');
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
      if (code !== 0) {
        log('Attempting to restart API server...');
        startAll().catch(console.error);
      }
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
    
    log('All servers started successfully!');
  } catch (error) {
    console.error('Failed to start servers:', error);
    process.exit(1);
  }
}

// Start everything
startAll().catch(error => {
  console.error('Failed to start servers:', error);
  process.exit(1);
});
