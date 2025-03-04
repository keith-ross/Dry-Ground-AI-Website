
/**
 * Script to start the API server
 */
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.join(__dirname, 'src', 'api', 'server.js');

console.log('Starting API server...');
console.log('Server path:', serverPath);

// Check if server file exists
if (!fs.existsSync(serverPath)) {
  console.error(`ERROR: Server file not found at ${serverPath}`);
  process.exit(1);
}

// Kill any existing process on port 3001
try {
  const killPortCmd = process.platform === 'win32' 
    ? `FOR /F "tokens=5" %P IN ('netstat -ano ^| findstr :3001') DO taskkill /F /PID %P` 
    : `lsof -ti :3001 | xargs -r kill -9`;
    
  const killProcess = spawn(process.platform === 'win32' ? 'cmd' : 'sh', 
                           [process.platform === 'win32' ? '/c' : '-c', killPortCmd], 
                           { stdio: 'ignore' });
  
  killProcess.on('exit', () => {
    // Start the server after attempting to kill existing processes
    startServer();
  });
} catch (error) {
  // If kill command fails, still try to start the server
  console.warn('Warning: Failed to kill existing processes on port 3001:', error.message);
  startServer();
}

function startServer() {
  // Start the server with node
  const server = spawn('node', [serverPath], {
    env: { ...process.env, PORT: '3001' },
    stdio: 'inherit'
  });

  server.on('error', (error) => {
    console.error('API server process error:', error);
  });

  server.on('exit', (code) => {
    if (code !== 0) {
      console.error(`API server process exited with code ${code}`);
    } else {
      console.log('API server process stopped');
    }
  });

  // Handle termination signals
  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      if (!server.killed) {
        console.log(`${signal} received, stopping API server...`);
        server.kill(signal);
      }
    });
  });
}
