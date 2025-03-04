import app from './src/api/server.js';
import chalk from 'chalk';

console.log(chalk.blue('Starting API server...'));

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(chalk.green(`API server running on port ${PORT}`));
});

// Add close method to app for graceful shutdown
app.close = () => {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        console.error(chalk.red('Error closing server:'), err);
        reject(err);
      } else {
        console.log(chalk.yellow('Server closed successfully'));
        resolve();
      }
    });
  });
};

process.on('uncaughtException', (err) => {
  console.error(chalk.red('[Uncaught Exception]'), err);
});

process.on('SIGINT', async () => {
  console.log(chalk.yellow('Shutting down server...'));
  try {
    await app.close();
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
});