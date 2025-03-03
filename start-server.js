
const { spawn } = require('child_process');
const chalk = require('chalk');

// Start API server
const apiServer = spawn('node', ['--loader', 'ts-node/esm', 'src/api/server.ts']);

apiServer.stdout.on('data', (data) => {
  console.log(chalk.blue('[API] ') + data.toString().trim());
});

apiServer.stderr.on('data', (data) => {
  console.error(chalk.red('[API Error] ') + data.toString().trim());
});

// Start Vite dev server
const viteServer = spawn('vite');

viteServer.stdout.on('data', (data) => {
  console.log(chalk.green('[Vite] ') + data.toString().trim());
});

viteServer.stderr.on('data', (data) => {
  console.error(chalk.red('[Vite Error] ') + data.toString().trim());
});

// Handle process termination
process.on('SIGINT', () => {
  apiServer.kill();
  viteServer.kill();
  process.exit();
});
