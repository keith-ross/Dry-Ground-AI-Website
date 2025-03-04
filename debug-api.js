
/**
 * Debug script to test API connection and functionality
 */
import fetch from 'node-fetch';

// Configuration
const API_BASE_URL = process.env.API_URL || 'http://localhost:3001';
const API_ENDPOINT = '/api/contact';

// Test data
const testData = {
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  message: 'This is a test message'
};

// Test the health endpoint
async function checkHealth() {
  console.log('Checking API health...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();
    
    console.log('Health check status:', response.status);
    console.log('Health check response:', data);
    
    return response.status === 200;
  } catch (error) {
    console.error('Health check failed:', error.message);
    return false;
  }
}

// Test the contact form endpoint
async function testContactForm() {
  console.log('Testing contact form endpoint...');
  console.log('Sending test data:', testData);
  
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    console.log('API response status:', response.status);
    
    let responseData;
    try {
      responseData = await response.json();
      console.log('API response data:', responseData);
    } catch (parseError) {
      const rawText = await response.text();
      console.log('Could not parse response as JSON. Raw response:', rawText);
    }
    
    return response.status === 200;
  } catch (error) {
    console.error('Contact form test failed:', error.message);
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('API URL:', API_BASE_URL);
  
  // Check health first
  const healthStatus = await checkHealth();
  if (!healthStatus) {
    console.log('❌ API health check failed. Cannot proceed with further tests.');
    return;
  }
  
  console.log('✅ API health check passed.');
  
  // Test contact form
  const contactFormStatus = await testContactForm();
  if (contactFormStatus) {
    console.log('✅ Contact form test passed.');
  } else {
    console.log('❌ Contact form test failed.');
  }
}

// Run all tests
runTests().catch(error => {
  console.error('Error running tests:', error);
});
