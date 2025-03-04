
/**
 * Script to check if the API server is running
 */
import http from 'http';
import { execSync } from 'child_process';

const PORT = 3001;

// Check if a process is running on the given port
function checkPort() {
  return new Promise((resolve) => {
    const req = http.request({
      host: '0.0.0.0',
      port: PORT,
      path: '/api/health',
      method: 'GET',
      timeout: 2000
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          running: res.statusCode === 200,
          data
        });
      });
    });
    
    req.on('error', () => {
      resolve({
        status: 0,
        running: false
      });
    });
    
    req.end();
  });
}

async function checkServer() {
  console.log('Checking API server status...');
  
  try {
    const result = await checkPort();
    
    if (result.running) {
      console.log(`Port ${PORT} is in use! Status: ${result.status}`);
      console.log(`✅ Server is running on port ${PORT}. Status code: ${result.status}`);
      
      if (result.data) {
        try {
          const parsed = JSON.parse(result.data);
          console.log('Server response:', parsed);
        } catch (e) {
          console.log('Raw server response:', result.data);
        }
      }
    } else {
      console.log(`❌ No server detected on port ${PORT}`);
    }
    
    // List running server processes
    try {
      console.log('Found these server processes:');
      const processes = execSync('ps aux | grep "node.*server\\.js" | grep -v grep').toString();
      if (processes.trim()) {
        processes.split('\n').filter(Boolean).forEach(proc => {
          const parts = proc.trim().split(/\s+/);
          const pid = parts[1];
          const command = parts.slice(10).join(' ');
          console.log(`PID: ${pid}, Command: ${command}`);
        });
      } else {
        console.log('No server processes found');
      }
    } catch (e) {
      console.log('Could not find server processes');
    }
    
  } catch (error) {
    console.error('Error checking server status:', error);
  }
}

// Run the check
checkServer();
