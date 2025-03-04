
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Function to test if SendGrid API key is properly configured
async function testSendGridApiKey() {
  if (!process.env.SENDGRID_API_KEY) {
    return { 
      success: false, 
      error: 'SendGrid API key is not configured'
    };
  }

  // Simple validation of API key format
  if (!process.env.SENDGRID_API_KEY.startsWith('SG.')) {
    return { 
      success: false, 
      error: 'SendGrid API key has invalid format (should start with SG.)'
    };
  }

  console.log('SendGrid API key found with prefix:', process.env.SENDGRID_API_KEY.substring(0, 5) + '..');
  console.log('SendGrid API key length:', process.env.SENDGRID_API_KEY.length);
  
  // Can't do a real test without sending an email, so just check format
  return { 
    success: true, 
    message: 'SendGrid API key is properly configured'
  };
}

// Send email from contact form
async function sendContactFormEmail({ name, email, company, message }) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not found in environment variables');
      return { 
        success: false, 
        error: 'Email service is not configured'
      };
    }

    // Prepare the email using SendGrid dynamic templates
    const msg = {
      to: 'admin@anchoredup.org', // Replace with your email
      from: 'notifications@anchoredup.org', // Replace with your verified sender
      subject: 'New Website Contact Form Submission',
      text: `
New contact form submission from ${name} (${email})
${company ? `Company: ${company}` : 'No company specified'}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
  <h3 style="margin-top: 20px;">Message:</h3>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${message.replace(/\n/g, '<br>')}
  </div>
</div>
      `
    };

    console.log('Sending email with SendGrid...');
    const response = await sgMail.send(msg);
    console.log('SendGrid response:', response[0]?.statusCode);
    
    if (response[0]?.statusCode >= 200 && response[0]?.statusCode < 300) {
      return { success: true };
    } else {
      return { 
        success: false, 
        error: `SendGrid returned status code ${response[0]?.statusCode}`
      };
    }
  } catch (error) {
    console.error('Error sending email with SendGrid:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown error sending email'
    };
  }
}

// Send admin notification
async function sendAdminNotificationEmail({ name, email, company, message }) {
  // This is currently the same as sendContactFormEmail
  // Can be customized later for different admin notification format
  return sendContactFormEmail({ name, email, company, message });
}

// Send confirmation email to user
async function sendContactConfirmationEmail({ name, email }) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key not found in environment variables');
      return { 
        success: false, 
        error: 'Email service is not configured'
      };
    }

    // Prepare confirmation email to the user
    const msg = {
      to: email,
      from: 'notifications@anchoredup.org', // Replace with your verified sender
      subject: 'We received your message',
      text: `
Dear ${name},

Thank you for contacting Anchored Up. We've received your message and will get back to you as soon as possible.

Best regards,
The Anchored Up Team
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">Thank You for Contacting Us</h2>
  <p>Dear ${name},</p>
  <p>Thank you for reaching out to Anchored Up. We've received your message and will get back to you as soon as possible.</p>
  <p>Best regards,<br>The Anchored Up Team</p>
</div>
      `
    };

    console.log('Sending confirmation email to user...');
    const response = await sgMail.send(msg);
    
    if (response[0]?.statusCode >= 200 && response[0]?.statusCode < 300) {
      return { success: true };
    } else {
      return { 
        success: false, 
        error: `SendGrid returned status code ${response[0]?.statusCode}`
      };
    }
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown error sending confirmation email'
    };
  }
}

module.exports = {
  testSendGridApiKey,
  sendContactFormEmail,
  sendAdminNotificationEmail,
  sendContactConfirmationEmail
};
