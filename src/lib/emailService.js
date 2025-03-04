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


// Email service for the contact form
// Client-side uses import.meta.env variables
const clientApiKey = import.meta.env.VITE_SENDGRID_API_KEY;
const clientFromEmail = import.meta.env.VITE_FROM_EMAIL || 'noreply@example.com';
const clientAdminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@example.com';

if (clientApiKey) {
  sgMail.setApiKey(clientApiKey);
}

/**
 * Sends contact form data to our API endpoint
 */
export const sendContactEmail = async (formData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server responded with ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw new Error(error.message || 'Failed to send email. Please try again later.');
  }
};

// Check if email service is properly configured
export const checkEmailConfig = () => {
  return {
    apiKeyExists: Boolean(clientApiKey),
    fromEmail: clientFromEmail,
    adminEmail: clientAdminEmail,
    clientSide: "Uses API call"
  };
};