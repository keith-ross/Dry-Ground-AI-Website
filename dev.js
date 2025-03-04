
const { spawn } = require('child_process');

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

// Install tsx if not already installed
spawnProcess('npm', ['install', '-D', 'tsx', 'ts-node', '@types/express', '@types/pg'], 'Install Dependencies');

// Start the Express API server with tsx
const backendProcess = spawnProcess('npx', ['tsx', 'server.ts'], 'Backend');

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down development servers...');
  frontendProcess.kill();
  backendProcess.kill();
  process.exit(0);
});
