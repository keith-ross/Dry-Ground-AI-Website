
// check-port.js
import { exec } from 'child_process';
import net from 'net';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

console.log(`Checking port ${PORT} status...`);

// Check if port is in use by any process
function checkPortUsage() {
  return new Promise((resolve) => {
    exec(`lsof -i:${PORT} || echo "No process found on port ${PORT}"`, (err, stdout) => {
      console.log('\nPort usage information:');
      console.log(stdout);
      
      const inUse = !stdout.includes('No process');
      resolve(inUse);
    });
  });
}

// Try to create a server on the port to test availability
function testPortBinding() {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${PORT} is already in use`);
        resolve(false);
      } else {
        console.log(`❌ Error testing port: ${err.message}`);
        resolve(false);
      }
    });
    
    server.once('listening', () => {
      // Close the server immediately
      server.close(() => {
        console.log(`✅ Port ${PORT} is available and can be bound`);
        resolve(true);
      });
    });
    
    // Try binding to 0.0.0.0 (all interfaces)
    server.listen(PORT, '0.0.0.0');
  });
}

async function checkPort() {
  try {
    console.log('Checking processes using this port...');
    const inUse = await checkPortUsage();
    
    console.log('\nTesting if port can be bound...');
    const canBind = await testPortBinding();
    
    console.log('\n=== PORT CHECK SUMMARY ===');
    console.log(`Port ${PORT}:`);
    console.log(`- In use by a process: ${inUse ? 'YES' : 'NO'}`);
    console.log(`- Can be bound: ${canBind ? 'YES' : 'NO'}`);
    
    if (inUse && !canBind) {
      console.log('\n⚠️ The port is in use and cannot be bound.');
      console.log('This is likely causing your server startup issues.');
      console.log('Try stopping any running servers or changing the PORT in your .env file.');
    } else if (inUse && canBind) {
      console.log('\n⚠️ Port appears to be in use but can still be bound.');
      console.log('This is unusual and might indicate a stale process listing.');
    } else if (!inUse && !canBind) {
      console.log('\n⚠️ Port cannot be bound even though no process appears to be using it.');
      console.log('This might indicate a permissions issue or a recent process that released the port.');
    } else {
      console.log('\n✅ Port is available and can be used by your server.');
    }
  } catch (error) {
    console.error('Error checking port:', error);
  }
}

checkPort();
