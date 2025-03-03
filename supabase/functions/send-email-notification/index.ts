// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// SendGrid API endpoint
const SENDGRID_API_URL = "https://api.sendgrid.com/v3/mail/send";

// Get SendGrid API key from environment variable
const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Check if SendGrid API key is available
    if (!SENDGRID_API_KEY) {
      throw new Error("SendGrid API key is not configured");
    }

    // Get the request body
    const { record } = await req.json();
    
    // Log the received data for debugging
    console.log("Received contact form submission:", record);

    // Prepare email data for customer confirmation
    const customerEmailData = {
      personalizations: [
        {
          to: [{ email: record.email }],
          subject: "Thank you for contacting Dry Ground AI",
        },
      ],
      from: { email: "info@dryground.ai", name: "Dry Ground AI" },
      content: [
        {
          type: "text/html",
          value: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #00A3E0;">Thank You for Contacting Us</h2>
              <p>Hello ${record.name},</p>
              <p>Thank you for reaching out to Dry Ground AI. We have received your message and will get back to you as soon as possible.</p>
              <p>Here's a copy of your message:</p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p>${record.message}</p>
              </div>
              <p>Best regards,</p>
              <p>The Dry Ground AI Team</p>
            </div>
          `,
        },
      ],
    };

    // Prepare email data for notification to admin
    const adminEmailData = {
      personalizations: [
        {
          to: [{ email: "info@dryground.ai" }],
          subject: "New Contact Form Submission - Dry Ground AI",
        },
      ],
      from: { email: "info@dryground.ai", name: "Dry Ground AI Website" },
      content: [
        {
          type: "text/html",
          value: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #00A3E0;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${record.name}</p>
              <p><strong>Email:</strong> ${record.email}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p>${record.message}</p>
              </div>
            </div>
          `,
        },
      ],
    };

    // Send confirmation email to customer
    const customerResponse = await fetch(SENDGRID_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify(customerEmailData),
    });

    if (!customerResponse.ok) {
      const customerError = await customerResponse.text();
      console.error("Error sending customer email:", customerError);
    }

    // Send notification email to admin
    const adminResponse = await fetch(SENDGRID_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify(adminEmailData),
    });

    if (!adminResponse.ok) {
      const adminError = await adminResponse.text();
      console.error("Error sending admin email:", adminError);
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Contact form submission processed successfully."
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error processing notification:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      },
    );
  }
});