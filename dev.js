
const { spawn } = require('child_process');
const path = require('path');

// Function to spawn a process
function spawnProcess(command, args, name) {
  const proc = spawn(command, args, {
    stdio: 'pipe',
    shell: true
  });
  
  console.log(`Starting ${name}...`);
  
  proc.stdout.on('data', (data) => {
    console.log(`[${name}] ${data}`);
  });
  
  proc.stderr.on('data', (data) => {
    console.error(`[${name}] ${data}`);
  });
  
  proc.on('close', (code) => {
    console.log(`${name} process exited with code ${code}`);
  });
  
  return proc;
}

// Start the Vite development server
const frontendProcess = spawnProcess('npm', ['run', 'dev', '--', '--host', '0.0.0.0'], 'Frontend');

// Start the Express API server
const backendProcess = spawnProcess('node', ['server.ts'], 'Backend');

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down development servers...');
  frontendProcess.kill();
  backendProcess.kill();
  process.exit(0);
});
