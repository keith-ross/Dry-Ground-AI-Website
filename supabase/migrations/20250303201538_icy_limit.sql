-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS on_new_contact_message ON contact_messages;
DROP FUNCTION IF EXISTS handle_new_contact_message();

-- Create a simpler version that doesn't rely on net.http_post
CREATE OR REPLACE FUNCTION handle_new_contact_message()
RETURNS TRIGGER AS $$
BEGIN
  -- We'll handle email notifications directly from the client side
  -- This function now just returns the NEW record without trying to call edge functions
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function on new contact message
CREATE TRIGGER on_new_contact_message
  AFTER INSERT ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_contact_message();