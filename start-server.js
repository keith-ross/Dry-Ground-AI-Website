
const { spawn } = require('child_process');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log(chalk.green('Created data directory for SQLite database'));
}

// Start API server
console.log(chalk.blue('Starting API server...'));
const apiServer = spawn('npx', ['ts-node', 'src/api/server.ts'], {
  env: { ...process.env, NODE_ENV: 'development' }
});

apiServer.stdout.on('data', (data) => {
  console.log(chalk.blue('[API] ') + data.toString().trim());
});

apiServer.stderr.on('data', (data) => {
  console.error(chalk.red('[API Error] ') + data.toString().trim());
});

// Start Vite dev server
console.log(chalk.green('Starting Vite development server...'));
const viteServer = spawn('npx', ['vite'], {
  env: { ...process.env, NODE_ENV: 'development' }
});

viteServer.stdout.on('data', (data) => {
  console.log(chalk.green('[Vite] ') + data.toString().trim());
});

viteServer.stderr.on('data', (data) => {
  console.error(chalk.red('[Vite Error] ') + data.toString().trim());
});

// Handle process termination
process.on('SIGINT', () => {
  console.log(chalk.yellow('Shutting down servers...'));
  apiServer.kill();
  viteServer.kill();
  process.exit();
});

console.log(chalk.cyan('✨ Development servers started'));
