
// start-server.js
import { spawn, exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const SERVER_PATH = path.join(__dirname, 'src', 'api', 'server.js');

console.log('Starting API server...');
console.log('Server path:', SERVER_PATH);

// Function to kill processes on a specific port
function killProcessOnPort(port) {
  return new Promise((resolve) => {
    console.log(`Attempting to kill any existing process on port ${port}...`);
    
    // On Unix-like systems
    const command = `lsof -ti:${port} | xargs kill -9 2>/dev/null || true`;
    
    exec(command, (error) => {
      // We don't care about the error - if there's no process, that's fine
      resolve();
    });
  });
}

// Start the server
async function startServer() {
  try {
    // Kill any existing process on the port
    await killProcessOnPort(PORT);
    
    // Add a small delay to ensure the port is fully released
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Starting the API server...');
    const serverProcess = spawn('node', [SERVER_PATH], {
      stdio: 'inherit',
      env: {
        ...process.env,
        PORT: PORT
      }
    });

    serverProcess.on('error', (error) => {
      console.error('Failed to start API server:', error);
      process.exit(1);
    });

    serverProcess.on('exit', (code) => {
      console.log(`API server process exited with code ${code}`);
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
