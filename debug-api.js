
// Debug script to test the API endpoint directly
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

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
    const response = await fetch('http://0.0.0.0:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    const responseData = await response.json().catch(() => ({}));
    
    console.log('API Response status:', response.status);
    console.log('API Response data:', responseData);
    
    if (response.ok) {
      console.log('✅ Test completed successfully!');
    } else {
      console.log('❌ Test failed with status code:', response.status);
    }
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.error('Make sure the API server is running on port 3001');
  }
}

testContactApi();
