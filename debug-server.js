
// debug-server.js
import fetch from 'node-fetch';
import { exec } from 'child_process';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Server settings
const PORT = process.env.PORT || 3001;
const API_URL = `http://localhost:${PORT}/api/health`;

/**
 * Test if the SendGrid API key is configured
 */
async function testSendGridApiKey() {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const FROM_EMAIL = process.env.FROM_EMAIL;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  console.log('SendGrid API Key:', SENDGRID_API_KEY ? `Present (${SENDGRID_API_KEY.length} chars)` : 'Missing');
  console.log('FROM_EMAIL:', FROM_EMAIL || 'Missing');
  console.log('ADMIN_EMAIL:', ADMIN_EMAIL || 'Missing');

  if (!SENDGRID_API_KEY) {
    return {
      success: false,
      error: 'SendGrid API key is not configured'
    };
  }

  if (!SENDGRID_API_KEY.startsWith('SG.')) {
    return {
      success: false,
      error: 'SendGrid API key appears to be invalid (should start with SG.)'
    };
  }

  if (!FROM_EMAIL) {
    return {
      success: false,
      error: 'FROM_EMAIL is not configured'
    };
  }

  if (!ADMIN_EMAIL) {
    return {
      success: false,
      error: 'ADMIN_EMAIL is not configured'
    };
  }

  return {
    success: true,
    apiKey: {
      exists: true,
      valid: SENDGRID_API_KEY.startsWith('SG.'),
      length: SENDGRID_API_KEY.length
    },
    fromEmail: FROM_EMAIL,
    adminEmail: ADMIN_EMAIL
  };
}

/**
 * Test the API server connection
 */
async function testApiServer() {
  try {
    const healthResponse = await fetch(API_URL, {
      timeout: 5000,
      headers: { 'Accept': 'application/json' }
    });

    console.log('API server response status:', healthResponse.status);

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
    console.log('Submitting test form data:', testData);
    const submitResponse = await fetch(`http://localhost:${PORT}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    console.log('Contact API response status:', submitResponse.status);

    // Get raw response
    const rawText = await submitResponse.text();
    console.log('Raw response:', rawText);

    // Try to parse as JSON
    let jsonData;
    try {
      jsonData = JSON.parse(rawText);
      console.log('Parsed JSON response:', jsonData);
    } catch (e) {
      console.log('Response is not valid JSON');
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
 * Check if any processes are running on the API port
 */
async function checkPortUsage() {
  return new Promise((resolve) => {
    exec(`lsof -i:${PORT} || echo "No process found on port ${PORT}"`, (err, stdout) => {
      resolve({
        inUse: !stdout.includes('No process'),
        details: stdout
      });
    });
  });
}

/**
 * List all Node.js processes
 */
async function listNodeProcesses() {
  return new Promise((resolve) => {
    exec('ps aux | grep node | grep -v grep', (err, stdout) => {
      const processes = stdout
        .split('\n')
        .filter(line => line.trim())
        .map(line => {
          const parts = line.trim().split(/\s+/);
          const pid = parts[1];
          const command = parts.slice(10).join(' ');
          return { pid, command };
        });
      
      resolve(processes);
    });
  });
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('-------------------------------------');
  console.log('CONTACT FORM API DEBUG TOOL');
  console.log('-------------------------------------\n');

  // Test environment variables
  console.log('Environment Variables:');
  const envResult = await testSendGridApiKey();
  console.log('\n');

  // Check port usage
  console.log('Port Usage:');
  const portResult = await checkPortUsage();
  console.log(portResult.details);
  console.log('\n');

  // List Node.js processes
  console.log('Node.js Processes:');
  const processes = await listNodeProcesses();
  processes.forEach(p => {
    console.log(`PID: ${p.pid}, Command: ${p.command}`);
  });
  console.log('\n');

  // Test API server connection
  console.log('API Server Connection:');
  const serverResult = await testApiServer();
  if (serverResult.success) {
    console.log('✅ API server is running');
    console.log('Health check response:', JSON.stringify(serverResult.data, null, 2));
  } else {
    console.log(`❌ API server issue: ${serverResult.error}`);
    console.log('Make sure the server is running on port 3001');
  }
  console.log('\n');

  // Test contact form submission (only if server is running)
  if (serverResult.success) {
    console.log('Contact Form Submission Test:');
    const formResult = await testContactFormSubmission();
    
    if (formResult.success) {
      console.log('✅ Contact form submission successful');
    } else {
      console.log(`❌ Contact form submission failed: ${formResult.error || 'Unknown error'}`);
      if (formResult.jsonData) {
        console.log('JSON Response:', JSON.stringify(formResult.jsonData, null, 2));
      }
    }
    console.log('\n');
  }

  console.log('-------------------------------------');
  console.log('DEBUG SUMMARY:');
  console.log('-------------------------------------');
  console.log(`SendGrid API key: ${envResult.success ? '✅' : '❌'}`);
  console.log(`Port ${PORT} in use: ${portResult.inUse ? '✅' : '❌'}`);
  console.log(`API server: ${serverResult.success ? '✅' : '❌'}`);
  if (serverResult.success) {
    console.log(`Contact form: ${formResult?.success ? '✅' : '❌'}`);
  }
  console.log('-------------------------------------\n');

  if (!envResult.success) {
    console.log('⚠️ Environment issue(s):');
    console.log(envResult.error);
    console.log('Please check your .env file or Replit Secrets\n');
  }

  console.log('To fix issues:');
  console.log('1. Make sure your .env file contains the necessary variables (use .env.example as a template)');
  console.log('2. Restart the API server (npm run server)');
  console.log('3. Run this debug tool again to verify (node debug-server.js)');
}

// Run the tests
runTests();
