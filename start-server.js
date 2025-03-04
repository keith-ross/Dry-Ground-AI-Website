
// start-server.js
import { spawn, exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const SERVER_PATH = path.join(__dirname, 'src', 'api', 'server.js');

console.log('Starting API server...');
console.log('Server path:', SERVER_PATH);
console.log('PORT:', PORT);

// Verify the server file exists
if (!fs.existsSync(SERVER_PATH)) {
  console.error(`ERROR: Server file not found at ${SERVER_PATH}`);
  process.exit(1);
}

// Check for port conflicts before starting
function checkPortConflicts() {
  return new Promise((resolve) => {
    exec(`lsof -i:${PORT} | grep LISTEN`, (err, stdout, stderr) => {
      if (stdout) {
        console.warn(`⚠️ Warning: Port ${PORT} is already in use!`);
        console.warn('This might cause the server to fail starting.');
        console.warn('Consider killing the conflicting process before continuing.');
        console.warn('Process using this port:');
        console.warn(stdout);
        resolve(true); // Port has conflict
      } else {
        resolve(false); // No conflict
      }
    });
  });
}

// Check if environment variables are set
console.log('\nEnvironment variables:');
console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY ? 'Set (length: ' + process.env.SENDGRID_API_KEY.length + ')' : 'Not set');
console.log('FROM_EMAIL:', process.env.FROM_EMAIL || 'Not set');
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'Not set');

// Start the server
async function startServer() {
  try {
    const hasConflict = await checkPortConflicts();
    if (hasConflict) {
      console.log('\nAttempting to start server anyway...');
    } else {
      console.log(`\nPort ${PORT} is available. Proceeding...`);
    }
    
    console.log('\nStarting the API server...');
    
    // Check for missing environment variables
    const requiredEnvVars = [
      { name: 'SENDGRID_API_KEY', present: Boolean(process.env.SENDGRID_API_KEY) },
      { name: 'FROM_EMAIL', present: Boolean(process.env.FROM_EMAIL) },
      { name: 'ADMIN_EMAIL', present: Boolean(process.env.ADMIN_EMAIL) }
    ];
    
    const missingVars = requiredEnvVars.filter(v => !v.present);
    if (missingVars.length > 0) {
      console.warn('⚠️ Warning: Missing environment variables:');
      missingVars.forEach(v => console.warn(`  - ${v.name}`));
      console.warn('The server might not function correctly without these variables.');
      console.warn('Consider adding them to your .env file or Replit Secrets.');
    }
    
    const serverProcess = spawn('node', [SERVER_PATH], {
      stdio: 'inherit',
      env: {
        ...process.env,
        PORT: PORT.toString()
      }
    });

    serverProcess.on('error', (error) => {
      console.error('Failed to start API server:', error);
      process.exit(1);
    });

    serverProcess.on('exit', (code) => {
      console.log(`API server process exited with code ${code}`);
      if (code !== 0) {
        console.log('Attempting to restart server in 5 seconds...');
        setTimeout(() => startServer(), 5000);
      }
    });

    // Monitor for port usage
    setTimeout(() => {
      exec(`lsof -i:${PORT} | grep LISTEN`, (err, stdout) => {
        if (err || !stdout) {
          console.warn(`⚠️ Warning: No process seems to be listening on port ${PORT}`);
          console.warn('This might indicate that the server failed to start properly.');
        } else {
          console.log(`✅ Server is listening on port ${PORT}`);
        }
      });
    }, 2000);

    // Handle process termination signals
    process.on('SIGINT', () => {
      console.log('Terminating API server...');
      serverProcess.kill('SIGINT');
      process.exit();
    });

    process.on('SIGTERM', () => {
      console.log('Terminating API server...');
      serverProcess.kill('SIGTERM');
      process.exit();
    });

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
