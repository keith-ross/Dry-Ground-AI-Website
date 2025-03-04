
import { spawn } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import http from 'http';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const SERVER_PATH = `${__dirname}/src/api/server.js`;

console.log('Starting API server...');
console.log('Server path:', SERVER_PATH);

// Check if the port is already in use
console.log(`Attempting to kill any existing process on port ${PORT}...`);
try {
  // Try to check if port is in use
  const options = {
    host: 'localhost',
    port: PORT,
    path: '/api/health',
    timeout: 1000
  };

  const req = http.get(options, res => {
    if (res.statusCode === 200) {
      console.log(`Port ${PORT} is already in use. Server is running.`);
    }
    process.exit(0);
  });

  req.on('error', () => {
    // Port is not in use, continue starting server
    startServer();
  });

  req.on('timeout', () => {
    req.destroy();
    startServer();
  });
} catch (error) {
  console.log('Error checking port:', error.message);
  startServer();
}

function startServer() {
  console.log('Starting the API server...');
  
  try {
    // Start API server process
    const serverProcess = spawn('node', [SERVER_PATH], {
      stdio: 'inherit',
      shell: true
    });

    // Handle process exit
    serverProcess.on('exit', (code) => {
      console.log(`API server process exited with code ${code}`);
    });

    serverProcess.on('error', (err) => {
      console.error('Failed to start API server:', err);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}
