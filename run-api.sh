
#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
  echo "❌ ERROR: .env file not found!"
  echo "Please create .env file with DATABASE_URL."
  exit 1
fi

# Kill any existing processes on port 3001
echo "🧹 Cleaning up any existing processes on port 3001..."
lsof -ti:3001 | xargs -r kill -9

# Start the server
echo "🚀 Starting API server on port 3001..."
node server.js
