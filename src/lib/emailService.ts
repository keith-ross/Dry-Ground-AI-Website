
import sgMail from '@sendgrid/mail';

// Get the API key from environment variables
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'contact@drygroundai.com';
const TO_EMAIL = process.env.TO_EMAIL || 'notifications@drygroundai.com';

// Initialize SendGrid if API key is provided
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log('SendGrid API initialized');
} else {
  console.warn('SENDGRID_API_KEY not found in environment variables. Email sending will be disabled.');
}

/**
 * Send a confirmation email to the user who submitted the contact form
 */
export async function sendContactConfirmationEmail({ name, email, message }) {
  // If no API key, skip email sending but log it
  if (!SENDGRID_API_KEY) {
    console.log('Email sending skipped (no API key): Would have sent confirmation email to', email);
    return { success: true, message: 'Email sending skipped (no API key)' };
  }

  try {
    // Email to the user
    const userMsg = {
      to: email,
      from: FROM_EMAIL,
      subject: 'Thank you for contacting Dry Ground AI',
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Dry Ground AI Team`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for contacting us</h2>
          <p>Hello ${name},</p>
          <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br/>The Dry Ground AI Team</p>
        </div>
      `
    };

    // Email to the admin
    const adminMsg = {
      to: TO_EMAIL,
      from: FROM_EMAIL,
      subject: 'New Contact Form Submission',
      text: `New contact form submission from ${name} (${email}):\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        </div>
      `
    };

    console.log('Sending confirmation email to', email);
    
    // We'll use Promise.allSettled to send both emails and continue even if one fails
    const results = await Promise.allSettled([
      sgMail.send(userMsg),
      sgMail.send(adminMsg)
    ]);
    
    console.log('Email sending results:', results);

    const allSuccessful = results.every(result => result.status === 'fulfilled');
    return { 
      success: allSuccessful,
      message: allSuccessful ? 'Emails sent successfully' : 'Some emails failed to send'
    };
  } catch (error) {
    console.error('Error sending emails:', error);
    if (error.response) {
      console.error('SendGrid API error details:', error.response.body);
    }
    return { success: false, error };
  }
}
