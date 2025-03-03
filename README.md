# Dry Ground AI Website

## Setting up the Contact Form with SendGrid

The contact form uses SQLite and SendGrid to:
1. Store form submissions in a local database
2. Send confirmation emails to users
3. Send notification emails to administrators

### Setup Steps:

1. Create a SendGrid account and obtain an API key
2. Add your SendGrid API key to Replit secrets:
   - Click on "Tools" in the sidebar
   - Select "Secrets"
   - Add a new secret with key `SENDGRID_API_KEY` and your API key as the value

The database (SQLite) will be automatically created in the `data` directory when the app runs.