/*
  # Create contact_messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `message` (text, not null)
      - `created_at` (timestamp with time zone, default: now())
  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for authenticated users to insert data
    - Add policy for authenticated users to read data
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- For INSERT operations, we need to use WITH CHECK instead of USING
CREATE POLICY "Allow authenticated users to insert contact messages"
  ON contact_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- For SELECT operations, we use USING
CREATE POLICY "Allow authenticated users to read contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);