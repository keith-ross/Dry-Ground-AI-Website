import express from 'express';
import cors from 'cors';
import { sendAdminNotificationEmail, sendContactConfirmationEmail } from '../lib/emailService.js';
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

// Simple database using JSON file
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

// Save contact submission to database
const saveContactSubmission = (contact) => {
  try {
    const contacts = getContacts();
    contact.id = Date.now().toString();
    contact.createdAt = new Date().toISOString();
    contacts.push(contact);
    fs.writeFileSync(dbPath, JSON.stringify(contacts, null, 2));
    return contact;
  } catch (error) {
    console.error('Error saving contact:', error);
    throw error;
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    sendgridConfigured: !!process.env.SENDGRID_API_KEY
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email and message are required' 
      });
    }

    // Save to database
    const savedContact = saveContactSubmission({ name, email, company, message });

    // Send emails if SendGrid is configured
    let emailResults = { adminEmail: null, confirmationEmail: null };

    if (process.env.SENDGRID_API_KEY) {
      // Send notification to admin
      emailResults.adminEmail = await sendAdminNotificationEmail({ 
        name, email, company, message 
      });

      // Send confirmation to user
      emailResults.confirmationEmail = await sendContactConfirmationEmail({ 
        name, email 
      });
    }

    res.json({
      success: true,
      contact: savedContact,
      emailsSent: !!process.env.SENDGRID_API_KEY,
      emailResults
    });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'An error occurred while processing your request' 
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