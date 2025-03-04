require('dotenv').config();

const app = require('./src/api/server').default;

// Get port from environment variable or use a default
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=== API Server Started ===`);
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint: http://0.0.0.0:${PORT}/api/contact`);
  console.log(`Health check: http://0.0.0.0:${PORT}/api/health`);
  console.log(`Environment check: http://0.0.0.0:${PORT}/api/env`);
  console.log(`SendGrid API Key configured: ${process.env.SENDGRID_API_KEY ? 'Yes' : 'No'}`);
  console.log(`Admin Email configured: ${process.env.ADMIN_EMAIL || 'Not set (using default)'}`);
  console.log(`===============================`);
});