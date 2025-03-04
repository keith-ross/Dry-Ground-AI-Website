import express from 'express';
import cors from 'cors';
import { sendAdminNotificationEmail, sendContactConfirmationEmail } from '../lib/emailService.js';
import { initDb, saveContactSubmission } from '../lib/db.js';
import bodyParser from 'body-parser';
import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS - allow all origins in development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Set SendGrid API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('WARNING: SENDGRID_API_KEY is not set. Email functionality will not work.');
}

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Simple database using JSON file (retained from original code)
const dbPath = path.join(dataDir, 'contacts.json');
const getContacts = () => {
  if (!fs.existsSync(dbPath)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch (error) {
    console.error('Error reading database:', error);
    return [];
  }
};

const saveContact = (contact) => {
  const contacts = getContacts();
  const newContact = {
    ...contact,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  contacts.push(newContact);
  fs.writeFileSync(dbPath, JSON.stringify(contacts, null, 2));
  return newContact;
};


// Health check endpoint
app.get('/api/health', (req, res) => {
  const sendgridApiKey = process.env.SENDGRID_API_KEY;

  console.log('Health check requested');

  return res.status(200).json({
    status: 'ok',
    sendgridConfigured: !!sendgridApiKey,
    timestamp: new Date().toISOString()
  });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Contact form submission received:', req.body);

  try {
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Initialize database
    try {
      await initDb();
    } catch (dbError) {
      console.error('Database initialization error:', dbError);
      // Continue without DB if there's an error
    }

    // Save to database if available
    let savedContact = null;
    try {
      savedContact = await saveContactSubmission({ name, email, company, message });
      console.log('Saved contact submission to database:', savedContact);
    } catch (dbError) {
      console.error('Failed to save to database:', dbError);
      // Continue without saving to DB
    }

    // Send notification email to admin
    try {
      console.log('Attempting to send admin notification email...');
      const adminEmailResult = await sendAdminNotificationEmail({ name, email, company, message });

      if (!adminEmailResult.success) {
        console.error('Failed to send admin notification:', adminEmailResult.error);
      } else {
        console.log('Admin notification email sent successfully');
      }
    } catch (emailError) {
      console.error('Error sending admin email:', emailError);
    }

    // Send confirmation email to user
    try {
      console.log('Attempting to send user confirmation email...');
      const userEmailResult = await sendContactConfirmationEmail({ name, email });

      if (!userEmailResult.success) {
        console.error('Failed to send user confirmation:', userEmailResult.error);
      } else {
        console.log('User confirmation email sent successfully');
      }
    } catch (emailError) {
      console.error('Error sending user email:', emailError);
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      id: savedContact?.id
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error processing your request'
    });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
});

// Handle graceful shutdown (retained from original code)
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Shutting down gracefully.');
  if (server) {
    server.close(() => {
      console.log('Server closed');
    });
  }
});

export default app;