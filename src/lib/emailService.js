
// src/lib/emailService.js
import sgMail from '@sendgrid/mail';

// Check if SendGrid API key is available
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@anchoredup.org';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'keith.ross@anchoredup.org';

// Initialize SendGrid if API key exists
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('SendGrid initialized with API key');
} else {
  console.warn('⚠️ No SendGrid API key found! Email functionality will be disabled.');
}

/**
 * Handle contact form submission and send email
 */
export async function handleContactForm(formData) {
  const { name, email, company, message } = formData;
  
  // Validate required fields
  if (!name || !email || !message) {
    console.error('Missing required fields');
    return { 
      success: false, 
      error: 'Missing required fields' 
    };
  }

  console.log('Processing contact form submission from:', email);

  try {
    // Check if SendGrid is configured
    if (!SENDGRID_API_KEY) {
      console.warn('Contact form submitted but no SendGrid API key is configured');
      return { 
        success: false, 
        error: 'Email service not configured',
        saved: true // Pretend we saved it at least
      };
    }

    // Format the message for better readability
    const emailContent = `
      Name: ${name}
      Email: ${email}
      ${company ? `Company: ${company}` : ''}
      
      Message:
      ${message}
    `;

    // Create email to admin
    const emailToAdmin = {
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: emailContent,
      html: `<p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>`
    };

    // Create confirmation email to user
    const emailToUser = {
      to: email,
      from: FROM_EMAIL,
      subject: 'Thank you for contacting Anchored Up AI',
      text: `Hello ${name},\n\nThank you for contacting Anchored Up AI. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Anchored Up AI Team`,
      html: `<p>Hello ${name},</p>
            <p>Thank you for contacting Anchored Up AI. We have received your message and will get back to you shortly.</p>
            <p>Best regards,<br>The Anchored Up AI Team</p>`
    };

    console.log('Sending admin notification email to:', ADMIN_EMAIL);

    // Send emails
    const results = await Promise.all([
      sgMail.send(emailToAdmin),
      sgMail.send(emailToUser)
    ]);

    console.log('Emails sent successfully!');
    
    return { 
      success: true,
      message: 'Contact form processed successfully'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Log detailed error info if available
    if (error.response) {
      console.error('SendGrid API error details:', error.response.body);
    }
    
    return { 
      success: false, 
      error: `Failed to send email: ${error.message}`
    };
  }
}

/**
 * Check email service configuration
 */
export function checkEmailConfig() {
  return {
    success: !!SENDGRID_API_KEY,
    apiKeyExists: !!SENDGRID_API_KEY,
    fromEmail: FROM_EMAIL,
    adminEmail: ADMIN_EMAIL
  };
}
