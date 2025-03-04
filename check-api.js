
/**
 * Simple script to check if the API server is running and properly responding
 */
const http = require('http');

const API_PORT = 3001;
const TEST_DATA = {
  name: 'Test User',
  email: 'test@example.com',
  company: 'API Test',
  message: 'This is a test message from check-api.js'
};

// Function to check if the API server is running
function checkApiHealth() {
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
        try {
          console.log(`Health check status: ${res.statusCode}`);
          console.log(`Health check response: ${data}`);
          
          if (res.statusCode === 200) {
            console.log('✅ API server is running!');
            resolve(true);
          } else {
            console.log('❌ API server returned non-200 status code');
            resolve(false);
          }
        } catch (error) {
          console.error('Error parsing health check response:', error);
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

// Function to test the contact form endpoint
function testContactEndpoint() {
  console.log('\nTesting contact form endpoint...');
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
        try {
          console.log(`Response status: ${res.statusCode}`);
          console.log(`Response headers:`, JSON.stringify(res.headers, null, 2));
          console.log(`Raw response: ${data}`);
          
          try {
            const parsedData = JSON.parse(data);
            console.log('Parsed JSON response:', JSON.stringify(parsedData, null, 2));
            
            if (res.statusCode === 200 && parsedData.success) {
              console.log('✅ Contact endpoint is working correctly!');
              resolve(true);
            } else {
              console.log('❌ Contact endpoint test failed');
              resolve(false);
            }
          } catch (parseError) {
            console.error('❌ Failed to parse response as JSON:', parseError.message);
            resolve(false);
          }
        } catch (error) {
          console.error('Error processing response:', error);
          resolve(false);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ Error contacting API server:', error.message);
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

// Main function
async function main() {
  console.log('API SERVER CHECK TOOL\n');
  
  const isRunning = await checkApiHealth();
  
  if (isRunning) {
    await testContactEndpoint();
  } else {
    console.log('\n⚠️ Please start the API server first with:');
    console.log('   node start-server.js');
  }
  
  console.log('\nCheck complete!');
}

// Run the main function
main().catch(error => {
  console.error('Unexpected error:', error);
});
