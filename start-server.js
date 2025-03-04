
// ES Module version of the server starter
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to server file
const serverPath = resolve(__dirname, 'src/api/server.js');

console.log('Starting API server...');
console.log(`Server path: ${serverPath}`);

// Start the API server
const serverProcess = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: process.env
});

// Handle server process events
serverProcess.on('close', (code) => {
  console.log(`API server process exited with code ${code}`);
});

process.on('SIGINT', () => {
  console.log('Stopping API server...');
  serverProcess.kill();
  process.exit();
});
