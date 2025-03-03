/*
  # Fix Row-Level Security for contact_messages table

  1. Changes
    - Drop all existing policies on the contact_messages table
    - Create new policies that properly allow anonymous users to insert records
    - Ensure RLS is enabled but configured correctly
  
  2. Security
    - Allow anonymous users to insert records (required for public contact form)
    - Maintain security by restricting read access to authenticated users only
*/

-- First, drop all existing policies on the contact_messages table
DROP POLICY IF EXISTS "Allow anonymous users to insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to read contact messages" ON contact_messages;

-- Ensure RLS is enabled
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anonymous users to insert records
CREATE POLICY "anon_insert_policy" 
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a policy that allows authenticated users to read records
CREATE POLICY "auth_select_policy"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);