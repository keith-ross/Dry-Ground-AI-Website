
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Load environment variables
const envPath = path.join(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  console.log(`Loading environment variables from ${envPath}`);
  dotenv.config({ path: envPath });
} else {
  console.log('No .env file found, using environment variables from Replit Secrets');
  dotenv.config();
}

// Set up SendGrid API key
const apiKey = process.env.SENDGRID_API_KEY;
if (apiKey) {
  sgMail.setApiKey(apiKey);
  console.log('SendGrid API key configured successfully');
} else {
  console.error('SENDGRID_API_KEY is not set in environment variables');
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    sendgrid: !!apiKey
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  
  try {
    // Validate request body
    const { name, email, company, message } = req.body;
    
    if (!name || !email || !message) {
      console.log('Missing required fields in request');
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }
    
    if (!apiKey) {
      console.error('Cannot send email: SendGrid API key not configured');
      return res.status(500).json({ 
        success: false, 
        error: 'Email service not configured' 
      });
    }
    
    // Prepare email data
    const toEmail = process.env.TO_EMAIL || 'contact@example.com';
    const fromEmail = process.env.FROM_EMAIL || 'noreply@example.com';
    
    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Message: ${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };
    
    // Send email
    console.log('Sending email to:', toEmail);
    await sgMail.send(msg);
    
    console.log('Email sent successfully');
    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Handle SendGrid specific errors
    if (error.response) {
      console.error('SendGrid API error details:', error.response.body);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send email',
        details: error.response.body
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'An unknown error occurred' 
    });
  }
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

// Start server if directly executed
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API server running on port ${PORT}`);
    console.log(`Health check available at: http://0.0.0.0:${PORT}/api/health`);
  });
}

// Export for imports in other files
module.exports = app;
