#!/usr/bin/env node

const fetch = require('node-fetch');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log(`Loading environment variables from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.log('No .env file found, using environment variables from Replit Secrets');
}

/**
 * Test if the SendGrid API key is configured correctly
 */
async function testSendGridApiKey() {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;

    if (!apiKey) {
      return { 
        success: false, 
        error: 'SendGrid API key is not configured' 
      };
    }

    console.log(`SendGrid API key found: ${apiKey.substring(0, 5)}...`);
    console.log(`API key length: ${apiKey.length}`);

    // A valid SendGrid API key starts with "SG." and is typically 69 characters long
    if (!apiKey.startsWith('SG.') || apiKey.length < 50) {
      return { 
        success: false, 
        error: 'SendGrid API key format appears to be invalid' 
      };
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Unknown error testing SendGrid API key'
    };
  }
}

/**
 * Test API server connection
 */
async function testApiServer() {
  try {
    const healthResponse = await fetch('http://localhost:3001/api/health');

    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      return {
        success: true,
        data: healthData
      };
    } else {
      const errorText = await healthResponse.text();
      return {
        success: false,
        error: `Status ${healthResponse.status}: ${errorText || '(empty response)'}`
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Unknown error connecting to API server'
    };
  }
}

/**
 * Test contact form submission
 */
async function testContactFormSubmission() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    message: 'This is a test message from the debug script.'
  };

  try {
    const submitResponse = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    // Get raw response
    const rawText = await submitResponse.text();

    // Try to parse as JSON
    let jsonData;
    try {
      jsonData = JSON.parse(rawText);
    } catch (e) {
      // Not valid JSON
    }

    return {
      success: submitResponse.ok && jsonData?.success,
      status: submitResponse.status,
      rawResponse: rawText,
      jsonData: jsonData,
      error: jsonData?.error || null
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Unknown error testing contact form'
    };
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('-------------------------------------');
  console.log('CONTACT FORM API DEBUG TOOL');
  console.log('-------------------------------------\n');

  // Test SendGrid configuration
  console.log('Testing SendGrid API key...');
  const sendgridResult = await testSendGridApiKey();
  if (sendgridResult.success) {
    console.log('✅ SendGrid API key is configured correctly\n');
  } else {
    console.log(`❌ SendGrid API key issue: ${sendgridResult.error}`);
    console.log('   Please check your SENDGRID_API_KEY environment variable\n');
  }

  // Test API server connection
  console.log('Testing server connection...');
  const serverResult = await testApiServer();
  if (serverResult.success) {
    console.log('✅ API server is running');
    console.log('   Response:', serverResult.data);
  } else {
    console.log(`❌ API server issue: ${serverResult.error}`);
    console.log('   Make sure the server is running on port 3001\n');
  }

  console.log('\n-------------------------------------');

  // Test contact form submission
  console.log('Testing contact form submission...');
  const formResult = await testContactFormSubmission();

  console.log('Response status:', formResult.status);
  console.log('Raw response:', formResult.rawResponse);

  if (formResult.success) {
    console.log('✅ Contact form submission successful');
  } else {
    console.log(`❌ Contact form submission failed: ${formResult.error || 'Unknown error'}`);
    if (formResult.jsonData) {
      console.log('   JSON Response:', JSON.stringify(formResult.jsonData, null, 2));
    }
  }

  console.log('\n-------------------------------------');
  console.log('DEBUG SUMMARY:');
  console.log('-------------------------------------');
  console.log(`SendGrid API key: ${sendgridResult.success ? '✅' : '❌'}`);
  console.log(`API server: ${serverResult.success ? '✅' : '❌'}`);
  console.log(`Contact form: ${formResult.success ? '✅' : '❌'}`);
  console.log('-------------------------------------\n');

  console.log('To test the form submission in your browser, make sure:');
  console.log('1. The API server is running (npm run server)');
  console.log('2. The SendGrid API key is properly configured in Replit Secrets');
  console.log('3. Your frontend is connecting to the correct API URL');
}

// Run all tests
runTests();