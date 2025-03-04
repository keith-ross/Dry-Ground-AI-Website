/**
 * Debug script to test API connection and functionality
 */
const fetch = require('node-fetch');

// Configuration
const API_BASE_URL = process.env.API_URL || 'http://localhost:3001';
const API_ENDPOINT = '/api/contact';


// Test data (This will be reused from original)
const testData = {
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  message: 'This is a test message'
};

// Test the health endpoint (This remains unchanged from original)
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

// Test the contact form endpoint (This is replaced with improved version)
async function testContactForm() {
  console.log('=== TESTING CONTACT API ===');
  console.log(`Sending request to: ${API_BASE_URL}${API_ENDPOINT}`);

  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    message: 'This is a test message from API debug script'
  };

  try {
    console.log('Test payload:', JSON.stringify(testData, null, 2));

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    console.log('Response status:', response.status);

    // Get the raw text first
    const rawText = await response.text();
    console.log('Raw response:', rawText);

    // Try to parse as JSON
    if (rawText) {
      try {
        const jsonData = JSON.parse(rawText);
        console.log('Parsed JSON response:', jsonData);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e.message);
      }
    } else {
      console.warn('Empty response received');
    }

    console.log('Test complete.');
    return response.status === 200;
  } catch (error) {
    console.error('Contact form test failed:', error.message);
    return false;
  }
}


// Run tests (This remains mostly unchanged from original)
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