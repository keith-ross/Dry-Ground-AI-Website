
/**
 * Script to check if the API server is running
 */
import http from 'http';
import { exec } from 'child_process';

// Function to check if a process is running on port 3001
function checkPortInUse(port, callback) {
  const options = {
    host: '0.0.0.0',
    port: port,
    timeout: 1000
  };

  const req = http.request(options, (res) => {
    console.log(`Port ${port} is in use! Status: ${res.statusCode}`);
    callback(true, res.statusCode);
  });

  req.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
      console.log(`Port ${port} is free. No server running.`);
      callback(false);
    } else {
      console.log(`Error checking port ${port}: ${err.message}`);
      callback(false);
    }
  });

  req.end();
}

// Find processes using port 3001
function findProcessesOnPort(port) {
  return new Promise((resolve) => {
    exec(`ps aux | grep "node.*server\\.js"`, (error, stdout, stderr) => {
      if (error) {
        console.log('Error finding processes:', error.message);
        resolve([]);
        return;
      }
      
      if (stderr) {
        console.log('Error output:', stderr);
      }
      
      const processes = stdout.split('\n')
        .filter(line => line.trim() && !line.includes('grep'))
        .map(line => {
          const parts = line.trim().split(/\s+/);
          return {
            pid: parts[1],
            command: parts.slice(10).join(' ')
          };
        });
      
      resolve(processes);
    });
  });
}

// Main function
async function checkServerStatus() {
  console.log('Checking API server status...');
  
  checkPortInUse(3001, async (inUse, statusCode) => {
    if (inUse) {
      console.log(`✅ Server is running on port 3001. Status code: ${statusCode}`);
      
      // Check if it's our server
      const processes = await findProcessesOnPort(3001);
      console.log('Found these server processes:');
      processes.forEach(proc => {
        console.log(`PID: ${proc.pid}, Command: ${proc.command}`);
      });
      
    } else {
      console.log('❌ Server is NOT running on port 3001');
      
      // Try to find any node processes that might be our server
      const processes = await findProcessesOnPort(3001);
      if (processes.length > 0) {
        console.log('Found these node processes that might be servers:');
        processes.forEach(proc => {
          console.log(`PID: ${proc.pid}, Command: ${proc.command}`);
        });
      } else {
        console.log('No server processes found');
      }
    }
  });
}

// Run the check
checkServerStatus();
