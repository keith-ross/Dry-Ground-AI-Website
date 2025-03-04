
// server-check.js
import fetch from 'node-fetch';
import { exec } from 'child_process';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;
const API_URL = `http://localhost:${PORT}/api/health`;

console.log('Checking API server status...');
console.log(`Testing API health endpoint: ${API_URL}`);

// Try to fetch the API health endpoint
async function checkServer() {
  try {
    console.log('Attempting to connect to API server...');
    
    const response = await fetch(API_URL, { 
      timeout: 5000,
      headers: { 'Accept': 'application/json' }
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.log('Response not OK');
      try {
        const text = await response.text();
        console.log('Error response body:', text);
      } catch (e) {
        console.log('Could not read response body');
      }
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const data = await response.json();

    console.log('✅ API server is running!');
    console.log('Health check response:', JSON.stringify(data, null, 2));

    // Test email service config
    if (data.emailService) {
      if (data.emailService.success) {
        console.log('✅ Email service is configured correctly');
      } else {
        console.log('⚠️ Email service configuration issues:');
        console.log('  API Key exists:', data.emailService.apiKeyExists);
        console.log('  From Email:', data.emailService.fromEmail);
        console.log('  Admin Email:', data.emailService.adminEmail);
      }
    }

    return true;
  } catch (error) {
    console.log(`❌ Server check failed: ${error.message}`);
    console.log(`❌ No functioning server detected on port ${PORT}`);

    // Find all node processes to help debug
    try {
      console.log('Looking for running Node.js processes...');
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
          
        // Try to determine if the port is in use
        exec(`lsof -i:${PORT} || echo "No process found on port ${PORT}"`, (err, stdout) => {
          if (err && !stdout.includes('No process')) {
            console.error('Error checking port:', err);
            return;
          }
          
          console.log(`Port ${PORT} status:`);
          console.log(stdout || 'No process is using this port');
        });
      });
    } catch (e) {
      console.error('Error running debug commands:', e);
    }

    return false;
  }
}

// Run the check
checkServer();
