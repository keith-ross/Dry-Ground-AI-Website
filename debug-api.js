
/**
 * Debug script to test API connection and functionality
 */
import fetch from 'node-fetch';

async function testApiConnection() {
  console.log('\n----------------------------------');
  console.log('TESTING API CONNECTION');
  console.log('----------------------------------');
  
  try {
    console.log('Testing API health endpoint...');
    const healthResponse = await fetch('http://localhost:3001/api/health');
    console.log('Response status:', healthResponse.status);
    
    const healthText = await healthResponse.text();
    console.log('Response body:', healthText);
    
    try {
      const healthJson = JSON.parse(healthText);
      console.log('Parsed JSON:', healthJson);
    } catch (e) {
      console.log('Response is not valid JSON');
    }
  } catch (error) {
    console.error('Error connecting to API:', error.message);
  }
  
  console.log('\n----------------------------------');
  console.log('TESTING CONTACT FORM SUBMISSION');
  console.log('----------------------------------');
  
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Debug Company',
      message: 'This is a test message from debug-api.js'
    };
    
    console.log('Sending test data:', testData);
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    const responseText = await response.text();
    console.log('Raw response:', responseText);
    
    try {
      const responseJson = JSON.parse(responseText);
      console.log('Parsed JSON:', responseJson);
    } catch (e) {
      console.log('Response is not valid JSON');
    }
  } catch (error) {
    console.error('Error testing contact form:', error.message);
  }
}

// Run the tests
testApiConnection().catch(error => {
  console.error('Unhandled error during API testing:', error);
});
