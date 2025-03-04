// start-server.js
import { spawn } from 'child_process';
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

// Start the server
function startServer() {
  try {
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