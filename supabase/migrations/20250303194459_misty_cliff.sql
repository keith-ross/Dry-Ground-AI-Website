/*
  # Add email notification trigger for contact messages

  1. New Functions
    - `handle_new_contact_message`: Function to invoke Edge Function for email notifications
  
  2. New Triggers
    - Trigger on contact_messages table to send email notifications
*/

-- Create function to handle new contact messages
CREATE OR REPLACE FUNCTION handle_new_contact_message()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the Edge Function to send email notifications
  PERFORM
    net.http_post(
      url := CONCAT(current_setting('supabase_functions_endpoint'), '/send-email-notification'),
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', CONCAT('Bearer ', current_setting('supabase.anon_key'))
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function on new contact message
DROP TRIGGER IF EXISTS on_new_contact_message ON contact_messages;
CREATE TRIGGER on_new_contact_message
  AFTER INSERT ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_contact_message();