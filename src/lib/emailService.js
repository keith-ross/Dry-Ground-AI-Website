/**
 * Email service for contact form
 */

import sgMail from '@sendgrid/mail';

// Email service using SendGrid
/**
 * Send a contact form email
 * @param {Object} data - Contact form data
 * @returns {Promise<Object>} - Response object
 */
export async function sendContactEmail(data) {
  try {
    // Get SendGrid API key from environment
    const apiKey = process.env.SENDGRID_API_KEY;

    if (!apiKey) {
      console.error('SENDGRID_API_KEY is not configured');
      return { success: false, message: 'Email service is not configured properly' };
    }

    // Configure SendGrid
    sgMail.setApiKey(apiKey);

    // Validate required fields
    if (!data.email || !data.name || !data.message) {
      return { success: false, message: 'Required fields missing' };
    }

    // Format email
    const msg = {
      to: process.env.TO_EMAIL || 'keith.ross@anchoredup.org', // Default recipient
      from: process.env.FROM_EMAIL || 'contact@anchoredup.org', // Default sender
      subject: `Contact form submission from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ''}

Message:
${data.message}
      `,
      html: `
<h3>New Contact Form Submission</h3>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
<p><strong>Message:</strong></p>
<p>${data.message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Log debug info
    console.log('Sending email with data:', {
      to: msg.to,
      from: msg.from,
      subject: msg.subject,
      name: data.name,
      email: data.email
    });

    // Send the email
    await sgMail.send(msg);

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    // Return structured error for easier debugging
    return { 
      success: false, 
      message: 'Failed to send email',
      error: error.message || 'Unknown error',
      code: error.code || 'UNKNOWN_ERROR'
    };
  }
}

/**
 * Tests if the SendGrid API is configured and working
 * @returns {Promise<Object>} Result of the test
 */
export async function testSendGridApiKey() {
  try {
    const response = await fetch('/api/health');
    if (!response.ok) {
      return { 
        success: false, 
        error: `API server returned ${response.status}` 
      };
    }
    
    const data = await response.json();
    
    if (!data.sendgridConfigured) {
      return { 
        success: false, 
        error: 'SendGrid API key is not configured on the server' 
      };
    }
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Failed to connect to API server'
    };
  }
}

/**
 * Send contact form data to the API
 * @param {Object} formData The form data to send
 * @returns {Promise<Object>} Result of the API call
 */
export async function submitContactForm(formData) {
  try {
    console.log('Submitting form data:', formData);
    
    // Determine the API URL based on the current environment
    // Get the current URL from the window location
    const currentUrl = window.location.href;
    const currentDomain = window.location.hostname;
    
    // Determine the base URL for the API
    let apiBase;
    if (currentDomain.includes('replit.dev')) {
      // If running on Replit, use the same domain but different port
      apiBase = `${window.location.protocol}//${currentDomain}`;
    } else {
      apiBase = ''; // Use relative URL for production
    }
    
    // Build the full API URL
    const apiUrl = `${apiBase}/api/contact`;
    
    console.log('Using API URL:', apiUrl);
    
    // Send the request to the API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    console.log('API response status:', response.status);
    console.log('API response headers:', response.headers);
    
    // Get the raw response text
    const responseText = await response.text();
    console.log('Raw API response:', responseText);
    
    // Try to parse the response as JSON
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed API response:', data);
    } catch (e) {
      console.error('Failed to parse API response as JSON:', e);
      return {
        success: false,
        error: 'Invalid response from server'
      };
    }
    
    // Check if the request was successful
    if (!response.ok) {
      return {
        success: false,
        error: data?.error || `Server returned error: ${response.status}`
      };
    }
    
    // Return the result
    return {
      success: data?.success === true,
      message: data?.message || 'Message sent successfully',
      error: data?.error || null
    };
  } catch (error) {
    console.error('Contact form API error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send message'
    };
  }
}

/**
 * Send confirmation email to contact form submitter
 * @param {Object} options - Email options
 * @param {string} options.name - Recipient name
 * @param {string} options.email - Recipient email
 * @returns {Promise} - SendGrid response
 */
export async function sendContactConfirmationEmail({ name, email }) {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured. Cannot send confirmation email.');
    throw new Error('Email service not configured');
  }

  try {
    const msg = {
      to: email,
      from: 'contact@anchoredup.org', // Replace with your verified sender
      subject: 'Thank you for contacting Anchored Up',
      text: `Hello ${name},\n\nThank you for contacting Anchored Up. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nThe Anchored Up Team`,
      html: `<p>Hello ${name},</p><p>Thank you for contacting Anchored Up. We have received your message and will get back to you as soon as possible.</p><p>Best regards,<br>The Anchored Up Team</p>`,
    };

    console.log('Sending confirmation email to:', email);
    const response = await sgMail.send(msg);
    console.log('Confirmation email sent successfully');
    return response;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    if (error.response) {
      console.error('SendGrid API error:', error.response.body);
    }
    throw error;
  }
}

/**
 * Send notification email to admin
 * @param {Object} submission - Contact form submission
 * @param {string} submission.name - Submitter name
 * @param {string} submission.email - Submitter email
 * @param {string} submission.company - Submitter company
 * @param {string} submission.message - Message content
 * @returns {Promise} - SendGrid response
 */
export async function sendAdminNotificationEmail(submission) {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured. Cannot send admin notification.');
    throw new Error('Email service not configured');
  }

  try {
    const { name, email, company, message } = submission;

    const msg = {
      to: 'admin@anchoredup.org', // Replace with admin email
      from: 'contact@anchoredup.org', // Replace with your verified sender
      subject: 'New Contact Form Submission',
      text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    console.log('Sending admin notification email');
    const response = await sgMail.send(msg);
    console.log('Admin notification email sent successfully');
    return response;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    if (error.response) {
      console.error('SendGrid API error:', error.response.body);
    }
    throw error;
  }
}