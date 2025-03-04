import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid API initialized with key');
} else {
  console.warn('SENDGRID_API_KEY environment variable not found');
}

/**
 * Test if the SendGrid API key is properly configured
 */
export async function testSendGridApiKey() {
  if (!process.env.SENDGRID_API_KEY) {
    return { 
      success: false, 
      message: 'SENDGRID_API_KEY environment variable not found' 
    };
  }

  // Basic validation of API key format
  if (!process.env.SENDGRID_API_KEY.startsWith('SG.')) {
    return { 
      success: false, 
      message: 'SENDGRID_API_KEY does not have the expected format (should start with SG.)' 
    };
  }

  console.log('SendGrid API key found with prefix:', process.env.SENDGRID_API_KEY.substring(0, 5) + '...');
  console.log('SendGrid API key length:', process.env.SENDGRID_API_KEY.length);

  return { 
    success: true, 
    message: 'SendGrid API key found and appears to be valid' 
  };
}

/**
 * Send contact form email
 */
export async function sendContactFormEmail({ name, email, company, message }) {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('Cannot send email: SENDGRID_API_KEY environment variable not found');
      return { 
        success: false, 
        error: 'Email service not configured' 
      };
    }

    // Get recipient email from environment variable or use default
    const toEmail = process.env.CONTACT_EMAIL || 'info@anchoredup.org';

    // Format the email
    const emailData = {
      to: toEmail,
      from: process.env.FROM_EMAIL || 'noreply@anchoredup.org', // This must be a verified sender in SendGrid
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #005A84;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Company:</strong> ${company || 'Not provided'}</p>
  <div style="margin-top: 20px;">
    <h3 style="color: #005A84;">Message:</h3>
    <p style="white-space: pre-wrap;">${message}</p>
  </div>
</div>
      `
    };

    console.log('Sending email with data:', {
      to: emailData.to,
      from: emailData.from,
      subject: emailData.subject
    });

    // Send the email
    const response = await sgMail.send(emailData);
    console.log('SendGrid response:', response);

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);

    // Check if it's a SendGrid API error with response
    if (error.response && error.response.body) {
      console.error('SendGrid API error response:', error.response.body);
      return { 
        success: false, 
        error: `SendGrid API error: ${error.code || error.message}`, 
        details: error.response.body 
      };
    }

    return { 
      success: false, 
      error: error.message || 'Unknown error sending email' 
    };
  }
}