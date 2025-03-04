import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (SENDGRID_API_KEY) {
  try {
    sgMail.setApiKey(SENDGRID_API_KEY);
    console.log('SendGrid API key configured successfully');
  } catch (error) {
    console.error('Error initializing SendGrid:', error.message);
  }
} else {
  console.error('\x1b[31mSENDGRID_API_KEY not found in environment variables\x1b[0m');
}

/**
 * Send a confirmation email to the contact form submitter
 */
export async function sendContactConfirmationEmail({ name, email }) {
  if (!SENDGRID_API_KEY) {
    console.error('\x1b[31mCannot send email: SendGrid API key not configured\x1b[0m');
    return { 
      success: false, 
      error: 'Email service not configured properly' 
    };
  }

  try {
    const msg = {
      to: email,
      from: process.env.ADMIN_EMAIL || 'info@dryground.ai',
      subject: 'Thank you for contacting us',
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nDry Ground AI Team`,
      html: `<p>Hello ${name},</p>
             <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
             <p>Best regards,<br>Dry Ground AI Team</p>`
    };

    console.log(`Sending confirmation email to ${email}`);
    const [response] = await sgMail.send(msg);

    if (response && response.statusCode >= 200 && response.statusCode < 300) {
      console.log(`✅ Confirmation email sent successfully (${response.statusCode})`);
      return { success: true };
    } else {
      console.error(`❌ Failed to send confirmation email: Status code ${response?.statusCode || 'unknown'}`);
      return { 
        success: false, 
        error: `SendGrid returned status code: ${response?.statusCode || 'unknown'}`
      };
    }
  } catch (error) {
    console.error('\x1b[31mError sending confirmation email:\x1b[0m', error);

    // Extract useful information from the error
    const errorDetails = {
      message: error.message,
      code: error.code,
      response: error.response?.body || null
    };

    return { 
      success: false, 
      error: JSON.stringify(errorDetails) || 'Failed to send confirmation email' 
    };
  }
}

/**
 * Send a notification email to the admin
 */
export async function sendAdminNotificationEmail({ name, email, company, message }) {
  if (!SENDGRID_API_KEY) {
    console.error('\x1b[31mCannot send email: SendGrid API key not configured\x1b[0m');
    return { 
      success: false, 
      error: 'Email service not configured properly' 
    };
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'info@dryground.ai';

  try {
    const msg = {
      to: adminEmail,
      from: adminEmail, // Must be the same as verified sender
      subject: 'New Contact Form Submission',
      text: `
        New contact form submission:

        Name: ${name}
        Email: ${email}
        Company: ${company || 'N/A'}

        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    console.log(`Sending admin notification to ${adminEmail}`);
    const [response] = await sgMail.send(msg);

    if (response && response.statusCode >= 200 && response.statusCode < 300) {
      console.log(`✅ Admin notification sent successfully (${response.statusCode})`);
      return { success: true };
    } else {
      console.error(`❌ Failed to send admin notification: Status code ${response?.statusCode || 'unknown'}`);
      return { 
        success: false, 
        error: `SendGrid returned status code: ${response?.statusCode || 'unknown'}`
      };
    }
  } catch (error) {
    console.error('\x1b[31mError sending admin notification:\x1b[0m', error);
    if (error.response) {
      console.error('SendGrid API response error:', error.response.body);
    }
    // Extract useful information from the error
    const errorDetails = {
      message: error.message,
      code: error.code,
      response: error.response?.body || null
    };

    return { 
      success: false, 
      error: JSON.stringify(errorDetails) || 'Failed to send admin notification' 
    };
  }
}

// Export a function to test the SendGrid API key configuration
export async function testSendGridApiKey() {
  if (!SENDGRID_API_KEY) {
    return { 
      success: false, 
      error: 'SENDGRID_API_KEY not found in environment variables' 
    };
  }

  try {
    // Just check if the key is properly formatted
    const apiKeyLength = process.env.SENDGRID_API_KEY.length;
    const apiKeyPrefix = process.env.SENDGRID_API_KEY.substring(0, 3);

    return { 
      success: true, 
      message: 'SendGrid API key is configured', 
      keyLength: apiKeyLength,
      keyPrefix: apiKeyPrefix
    };
  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    };
  }
}