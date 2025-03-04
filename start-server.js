
// start-server.js
import { spawn, exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const SERVER_PATH = path.join(__dirname, 'src', 'api', 'server.js');

console.log('Starting API server...');
console.log('Server path:', SERVER_PATH);

// Verify the server file exists
if (!fs.existsSync(SERVER_PATH)) {
  console.error(`ERROR: Server file not found at ${SERVER_PATH}`);
  process.exit(1);
}

// Function to kill processes on a specific port
function killProcessOnPort(port) {
  return new Promise((resolve) => {
    console.log(`Attempting to kill any existing process on port ${port}...`);
    
    // Use different commands based on platform
    const command = process.platform === 'win32'
      ? `netstat -ano | findstr :${port}`
      : `lsof -ti:${port} || echo "No process found on port ${port}"`;
    
    exec(command, (error, stdout) => {
      if (error) {
        console.log('Error finding processes on port or no process found');
        resolve();
        return;
      }
      
      if (process.platform === 'win32' && stdout) {
        // On Windows, parse the output to get PIDs
        const lines = stdout.split('\n');
        const pids = new Set();
        
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          if (parts.length > 4) {
            pids.add(parts[4]);
          }
        });
        
        pids.forEach(pid => {
          if (pid) {
            exec(`taskkill /F /PID ${pid}`, () => {});
          }
        });
      } else if (stdout && !stdout.includes('No process')) {
        // On Unix, the command already prepared the PIDs for killing
        exec(`kill -9 $(${command})`, () => {});
      }
      
      resolve();
    });
  });
}

// Start the server
async function startServer() {
  try {
    console.log('Checking for existing processes...');
    // Kill any existing process on the port
    await killProcessOnPort(PORT);
    
    // Add a small delay to ensure the port is fully released
    console.log('Waiting for port to be released...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Starting the API server...');
    const serverProcess = spawn('node', [SERVER_PATH], {
      stdio: 'inherit',
      env: {
        ...process.env,
        PORT: PORT.toString()
      }
    });

    serverProcess.on('error', (error) => {
      console.error('Failed to start API server:', error);
      process.exit(1);
    });

    serverProcess.on('exit', (code) => {
      console.log(`API server process exited with code ${code}`);
      if (code !== 0) {
        console.log('Attempting to restart server in 5 seconds...');
        setTimeout(() => startServer(), 5000);
      }
    });

    // Handle process termination signals
    process.on('SIGINT', () => {
      console.log('Terminating API server...');
      serverProcess.kill('SIGINT');
      process.exit();
    });

    process.on('SIGTERM', () => {
      console.log('Terminating API server...');
      serverProcess.kill('SIGTERM');
      process.exit();
    });

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
