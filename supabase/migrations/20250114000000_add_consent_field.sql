
/*
  # Add communication consent field to contact_messages table

  1. Changes
    - Add communication_consent boolean field to track user consent
    - Set default to false for data integrity
    - Add index for potential filtering/reporting
*/

-- Add communication consent field to existing table
ALTER TABLE contact_messages 
ADD COLUMN communication_consent boolean NOT NULL DEFAULT false;

-- Add index for potential filtering on consent status
CREATE INDEX idx_contact_messages_consent ON contact_messages(communication_consent);
