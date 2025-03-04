
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());

// Set port
const PORT = process.env.PORT || 3001;

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }
    
    // Check if SendGrid API key is configured
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY is not configured');
      return res.status(500).json({ 
        success: false, 
        error: 'Email service is not configured' 
      });
    }
    
    // Prepare email content
    const emailContent = {
      to: 'contact@anchoredup.org', // Change this to your actual email
      from: 'noreply@anchoredup.org', // This should be a verified sender in SendGrid
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
Message: ${message}
      `,
      html: `
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
<p><strong>Message:</strong> ${message}</p>
      `
    };

    // Send email
    const response = await sgMail.send(emailContent);
    console.log('SendGrid API response:', response[0].statusCode);
    
    // Store in database (you can implement this later if needed)
    // For now, just log the submission
    console.log('Contact form submission:', { name, email, company, message });
    
    // Return success
    res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully' 
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // Provide detailed error for debugging
    let errorMessage = 'Error processing your request';
    if (error.response && error.response.body) {
      console.error('SendGrid API error:', error.response.body);
      errorMessage = `SendGrid error: ${error.response.body.errors?.[0]?.message || 'Unknown SendGrid error'}`;
    }
    
    res.status(500).json({ 
      success: false, 
      error: errorMessage 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});

module.exports = app;
