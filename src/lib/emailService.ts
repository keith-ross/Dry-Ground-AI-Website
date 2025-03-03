
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

// Function to send emails using SendGrid
export const sendEmail = async (
  to: string, 
  subject: string, 
  html: string, 
  from = 'noreply@drygroundai.com'
) => {
  try {
    // Get SendGrid API key from environment variables
    const apiKey = process.env.SENDGRID_API_KEY;
    
    if (!apiKey) {
      throw new Error('SendGrid API key is not configured');
    }
    
    // Set SendGrid API key
    sgMail.setApiKey(apiKey);
    
    // Create message
    const msg = {
      to,
      from,
      subject,
      html,
    };
    
    // Send email
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

// Function to send confirmation email to user
export const sendConfirmationEmail = async (name: string, email: string, message: string) => {
  const subject = 'Thank You for Contacting Dry Ground AI';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00A3E0;">Thank You for Contacting Us</h2>
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to Dry Ground AI. We have received your message and our team will review it promptly.</p>
      <p>Here's a copy of your message:</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p>${message}</p>
      </div>
      <p>We'll get back to you as soon as possible.</p>
      <p>Best regards,<br>The Dry Ground AI Team</p>
    </div>
  `;
  
  return await sendEmail(email, subject, html);
};

// Function to send notification email to admin
export const sendAdminNotificationEmail = async (name: string, email: string, message: string) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'info@drygroundai.com';
  const subject = `New Contact Form Submission from ${name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00A3E0;">New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p>${message}</p>
      </div>
      <p>This message was submitted via the Dry Ground AI website contact form.</p>
    </div>
  `;
  
  return await sendEmail(adminEmail, subject, html);
};
