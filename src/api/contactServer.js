
// Server-side contact form API
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

// Load environment variables
dotenv.config();

// Configure SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@example.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

// Initialize SendGrid if API key is available
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  const emailConfigured = !!SENDGRID_API_KEY;
  
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    emailService: {
      success: emailConfigured,
      apiKeyExists: !!SENDGRID_API_KEY,
      fromEmail: FROM_EMAIL,
      adminEmail: ADMIN_EMAIL
    }
  });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, company, message } = req.body;
  
  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
    });
  }
  
  // Check if SendGrid is configured
  if (!SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured - email sending disabled');
    return res.status(500).json({ 
      success: false, 
      error: 'Email service not configured' 
    });
  }
  
  try {
    const msg = {
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
Message: ${message}
      `,
      html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await sgMail.send(msg);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      details: error.message || 'Unknown error'
    });
  }
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Contact API server running on port ${PORT}`);
});

export default server;
