// Email service using SendGrid (server-side)
// Client-side uses a separate file for API communication

import sgMail from '@sendgrid/mail';

// Configure SendGrid - server-side configuration
const apiKey = process.env.SENDGRID_API_KEY; // Use process.env for server-side
const fromEmail = process.env.FROM_EMAIL || 'noreply@example.com';
const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

if (apiKey) {
  sgMail.setApiKey(apiKey);
}

/**
 * Sends email notification for contact form submissions (server-side)
 */
export const sendContactEmailServer = async (formData) => { //Renamed for clarity
  if (!apiKey) {
    console.warn('SendGrid API key not configured - email sending disabled');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const msg = {
      to: adminEmail,
      from: fromEmail,
      subject: `New Contact Form Submission from ${formData.name}`,
      text: `
Name: ${formData.name}
Email: ${formData.email}
${formData.company ? `Company: ${formData.company}` : ''}
Message: ${formData.message}
      `,
      html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${formData.name}</p>
<p><strong>Email:</strong> ${formData.email}</p>
${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
<p><strong>Message:</strong></p>
<p>${formData.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: 'Failed to send email notification',
      details: error.message || 'Unknown error'
    };
  }
};


// Client-side email service
// This file handles the client-side contact form submission
// by sending requests to our API server instead of directly using SendGrid

/**
 * Sends contact form data to our API server
 */
export const sendContactEmailClient = async (formData) => {
  try {
    // Send the form data to our API endpoint
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send message');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending contact form:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send message'
    };
  }
};

// Export check functions for diagnostics
export const checkEmailConfig = () => {
  // Server-side check
  const serverConfig = {
    apiKeyExists: !!apiKey,
    fromEmail,
    adminEmail
  };
  // Client-side can't check email config directly.  Return a merged object for consistency.
  return { ...serverConfig, clientSide: "Uses API call" };
};