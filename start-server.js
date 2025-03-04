import app from './src/api/server.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});


const chalk = require('chalk');

console.log(chalk.blue('Starting API server...'));


process.on('uncaughtException', (err) => {
  console.error(chalk.red('[Uncaught Exception]'), err);
});

process.on('SIGINT', () => {
  console.log(chalk.yellow('Shutting down server...'));
  // Assuming app.close() exists in your express.js server file for graceful shutdown.  If not, you might need to add it.
  app.close();
  process.exit();
});