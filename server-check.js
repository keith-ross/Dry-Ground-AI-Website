
import http from 'http';
import { exec } from 'child_process';

// Configuration
const PORT = 3001;

// Check if server is running
function checkServerStatus() {
  console.log('Checking API server status...');

  const options = {
    host: 'localhost',
    port: PORT,
    path: '/api/health',
    timeout: 2000
  };

  const req = http.get(options, res => {
    if (res.statusCode === 200) {
      console.log(`✅ Server is running on port ${PORT}. Status code: ${res.statusCode}`);
      
      // Collect response data
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const healthData = JSON.parse(data);
          console.log('Server health info:', healthData);
        } catch (e) {
          console.log('Could not parse health response');
        }
        listServerProcesses();
      });
    } else {
      console.log(`❌ Server responded with status code: ${res.statusCode}`);
      listServerProcesses();
    }
  });

  req.on('error', (err) => {
    console.log(`❌ No server detected on port ${PORT}`);
    listServerProcesses();
  });

  req.on('timeout', () => {
    req.destroy();
    console.log(`❌ Server check timed out on port ${PORT}`);
    listServerProcesses();
  });
}

// List all server processes
function listServerProcesses() {
  console.log('Found these server processes:');

  exec('ps aux | grep node', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing process list: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Process listing stderr: ${stderr}`);
      return;
    }

    // Filter and format output
    const lines = stdout.split('\n')
      .filter(line => line.includes('node') && !line.includes('grep'))
      .map(line => {
        const parts = line.trim().split(/\s+/);
        const pid = parts[1];
        const command = parts.slice(10).join(' ');
        return `PID: ${pid}, Command: ${command}`;
      });

    if (lines.length === 0) {
      console.log('No Node.js processes found.');
    } else {
      console.log(lines.join('\n'));
    }
  });
}

// Run the checks
checkServerStatus();
