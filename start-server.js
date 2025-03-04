#!/usr/bin/env node

const app = require('./src/api/server');
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
=============================
API SERVER STARTED
=============================
Server URL: http://0.0.0.0:${PORT}
Health check: http://0.0.0.0:${PORT}/api/health
Contact API: http://0.0.0.0:${PORT}/api/contact (POST)
=============================
  `);
});