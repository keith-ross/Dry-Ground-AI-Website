
import fetch from 'node-fetch';

async function checkServerStatus() {
  console.log('Checking if server is running on port 5000...');
  
  try {
    const response = await fetch('http://0.0.0.0:5000/api/health');
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Server is running! Response:', data);
    } else {
      console.log('❌ Server returned status:', response.status);
    }
  } catch (error) {
    console.error('❌ Error connecting to server:', error.message);
    console.error('Server does not appear to be running on port 3001');
  }
}

checkServerStatus();
