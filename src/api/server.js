import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sgMail from '@sendgrid/mail';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
app.use(cors());
app.use(express.json());

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);

  const { name, email, company, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please provide name, email, and message'
    });
  }

  try {
    // Check if SendGrid API key is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured');
      return res.status(500).json({
        success: false,
        error: 'Email service not configured'
      });
    }

    // Prepare admin notification email
    const adminMsg = {
      to: process.env.ADMIN_EMAIL || 'admin@example.com',
      from: process.env.FROM_EMAIL || 'noreply@example.com',
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Company: ${company || 'N/A'}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    // Send email
    console.log('Sending admin notification email...');
    await sgMail.send(adminMsg);

    // Optional: Send confirmation email to the user
    const userMsg = {
      to: email,
      from: process.env.FROM_EMAIL || 'noreply@example.com',
      subject: 'Thank you for contacting us',
      text: `
        Hi ${name},

        Thank you for your message. We've received your inquiry and will get back to you as soon as possible.

        Regards,
        Dry Ground AI Team
      `,
      html: `
        <h2>Thank you for your message</h2>
        <p>Hi ${name},</p>
        <p>Thank you for your message. We've received your inquiry and will get back to you as soon as possible.</p>
        <p>Regards,<br>Dry Ground AI Team</p>
      `
    };

    // Send confirmation email
    console.log('Sending user confirmation email...');
    await sgMail.send(userMsg);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send message'
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

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on http://0.0.0.0:${PORT}`);
});