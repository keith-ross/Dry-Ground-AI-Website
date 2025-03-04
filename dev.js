
// @ts-check
import { spawn } from 'child_process';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Check if .env file exists, if not create a template
if (!fs.existsSync('.env')) {
  console.log('⚠️ .env file not found. Creating default template...');
  fs.writeFileSync('.env', `# Database connection
DATABASE_URL=postgres://username:password@hostname:port/database
# Environment
NODE_ENV=development
# Server port
PORT=3001
`);
  console.log('✅ Created .env file template. Please update with your actual values.');
  process.exit(1);
}

// Verify database connection string
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL is not set in .env file');
  console.error('Please set up your database connection string in the .env file');
  process.exit(1);
}

console.log('🚀 Starting development servers...');

// Run database check first
const dbCheck = spawn('node', ['fixdb.js']);

dbCheck.stdout.pipe(process.stdout);
dbCheck.stderr.pipe(process.stderr);

dbCheck.on('exit', (code) => {
  if (code !== 0) {
    console.error('❌ Database check failed. Please fix the issues before starting the servers.');
    process.exit(code);
  }

  console.log('✅ Database check completed successfully. Starting servers...');

  // Frontend server - Vite
  const frontend = spawn('npx', ['vite', '--host']);
  
  frontend.stdout.pipe(process.stdout);
  frontend.stderr.pipe(process.stderr);
  
  // Backend server - Node.js with ts-node
  const backend = spawn('npx', ['tsx', 'server.ts']);
  
  backend.stdout.pipe(process.stdout);
  backend.stderr.pipe(process.stderr);
  
  console.log('🚀 Development servers started');
  console.log('📱 Frontend: http://localhost:3000');
  console.log('🔌 API: http://localhost:3001');
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('👋 Shutting down development servers...');
    frontend.kill();
    backend.kill();
    process.exit(0);
  });
  
  // Handle server process exits
  frontend.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`❌ Frontend server exited with code ${code}`);
    }
  });
  
  backend.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`❌ API server exited with code ${code}`);
    }
  });
});
