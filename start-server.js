import { createServer } from 'http';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import './src/api/server.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Ensure data directory exists
const dataDir = join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  console.log('Creating data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log('Server started via start-server.js');

// Create a simple health check server
const healthServer = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', message: 'Server is running' }));
});

healthServer.listen(3002, '0.0.0.0', () => {
  console.log('Health check server running on port 3002');
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  healthServer.close();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Shutting down servers...');
  healthServer.close();
  process.exit();
});