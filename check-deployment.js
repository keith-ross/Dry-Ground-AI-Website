
// Script to check for deployment environment variables
import dotenv from 'dotenv';
dotenv.config();

console.log('=== Deployment Environment Check ===');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not set');
console.log('PORT:', process.env.PORT || '3001 (default)');
console.log('DATABASE_URL configured:', process.env.DATABASE_URL ? 'Yes' : 'No');

if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL is not configured!');
  console.error('Please add DATABASE_URL to your Deployment secrets in the Replit Deployments tab.');
  process.exit(1);
}

console.log('✅ All required environment variables are configured.');
