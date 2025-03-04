
// Email service using SendGrid
import sgMail from '@sendgrid/mail';

// Configure SendGrid if API key is available
const apiKey = import.meta.env.VITE_SENDGRID_API_KEY || process.env.SENDGRID_API_KEY;
const fromEmail = import.meta.env.VITE_FROM_EMAIL || process.env.FROM_EMAIL || 'noreply@example.com';
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'admin@example.com';

if (apiKey) {
  sgMail.setApiKey(apiKey);
}

/**
 * Sends email notification for contact form submissions
 */
export const sendContactEmail = async (formData) => {
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

// Export check functions for diagnostics
export const checkEmailConfig = () => {
  return {
    apiKeyExists: !!apiKey,
    fromEmail,
    adminEmail
  };
};
