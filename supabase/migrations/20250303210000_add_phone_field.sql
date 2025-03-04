
/*
  # Add phone field to contact_messages table

  1. Changes
    - Add phone column to contact_messages table
*/

-- Add phone field to the contact_messages table
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS phone text NOT NULL DEFAULT '';

-- Update existing records to have a default value if needed
UPDATE contact_messages SET phone = '' WHERE phone IS NULL;

-- Make phone field NOT NULL
ALTER TABLE contact_messages ALTER COLUMN phone SET NOT NULL;
