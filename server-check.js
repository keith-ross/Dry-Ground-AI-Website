
// server-check.js
import fetch from 'node-fetch';
import { exec } from 'child_process';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;
const API_URL = `http://localhost:${PORT}/api/health`;

console.log('Checking API server status...');
console.log(`Testing API health endpoint: ${API_URL}`);

// Check for SendGrid API key
console.log('\nEnvironment check:');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
console.log('SendGrid API Key configured:', SENDGRID_API_KEY ? '✅ Yes' : '❌ No');
if (SENDGRID_API_KEY) {
  console.log('  Key format valid:', SENDGRID_API_KEY.startsWith('SG.') ? '✅ Yes' : '❌ No');
  console.log('  Key length:', SENDGRID_API_KEY.length);
}
console.log('FROM_EMAIL configured:', process.env.FROM_EMAIL ? `✅ ${process.env.FROM_EMAIL}` : '❌ No');
console.log('ADMIN_EMAIL configured:', process.env.ADMIN_EMAIL ? `✅ ${process.env.ADMIN_EMAIL}` : '❌ No');

// Try to fetch the API health endpoint
async function checkServer() {
  try {
    console.log('\nAttempting to connect to API server...');
    
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

    // Test contact form endpoint
    console.log('\nTesting contact form endpoint...');
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      message: 'This is a test message from the server check script.'
    };

    try {
      const contactResponse = await fetch(`http://localhost:${PORT}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });

      console.log('Contact API response status:', contactResponse.status);
      const contactData = await contactResponse.json();
      console.log('Contact API response:', JSON.stringify(contactData, null, 2));

      if (contactResponse.ok && contactData.success) {
        console.log('✅ Contact endpoint working correctly');
      } else {
        console.log('❌ Contact endpoint test failed');
      }
    } catch (error) {
      console.log('❌ Contact endpoint test error:', error.message);
    }

    return true;
  } catch (error) {
    console.log(`❌ Server check failed: ${error.message}`);
    console.log(`❌ No functioning server detected on port ${PORT}`);

    // Find all node processes to help debug
    try {
      console.log('Found these server processes:');
      exec('ps aux | grep node', (err, stdout) => {
        if (err) {
          console.error('Error listing processes:', err);
          return;
        }

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
