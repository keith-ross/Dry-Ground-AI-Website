import express from 'express';
import cors from 'cors';
import { addContact } from '../lib/db.js';
import { sendEmail } from '../lib/emailService.js';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: 'Name, email, and message are required' 
    });
  }

  try {
    // Save to database
    await addContact({ name, email, message });

    // Send confirmation email
    await sendEmail({
      to: email,
      subject: 'Thank you for contacting Dry Ground AI',
      text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nDry Ground AI Team`,
      html: `<p>Dear ${name},</p><p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p><p>Best regards,<br>Dry Ground AI Team</p>`
    });

    // Send notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'info@drygroundai.com';
    await sendEmail({
      to: adminEmail,
      subject: 'New Contact Form Submission',
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<h3>New contact form submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to process your request. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`API server listening on port ${port}`);
});

export default app;