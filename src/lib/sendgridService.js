
// sendgridService.js - A simplified email service using SendGrid
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send a contact form email
 * @param {Object} data Form data (name, email, company, message)
 * @returns {Promise} SendGrid API response
 */
async function sendContactFormEmail(data) {
  try {
    const { name, email, company, message } = data;
    
    if (!name || !email || !message) {
      throw new Error('Missing required fields: name, email, and message are required');
    }
    
    // Email to admin
    const adminEmail = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.FROM_EMAIL || 'noreply@dryground.ai',
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
      `
    };
    
    // Email to user
    const userEmail = {
      to: email,
      from: process.env.FROM_EMAIL || 'noreply@dryground.ai',
      subject: 'Thank you for contacting Dry Ground AI',
      text: `
Hello ${name},

Thank you for contacting Dry Ground AI. We have received your message and will get back to you soon.

Best regards,
The Dry Ground AI Team
      `,
      html: `
<h3>Thank you for contacting Dry Ground AI</h3>
<p>Hello ${name},</p>
<p>Thank you for contacting Dry Ground AI. We have received your message and will get back to you soon.</p>
<p>Best regards,<br>The Dry Ground AI Team</p>
      `
    };
    
    // Send emails
    console.log('Sending admin notification email...');
    const adminResponse = await sgMail.send(adminEmail);
    
    console.log('Sending user confirmation email...');
    const userResponse = await sgMail.send(userEmail);
    
    return {
      success: true,
      adminResponse,
      userResponse
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error.message || 'Unknown error sending email'
    };
  }
}

module.exports = {
  sendContactFormEmail
};
