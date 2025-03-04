import express from 'express';
import cors from 'cors';
import { initDb, saveContactSubmission } from '../lib/db';
import { sendConfirmationEmail } from '../lib/emailService';

const app = express();
const PORT = 3001;

// Initialize the database
initDb().catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

// Middleware
app.use(cors());
app.use(express.json());

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    // Save to database
    await saveContactSubmission({ name, email, company, message });

    // Send confirmation email
    try {
      await sendConfirmationEmail(email, name);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // We'll continue even if email fails
    }

    res.status(200).json({ success: true, message: 'Contact form submission successful' });
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    res.status(500).json({ success: false, message: 'An error occurred processing your request' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running on port ${PORT}`);
});