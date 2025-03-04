
// Server diagnostics script
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

async function runDiagnostics() {
  console.log('🔍 Running server diagnostics...');
  console.log('-------------------------------------');
  
  // Check environment variables
  console.log('📋 Environment Variables:');
  const sendgridKey = process.env.SENDGRID_API_KEY || 'Not set';
  
  if (sendgridKey === 'Not set') {
    console.log('❌ SENDGRID_API_KEY is not set');
  } else {
    console.log('✅ SENDGRID_API_KEY is set');
    console.log(`   Length: ${sendgridKey.length}`);
    console.log(`   Prefix: ${sendgridKey.substring(0, 7)}...`);
  }
  
  console.log('\n📂 File System:');
  // Check data directory
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    console.log('❌ Data directory does not exist at:', dataDir);
    console.log('   Creating data directory...');
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('✅ Created data directory');
  } else {
    console.log('✅ Data directory exists at:', dataDir);
  }
  
  // Check database file
  const dbPath = path.join(dataDir, 'contact_submissions.db');
  if (fs.existsSync(dbPath)) {
    const stats = fs.statSync(dbPath);
    console.log('✅ Database file exists at:', dbPath);
    console.log(`   Size: ${stats.size} bytes`);
    console.log(`   Created: ${stats.birthtime}`);
  } else {
    console.log('❓ Database file does not exist at:', dbPath);
    console.log('   It will be created when the server runs');
  }
  
  // Test server connection
  console.log('\n🌐 Server Connection:');
  
  try {
    console.log('   Testing server connection...');
    // Start the server in the background
    require('./src/api/server');
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test health endpoint
    const healthResponse = await fetch('http://localhost:3001/api/health');
    const healthData = await healthResponse.json();
    
    console.log('✅ Server health endpoint responded');
    console.log('   Status:', healthData.status);
    console.log('   Environment:', healthData.env);
    console.log('   Email service configured:', healthData.emailServiceConfigured);
    
    // Test debug endpoint
    const debugResponse = await fetch('http://localhost:3001/api/debug');
    const debugData = await debugResponse.json();
    
    console.log('\n🔧 Server Debug Info:');
    console.log('   Timestamp:', debugData.timestamp);
    console.log('   Environment:', debugData.environment);
    console.log('   API Key Info:', debugData.apiKeyInfo);
    console.log('   Database Status:', debugData.dbStatus);
    console.log('   CORS Settings:', debugData.corsSettings);
    
    // Test a dummy contact submission
    console.log('\n✉️ Testing Contact Submission:');
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      message: 'This is a test message from the diagnostic script'
    };
    
    const submitResponse = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    if (submitResponse.ok) {
      const submitData = await submitResponse.json();
      console.log('✅ Contact form submission successful');
      console.log('   Response:', submitData);
    } else {
      console.log('❌ Contact form submission failed');
      console.log('   Status:', submitResponse.status);
      try {
        const errorData = await submitResponse.json();
        console.log('   Error:', errorData);
      } catch (e) {
        console.log('   Could not parse error response');
        const text = await submitResponse.text();
        console.log('   Raw response:', text || '(empty)');
      }
    }
    
  } catch (error) {
    console.error('❌ Error testing server:', error);
  }
  
  console.log('\n-------------------------------------');
  console.log('🏁 Diagnostics complete');
}

runDiagnostics();
