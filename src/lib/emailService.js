// src/lib/emailService.js
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize SendGrid with API key
const apiKey = process.env.SENDGRID_API_KEY;
if (apiKey) {
  sgMail.setApiKey(apiKey);
}

/**
 * Handles a contact form submission by sending an email
 * @param {Object} formData - The contact form data
 * @param {string} formData.name - The name of the person submitting the form
 * @param {string} formData.email - The email of the person submitting the form
 * @param {string} formData.company - The company of the person submitting the form (optional)
 * @param {string} formData.message - The message content
 * @returns {Promise<Object>} - Result of the email sending operation
 */
export async function handleContactForm(formData) {
  console.log('Processing contact form data:', formData);

  const { name, email, company = '', message } = formData;

  // Validate environment variables
  const fromEmail = process.env.FROM_EMAIL;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!apiKey) {
    console.error('SendGrid API key is missing');
    return { success: false, error: 'Email service not properly configured (API key missing)' };
  }

  if (!fromEmail || !adminEmail) {
    console.error('Email configuration is incomplete', { fromEmail, adminEmail });
    return { success: false, error: 'Email service not properly configured (email addresses missing)' };
  }

  try {
    // Construct the email
    const emailContent = {
      to: adminEmail,
      from: fromEmail,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
${company ? `Company: ${company}\n` : ''}
Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Send the email
    console.log('Sending email with content:', emailContent);
    const response = await sgMail.send(emailContent);

    console.log('Email sent successfully:', response);
    return { 
      success: true,
      message: 'Email sent successfully'
    };
  } catch (error) {
    console.error('Error sending email:', error);

    // Detailed error information for debugging
    const errorDetails = error.response ? {
      body: error.response.body,
      statusCode: error.code || error.response.statusCode
    } : {
      message: error.message
    };

    console.error('Error details:', errorDetails);

    return { 
      success: false, 
      error: `Failed to send email: ${error.message}`, 
      details: errorDetails
    };
  }
}