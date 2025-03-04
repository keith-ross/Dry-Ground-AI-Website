
import fetch from 'node-fetch';

const API_URL = 'http://0.0.0.0:3001';

async function testHealthEndpoint() {
  try {
    console.log(`Testing health endpoint at ${API_URL}/api/health`);
    const response = await fetch(`${API_URL}/api/health`);
    const data = await response.json();
    console.log('Health endpoint response:', data);
    return true;
  } catch (error) {
    console.error('Health endpoint error:', error.message);
    return false;
  }
}

async function testContactEndpoint() {
  try {
    console.log(`Testing contact endpoint at ${API_URL}/api/contact`);
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '123-456-7890',
      message: 'This is a test message'
    };
    
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    const data = await response.json();
    console.log('Contact endpoint response:', data);
    return true;
  } catch (error) {
    console.error('Contact endpoint error:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('=== API Testing ===');
  
  const healthOk = await testHealthEndpoint();
  if (!healthOk) {
    console.error('❌ Health endpoint test failed');
    return;
  }
  
  const contactOk = await testContactEndpoint();
  if (!contactOk) {
    console.error('❌ Contact endpoint test failed');
    return;
  }
  
  console.log('✅ All tests passed');
}

runTests();
