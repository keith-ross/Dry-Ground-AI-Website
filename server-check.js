// server-check.js
import fetch from 'node-fetch';
import { exec } from 'child_process';

const PORT = process.env.PORT || 3001;
const API_URL = `http://localhost:${PORT}/api/health`;

console.log('Checking API server status...');

// Try to fetch the API health endpoint
async function checkServer() {
  try {
    const response = await fetch(API_URL, { timeout: 5000 });
    const data = await response.json();

    console.log('✅ API server is running!');
    console.log('Health check response:', data);

    return true;
  } catch (error) {
    console.log(`❌ No server detected on port ${PORT}`);

    // Find all node processes to help debug
    exec('ps aux | grep node', (err, stdout) => {
      if (err) {
        console.error('Error listing processes:', err);
        return;
      }

      console.log('Found these server processes:');
      stdout.split('\n')
        .filter(line => line.includes('node') && !line.includes('grep'))
        .forEach(line => {
          const parts = line.trim().split(/\s+/);
          const pid = parts[1];
          const command = parts.slice(10).join(' ');
          console.log(`PID: ${pid}, Command: ${command}`);
        });
    });

    return false;
  }
}

checkServer();