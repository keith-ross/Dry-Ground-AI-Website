
#!/bin/bash
# Start the Express server in the background
npx ts-node server.ts &
SERVER_PID=$!

# Give the server a moment to start
sleep 2

# Start the Vite dev server
npx vite --host 0.0.0.0

# When Vite exits, also kill the Express server
kill $SERVER_PID
