
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
console.log(`Checking if port ${PORT} is already in use...`);
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
      console.log(`Port ${PORT} is in use! Status: ${res.statusCode}`);
      console.log('Server is already running.');
    } else {
      console.log(`Port ${PORT} has a service responding with status: ${res.statusCode}`);
      console.log('Attempting to start a new server instance...');
      startServer();
    }
  });

  req.on('error', () => {
    // Port is not in use, continue starting server
    console.log(`Port ${PORT} is available.`);
    startServer();
  });

  req.on('timeout', () => {
    req.destroy();
    console.log(`Request timed out. Port ${PORT} may be available.`);
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
      shell: true,
      env: { ...process.env, PORT }
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
