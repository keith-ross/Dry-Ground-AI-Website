
// Debug script to test the API endpoint directly
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

async function testContactApi() {
  console.log('=== Testing Contact API ===');
  
  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL environment variable is not set!');
    console.error('Please set it in your .env file before running this test.');
    process.exit(1);
  }
  
  console.log('✅ Database URL is set');
  
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '123-456-7890',
    message: 'This is a test message from the debug script'
  };
  
  try {
    console.log('🔍 Checking if server is running...');
    
    // Try to connect to the health endpoint first
    try {
      const healthResponse = await fetch('http://0.0.0.0:3001/api/health');
      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        console.log('✅ Server is running. Health check response:', healthData);
      } else {
        console.error('❌ Server health check failed with status:', healthResponse.status);
        throw new Error('Server health check failed');
      }
    } catch (healthError) {
      console.error('❌ Server does not appear to be running on port 3001');
      console.error('Please start the server before running this test');
      process.exit(1);
    }
    
    console.log('\n📤 Sending test request to contact API...');
    const response = await fetch('http://0.0.0.0:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    let responseData;
    try {
      responseData = await response.json();
    } catch (e) {
      responseData = { error: 'Could not parse JSON response' };
    }
    
    console.log('API Response status:', response.status);
    console.log('API Response data:', responseData);
    
    if (response.ok) {
      console.log('✅ Test completed successfully!');
    } else {
      console.log('❌ Test failed with status code:', response.status);
    }
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testContactApi();
