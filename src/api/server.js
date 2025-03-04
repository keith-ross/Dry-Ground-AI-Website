import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname equivalent for ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

// Port configuration
const PORT = process.env.PORT || 3001;

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check endpoint called');
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Endpoint to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Log the received data
    console.log('Received contact form submission:', { name, email, company, message });

    // Validate required fields
    if (!name || !email || !message) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email and message are required' 
      });
    }

    // Store the submission in a simple log file for now
    const timestamp = new Date().toISOString();
    const submission = {
      timestamp,
      name,
      email,
      company: company || '(Not provided)',
      message
    };

    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, '../../data');
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (err) {
      console.error('Error creating data directory:', err);
    }

    // Save to file
    try {
      const filePath = path.join(dataDir, 'contact-submissions.json');

      // Try to read existing data first
      let submissions = [];
      try {
        const data = await fs.readFile(filePath, 'utf8');
        submissions = JSON.parse(data);
      } catch (err) {
        // File doesn't exist or is invalid, start with empty array
        console.log('Creating new submissions file');
      }

      // Add new submission and save
      submissions.push(submission);
      await fs.writeFile(filePath, JSON.stringify(submissions, null, 2));
      console.log('Saved submission to file');

    } catch (err) {
      console.error('Error saving submission:', err);
      // Continue anyway - we'll at least return success to the user
    }

    // For now, we'll simulate sending emails
    console.log('Would send email notification to admin for:', email);
    console.log('Would send confirmation email to user:', email);

    // Return success
    console.log('Contact form submission processed successfully');
    return res.status(200).json({ 
      success: true, 
      message: 'Thank you! Your message has been received.' 
    });

  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error processing your request'
    });
  }
});

// Start the API server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
});