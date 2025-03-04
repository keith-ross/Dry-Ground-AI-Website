// SendGrid email service for contact form
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
const apiKey = process.env.SENDGRID_API_KEY;
if (apiKey) {
  sgMail.setApiKey(apiKey);
} else {
  console.error('SENDGRID_API_KEY is not set. Email sending will not work.');
}

/**
 * Send contact form email via SendGrid
 * @param {Object} contactData - Contact form data
 * @param {string} contactData.name - Name of the person sending the message
 * @param {string} contactData.email - Email of the person sending the message
 * @param {string} contactData.company - Company of the person sending the message
 * @param {string} contactData.message - Message content
 * @returns {Promise} - SendGrid response
 */
async function sendContactEmail(contactData) {
  const { name, email, company, message } = contactData;

  if (!process.env.FROM_EMAIL || !process.env.ADMIN_EMAIL) {
    console.error('FROM_EMAIL or ADMIN_EMAIL not set. Cannot send email.');
    throw new Error('Email configuration incomplete. Contact administrator.');
  }

  // Create email
  const msg = {
    to: process.env.ADMIN_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: `Website Contact Form: ${name} from ${company}`,
    text: `
Name: ${name}
Email: ${email}
Company: ${company}
Message:
${message}
    `,
    html: `
<h3>Website Contact Form Submission</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    // Log what we're about to do
    console.log(`Sending email to ${process.env.ADMIN_EMAIL} from ${process.env.FROM_EMAIL}`);

    // Send email
    const response = await sgMail.send(msg);
    console.log('Email sent successfully');
    return response;
  } catch (error) {
    console.error('Error sending email:', error);

    // Provide more detailed error info
    if (error.response) {
      console.error('SendGrid API response error:', error.response.body);
    }

    throw error;
  }
}

module.exports = {
  sendContactEmail
};