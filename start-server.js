
const { spawn } = require('child_process');
const chalk = require('chalk');

console.log(chalk.blue('Starting API server...'));

const server = spawn('node', ['--loader', 'ts-node/esm', 'src/api/server.ts'], {
  stdio: 'pipe',
  shell: true,
  env: { ...process.env, NODE_ENV: 'development' }
});

server.stdout.on('data', (data) => {
  console.log(chalk.green('[Server]'), data.toString().trim());
});

server.stderr.on('data', (data) => {
  console.error(chalk.red('[Server Error]'), data.toString().trim());
});

server.on('close', (code) => {
  console.log(chalk.yellow(`[Server] Process exited with code ${code}`));

  if (code !== 0) {
    console.log(chalk.yellow('Restarting server in 5 seconds...'));
    setTimeout(() => {
      console.log(chalk.blue('Restarting server...'));
      spawn('node', ['start-server.js'], {
        stdio: 'inherit',
        shell: true,
        detached: true
      }).unref();
      process.exit();
    }, 5000);
  }
});

process.on('uncaughtException', (err) => {
  console.error(chalk.red('[Uncaught Exception]'), err);
});

process.on('SIGINT', () => {
  console.log(chalk.yellow('Shutting down server...'));
  server.kill();
  process.exit();
});
