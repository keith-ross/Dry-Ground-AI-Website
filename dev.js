
import { spawn } from 'child_process';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL environment variable is missing!');
  console.error('Please create a .env file with the required variables.');
  process.exit(1);
}

console.log('🚀 Development servers started');
console.log('📱 Frontend: http://localhost:3000');
console.log('🔌 API: http://localhost:3001');

// Start the frontend (Vite) dev server
const frontendProcess = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true
});

// Start the backend API server
const backendProcess = spawn('node', ['--loader', 'ts-node/esm', 'server.ts'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env }
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('\nShutting down development servers...');
  frontendProcess.kill();
  backendProcess.kill();
  process.exit(0);
});

// Handle process errors
frontendProcess.on('error', (error) => {
  console.error('Frontend process error:', error);
});

backendProcess.on('error', (error) => {
  console.error('Backend process error:', error);
});

// Handle process exit
frontendProcess.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`Frontend process exited with code ${code}`);
  }
});

backendProcess.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`Backend process exited with code ${code}`);
  }
});
