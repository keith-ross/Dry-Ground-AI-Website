/*
  # Fix RLS policy for contact_messages table

  1. Changes
    - Update RLS policy to allow anonymous users to insert contact messages
    - Ensure the policy is properly applied
  2. Security
    - Maintain security while allowing anonymous form submissions
*/

-- First, check if the policy exists and drop it if it does
DROP POLICY IF EXISTS "Allow anonymous users to insert contact messages" ON contact_messages;

-- Create a new policy that explicitly allows anonymous users to insert records
CREATE POLICY "Allow anonymous users to insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Ensure RLS is enabled on the table
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;