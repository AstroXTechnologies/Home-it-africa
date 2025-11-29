# Deployment Instructions

## Environment Variables

Before deploying to Netlify, you need to add the following environment variables:

### Required Environment Variables

1. Go to your Netlify dashboard
2. Navigate to: **Site Settings** → **Environment Variables**
3. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://iamremeboaslkfqopynj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhbXJlbWVib2FzbGtmcW9weW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NDY2NTksImV4cCI6MjA4MDAyMjY1OX0.ujhLPdHDOsSu4LPSisudBOPE4HjHQCt2q7ht43ev_C0
```

### Steps to Add Environment Variables on Netlify:

1. Log in to your Netlify account
2. Select your site
3. Go to **Site Settings** → **Build & Deploy** → **Environment**
4. Click **Add a variable** or **Edit variables**
5. Add each variable with its corresponding value
6. Click **Save**
7. Trigger a new deploy

### Important Notes:

- Environment variables are **required** for the build to succeed
- Make sure to use the exact variable names (including `NEXT_PUBLIC_` prefix)
- After adding the variables, you need to trigger a new deployment
- The `.env` file in the repository is for local development only and is not used in production

## Triggering a New Deployment

After adding the environment variables:

1. Go to **Deploys** in your Netlify dashboard
2. Click **Trigger deploy** → **Deploy site**
3. Wait for the build to complete

Your site should now build successfully!
