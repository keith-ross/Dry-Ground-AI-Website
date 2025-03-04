
// A script to start both the frontend and API server
import { spawn, exec } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_PORT = process.env.PORT || 3001;

// Log function with timestamp
function log(message) {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0]; // HH:MM:SS
  console.log(`[${timestamp}] ${message}`);
}

// Function to check and kill processes on a port
async function cleanupPort(port) {
  return new Promise((resolve) => {
    log(`Checking for processes using port ${port}...`);
    
    // For Linux/Mac - find and kill processes on the port
    exec(`lsof -i:${port} -t`, (error, stdout) => {
      if (!stdout || stdout.trim() === '') {
        log(`No processes found using port ${port}`);
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

// Find and kill all node processes running our server files
async function killAllServerProcesses() {
  return new Promise((resolve) => {
    log('Looking for stray server processes...');
    
    // Find processes running server files
    exec('ps aux | grep "node.*server.js" | grep -v grep', (error, stdout) => {
      if (!stdout || stdout.trim() === '') {
        log('No stray server processes found');
        resolve();
        return;
      }
      
      const lines = stdout.trim().split('\n');
      log(`Found ${lines.length} server processes`);
      
      lines.forEach(line => {
        try {
          const parts = line.trim().split(/\s+/);
          if (parts.length > 1) {
            const pid = parseInt(parts[1], 10);
            log(`Killing server process ${pid}`);
            process.kill(pid, 'SIGTERM');
          }
        } catch (e) {
          log(`Error killing process: ${e.message}`);
        }
      });
      
      // Give processes time to shut down
      setTimeout(resolve, 1000);
    });
  });
}

// Start both servers
async function startAll() {
  log('Starting servers...');
  
  try {
    // Thoroughly clean up any existing processes
    await cleanupPort(API_PORT);
    await killAllServerProcesses();
    
    // Wait a moment to ensure ports are released
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    log('Starting API server...');
    // Start the API server
    const apiServer = spawn('node', ['src/api/server.js'], {
      stdio: 'pipe',
      env: {
        ...process.env,
        PORT: API_PORT.toString()
      }
    });

    // Wait for API server to start
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    log('Starting frontend server...');
    // Start the frontend (Vite) server
    const frontendServer = spawn('npx', ['vite', '--host', '0.0.0.0'], {
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
      if (code !== 0 && code !== null) {
        log('API server exited unexpectedly');
      }
    });

    frontendServer.on('exit', (code) => {
      log(`Frontend server exited with code ${code}`);
      if (code !== 0 && code !== null) {
        log('Frontend server exited unexpectedly');
      }
    });

    // Handle process termination
    process.on('SIGINT', () => {
      log('Shutting down all servers...');
      apiServer.kill('SIGINT');
      frontendServer.kill('SIGINT');
      setTimeout(() => process.exit(0), 1000);
    });

    process.on('SIGTERM', () => {
      log('Shutting down all servers...');
      apiServer.kill('SIGTERM');
      frontendServer.kill('SIGTERM');
      setTimeout(() => process.exit(0), 1000);
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
