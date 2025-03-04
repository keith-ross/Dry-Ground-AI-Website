
import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
let apiKeyInitialized = false;

const initSendGrid = () => {
  try {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      console.warn('SendGrid API key not found in environment variables');
      return false;
    }
    
    sgMail.setApiKey(apiKey);
    apiKeyInitialized = true;
    return true;
  } catch (error) {
    console.error('Error initializing SendGrid:', error);
    return false;
  }
};

export const sendConfirmationEmail = async (email, name) => {
  if (!apiKeyInitialized && !initSendGrid()) {
    throw new Error('SendGrid API not initialized');
  }
  
  const msg = {
    to: email,
    from: 'noreply@drygroundai.com', // Replace with your verified sender
    subject: 'Thank you for contacting Dry Ground AI',
    text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Dry Ground AI Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank you for contacting us!</h2>
        <p>Hello ${name},</p>
        <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
        <p>Best regards,<br>The Dry Ground AI Team</p>
      </div>
    `,
  };
  
  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    if (error.response) {
      console.error('SendGrid error response:', error.response.body);
    }
    throw error;
  }
};
