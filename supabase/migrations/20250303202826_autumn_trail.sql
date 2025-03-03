/*
  # Fix Row-Level Security for contact_messages table - Final Fix

  1. Changes
    - Completely reset all policies on the contact_messages table
    - Create new policies with proper permissions for anonymous users
    - Ensure public access for form submissions
  
  2. Security
    - Allow anonymous users to insert records (required for public contact form)
    - Maintain security by restricting read access to authenticated users only
*/

-- First, disable RLS temporarily to reset everything
ALTER TABLE contact_messages DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies on the contact_messages table
DROP POLICY IF EXISTS "Allow anonymous users to insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to insert contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated users to read contact messages" ON contact_messages;
DROP POLICY IF EXISTS "anon_insert_policy" ON contact_messages;
DROP POLICY IF EXISTS "auth_select_policy" ON contact_messages;

-- Re-enable RLS
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