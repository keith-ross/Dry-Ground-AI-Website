
// check-port.js
import { exec } from 'child_process';

const PORT = process.env.PORT || 3001;

console.log(`Checking for processes using port ${PORT}...`);

// Check if the port is in use
exec(`lsof -i:${PORT} || echo "No process found on port ${PORT}"`, (err, stdout) => {
  console.log('Port status:');
  console.log(stdout);
  
  // Find all node processes
  exec('ps aux | grep node | grep -v grep', (err, stdout) => {
    console.log('\nRunning Node.js processes:');
    stdout.split('\n')
      .filter(line => line.trim() !== '')
      .forEach(line => {
        const parts = line.trim().split(/\s+/);
        const pid = parts[1];
        const command = parts.slice(10).join(' ');
        console.log(`PID: ${pid}, Command: ${command}`);
      });
      
    console.log('\nIf no process is listening on port 3001, try restarting the server:');
    console.log('1. Kill any existing server processes');
    console.log('2. Run "node start-server.js" to start the server again');
  });
});
