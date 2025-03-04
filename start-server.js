
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

// Check if .env file exists and log a message if it doesn't
const envPath = path.resolve('.env');
if (!fs.existsSync(envPath)) {
  console.log(chalk.yellow('No .env file found, will use environment variables from Replit Secrets'));
}

console.log(chalk.blue('Starting API server...'));

// Use ts-node to run the server.ts file with ESM loader
const server = spawn('node', ['--loader', 'ts-node/esm', 'src/api/server.ts'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    // Force NODE_ENV to development in local environment
    NODE_ENV: 'development',
  },
});

server.on('close', (code) => {
  if (code !== 0) {
    console.log(chalk.red(`API server process exited with code ${code}`));
  }
});

// Handle process termination to clean up child process
process.on('SIGINT', () => {
  server.kill('SIGINT');
  process.exit(0);
});
