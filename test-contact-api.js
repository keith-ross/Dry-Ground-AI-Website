
// test-contact-api.js - Test the contact form API
require('dotenv').config();
const http = require('http');

const API_PORT = 3001;
const TEST_DATA = {
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  message: 'This is a test message from the API test script'
};

console.log('CONTACT API TEST\n');

// Check health endpoint
async function checkHealth() {
  console.log(`Checking API health at http://localhost:${API_PORT}/api/health...`);
  
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: API_PORT,
      path: '/api/health',
      method: 'GET',
      timeout: 3000
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`Health check status: ${res.statusCode}`);
        console.log(`Health check response: ${data}`);
        
        if (res.statusCode === 200) {
          console.log('✅ API server is running!\n');
          resolve(true);
        } else {
          console.log('❌ API server returned non-200 status code\n');
          resolve(false);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ API server is not running or not accessible:', error.message);
      resolve(false);
    });
    
    req.on('timeout', () => {
      console.error('❌ API health check timed out');
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
}

// Test contact endpoint
async function testContactForm() {
  console.log('Testing contact form endpoint...');
  console.log(`POST http://localhost:${API_PORT}/api/contact`);
  console.log('Request data:', JSON.stringify(TEST_DATA, null, 2));
  
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: API_PORT,
      path: '/api/contact',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`Response status: ${res.statusCode}`);
        
        try {
          const parsedData = JSON.parse(data);
          console.log('Response:', JSON.stringify(parsedData, null, 2));
          
          if (res.statusCode === 200 && parsedData.success) {
            console.log('✅ Contact form test successful!');
            resolve(true);
          } else {
            console.log('❌ Contact form test failed');
            resolve(false);
          }
        } catch (error) {
          console.error('Error parsing response:', error);
          console.log('Raw response:', data);
          resolve(false);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ Error connecting to API server:', error.message);
      console.log('Please make sure the API server is running.');
      resolve(false);
    });
    
    req.on('timeout', () => {
      console.error('❌ Request timed out');
      req.destroy();
      resolve(false);
    });
    
    req.write(JSON.stringify(TEST_DATA));
    req.end();
  });
}

// Run tests
async function runTests() {
  const healthOk = await checkHealth();
  
  if (healthOk) {
    await testContactForm();
  } else {
    console.log('Please start the API server first with: node start-contact-api.js');
  }
  
  console.log('\nTest complete!');
}

runTests().catch(error => {
  console.error('Error running tests:', error);
});
