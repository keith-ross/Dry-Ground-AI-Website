
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure SendGrid if API key is available
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@example.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  // Check if SendGrid is configured properly
  const emailServiceStatus = {
    success: !!SENDGRID_API_KEY,
    apiKeyExists: !!SENDGRID_API_KEY,
    fromEmail: FROM_EMAIL || 'Not configured',
    adminEmail: ADMIN_EMAIL || 'Not configured'
  };

  res.json({
    status: 'ok',
    time: new Date().toISOString(),
    emailService: emailServiceStatus
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
        error: 'Name, email, and message are required'
      });
    }

    // Check if SendGrid is configured
    if (!SENDGRID_API_KEY) {
      console.error('SendGrid API key is not configured');
      return res.status(500).json({
        success: false,
        error: 'Email service is not configured'
      });
    }

    // Prepare email
    const msg = {
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: `Contact Form: ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}
      `,
      html: `
<h3>Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await sgMail.send(msg);
    
    console.log('Email sent successfully');
    return res.json({
      success: true,
      message: 'Your message has been sent successfully!'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      error: error.response?.body?.errors?.[0]?.message || error.message || 'Failed to send email'
    });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});

export default app;
