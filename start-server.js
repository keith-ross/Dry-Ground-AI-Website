
import { spawn } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

// Verify environment variables
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please check your .env file and try again.');
  process.exit(1);
}

console.log('🚀 Starting API server on port 3001...');
const server = spawn('node', ['--loader=ts-node/esm', 'server.ts'], {
  stdio: 'inherit',
  shell: true
});

server.on('error', (error) => {
  console.error('❌ Server failed to start:', error);
});

server.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`❌ Server exited with code ${code} and signal ${signal}`);
  }
});

console.log('Server process started with PID:', server.pid);
