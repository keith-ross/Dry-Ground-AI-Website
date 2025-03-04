
// api-test.js - A comprehensive API test tool
import fetch from 'node-fetch';
import { exec } from 'child_process';
import http from 'http';

// Configuration
const API_PORT = 3001;
const API_PATH = '/api/contact';
const DEBUG = true;

// Test data
const testData = {
  name: 'API Test',
  email: 'test@example.com', 
  message: 'This is a test message from the API test script'
};

console.log('========================================');
console.log('CONTACT FORM API TEST');
console.log('========================================');

// Function to test if we can create a server on the port
async function checkPortAvailability() {
  return new Promise((resolve) => {
    console.log(`Checking if port ${API_PORT} is available...`);
    
    const server = http.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${API_PORT} is already in use by another process`);
        resolve(false);
      } else {
        console.log(`❌ Error testing port: ${err.message}`);
        resolve(false);
      }
    });
    
    server.once('listening', () => {
      console.log(`✅ Port ${API_PORT} is available`);
      server.close(() => resolve(true));
    });
    
    server.listen(API_PORT, '0.0.0.0');
  });
}

// Function to check if the API is responding
async function testApiDirectly() {
  console.log(`\nTesting direct API connectivity on port ${API_PORT}...`);
  
  // First check the health endpoint
  try {
    console.log(`GET http://localhost:${API_PORT}/api/health`);
    const healthResponse = await fetch(`http://localhost:${API_PORT}/api/health`);
    console.log(`Health check status: ${healthResponse.status}`);
    
    if (healthResponse.ok) {
      const data = await healthResponse.json();
      console.log('Health check response:', data);
      console.log('✅ API health endpoint is working');
    } else {
      console.log('❌ API health endpoint returned an error');
      const text = await healthResponse.text();
      console.log('Response:', text);
    }
  } catch (error) {
    console.log(`❌ Failed to connect to API health endpoint: ${error.message}`);
  }
  
  // Now test the actual contact endpoint
  try {
    console.log(`\nTesting contact endpoint: POST http://localhost:${API_PORT}${API_PATH}`);
    console.log('Test data:', testData);
    
    const response = await fetch(`http://localhost:${API_PORT}${API_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    console.log(`Contact endpoint status: ${response.status}`);
    
    // Try to get the response as text first
    const rawText = await response.text();
    console.log('Raw response:', rawText);
    
    // Try to parse as JSON if possible
    try {
      if (rawText) {
        const jsonData = JSON.parse(rawText);
        console.log('Parsed JSON response:', jsonData);
        
        if (jsonData.success) {
          console.log('✅ Contact form submission succeeded');
        } else {
          console.log(`❌ Contact form submission failed: ${jsonData.error}`);
        }
      }
    } catch (e) {
      console.log('Response is not valid JSON');
    }
  } catch (error) {
    console.log(`❌ Failed to connect to contact endpoint: ${error.message}`);
  }
}

// Function to run full test sequence
async function runTests() {
  // Check for port conflicts
  const portAvailable = await checkPortAvailability();
  
  if (!portAvailable) {
    console.log('\n⚠️ Warning: The API port is already in use by another process.');
    console.log('This may cause conflicts if you try to start the API server.');
    
    // Try to find what's using the port
    exec(`lsof -i:${API_PORT} || echo "No process found"`, (err, stdout) => {
      if (!err && stdout && !stdout.includes("No process found")) {
        console.log('\nProcesses using port 3001:');
        console.log(stdout);
      }
    });
  }
  
  // Test API connectivity
  await testApiDirectly();
  
  // List all node processes for debugging
  console.log('\nAll running Node.js processes:');
  exec('ps aux | grep node | grep -v grep', (err, stdout) => {
    if (!err) {
      console.log(stdout || 'No Node.js processes found');
    }
  });
  
  console.log('\nTest completed.');
}

// Start tests
runTests().catch(error => {
  console.error('Error running tests:', error);
});
