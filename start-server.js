
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting API server...');

const serverPath = path.join(__dirname, 'src', 'api', 'server.js');
const server = spawn('node', [serverPath], { 
  stdio: 'inherit',
  env: process.env
});

server.on('error', (err) => {
  console.error('Failed to start API server:', err);
});

console.log('API server started. Press Ctrl+C to stop.');
