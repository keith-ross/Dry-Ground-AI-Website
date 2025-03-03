/*
  # Final Fix for Contact Messages Table and RLS

  1. Changes
    - Completely recreate the contact_messages table with proper settings
    - Set up correct RLS policies from scratch
    - Ensure public access for form submissions
  
  2. Security
    - Allow anonymous users to insert records (required for public contact form)
    - Maintain security by restricting read access to authenticated users only
*/

-- Drop the existing table completely to start fresh
DROP TABLE IF EXISTS contact_messages;

-- Recreate the table with proper settings
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on the fresh table
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows ANYONE to insert records (both anonymous and authenticated users)
CREATE POLICY "public_insert_policy" 
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create a policy that allows authenticated users to read records
CREATE POLICY "auth_select_policy"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);