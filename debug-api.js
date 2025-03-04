
// Debug script to test the API endpoint directly
require('dotenv').config();
const axios = require('axios');

async function testContactApi() {
  console.log('=== Testing Contact API ===');
  console.log('Database URL:', process.env.DATABASE_URL ? 'Set (hidden)' : 'Not set');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '123-456-7890',
    message: 'This is a test message from the debug script'
  };
  
  try {
    console.log('Sending test request to API...');
    const response = await axios.post('http://localhost:3001/api/contact', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('API Response status:', response.status);
    console.log('API Response data:', response.data);
    console.log('✅ Test completed successfully!');
  } catch (error) {
    console.error('❌ API test failed:');
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server');
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
    }
  }
}

testContactApi();
