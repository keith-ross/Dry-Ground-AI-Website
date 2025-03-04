
import { spawn } from 'child_process';
import path from 'path';

// Start Express server
const apiServer = spawn('node', ['--loader', 'ts-node/esm', 'server.ts'], {
  stdio: 'inherit',
  env: { ...process.env, PORT: '3001' }
});

// Start Vite dev server
const devServer = spawn('npx', ['vite'], {
  stdio: 'inherit'
});

// Handle cleanup on exit
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  apiServer.kill();
  devServer.kill();
  process.exit();
});

console.log('🚀 Development servers started');
console.log('📱 Frontend: http://localhost:3000');
console.log('🔌 API: http://localhost:3001');

// Forward exit codes
apiServer.on('close', code => {
  if (code !== 0 && code !== null) {
    console.error(`API server exited with code ${code}`);
    devServer.kill();
    process.exit(code);
  }
});

devServer.on('close', code => {
  if (code !== 0 && code !== null) {
    console.error(`Dev server exited with code ${code}`);
    apiServer.kill();
    process.exit(code);
  }
});
