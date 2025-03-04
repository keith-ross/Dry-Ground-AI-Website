import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// CORS middleware with specific configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if(!origin) return callback(null, true);

    // Allow all Replit domains and localhost
    if(
      origin.endsWith('.replit.dev') || 
      origin.endsWith('.replit.app') || 
      origin.endsWith('.repl.co') || 
      origin.includes('localhost')
    ) {
      return callback(null, true);
    }

    callback(null, true); // Allow all origins for now
  },
  credentials: true
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
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
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
        error: 'Missing required fields: name, email, and message are required'
      });
    }

    // Save to database
    const savedContact = saveContact({ name, email, company, message });
    console.log('Contact saved:', savedContact);

    // Send email (if SendGrid is configured)
    if (process.env.SENDGRID_API_KEY) {
      try {
        // Email to admin
        const adminMsg = {
          to: process.env.ADMIN_EMAIL || 'admin@example.com',
          from: process.env.FROM_EMAIL || 'noreply@example.com',
          subject: 'New Contact Form Submission',
          text: `
            New contact form submission:

            Name: ${name}
            Email: ${email}
            Company: ${company || 'Not provided'}
            Message: ${message}
          `,
          html: `
            <h2>New contact form submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Message:</strong> ${message}</p>
          `
        };

        // Email to user
        const userMsg = {
          to: email,
          from: process.env.FROM_EMAIL || 'noreply@example.com',
          subject: 'Thank you for contacting us',
          text: `
            Dear ${name},

            Thank you for contacting us. We have received your message and will get back to you shortly.

            Best regards,
            The Team
          `,
          html: `
            <p>Dear ${name},</p>
            <p>Thank you for contacting us. We have received your message and will get back to you shortly.</p>
            <p>Best regards,<br>The Team</p>
          `
        };

        await sgMail.send(adminMsg);
        await sgMail.send(userMsg);
        console.log('Emails sent successfully');
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // We still return success since the contact was saved
      }
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      id: savedContact.id
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
let server;
try {
  server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
} catch (error) {
  console.error('Failed to start server:', error);
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Shutting down gracefully.');
  if (server) {
    server.close(() => {
      console.log('Server closed');
    });
  }
});

export default app;