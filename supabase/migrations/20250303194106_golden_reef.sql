/*
  # Fix contact_messages RLS policies for anonymous access

  1. Security Changes
    - Update RLS policies to allow anonymous (anon) users to insert contact messages
    - Keep authenticated users' access to read messages
    - This ensures the contact form works without requiring user login
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to read contact messages" ON contact_messages;

-- Create new policies that allow anonymous users to insert messages
CREATE POLICY "Allow anonymous users to insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Keep the policy for authenticated users to read messages
CREATE POLICY "Allow authenticated users to read contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);