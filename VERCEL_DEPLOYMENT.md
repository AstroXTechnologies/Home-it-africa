# Vercel Deployment Guide

## Quick Start

1. **Install Vercel CLI** (optional - you can deploy via dashboard):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard** (Recommended):
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`: `https://iamremeboaslkfqopynj.supabase.co`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhbXJlbWVib2FzbGtmcW9weW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NDY2NTksImV4cCI6MjA4MDAyMjY1OX0.ujhLPdHDOsSu4LPSisudBOPE4HjHQCt2q7ht43ev_C0`
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   vercel
   ```
   Follow the prompts and add the environment variables when asked.

## Configuration

The project is already configured for Vercel with:
- ✅ `vercel.json` - Build settings
- ✅ `.vercelignore` - Ignore unnecessary files
- ✅ Next.js configuration optimized for deployment

## Environment Variables

Make sure to add these in the Vercel dashboard under:
**Project Settings → Environment Variables**

```
NEXT_PUBLIC_SUPABASE_URL=https://iamremeboaslkfqopynj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhbXJlbWVib2FzbGtmcW9weW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NDY2NTksImV4cCI6MjA4MDAyMjY1OX0.ujhLPdHDOsSu4LPSisudBOPE4HjHQCt2q7ht43ev_C0
```

## Why Vercel?

- **Zero-config**: Built by the Next.js team
- **Automatic optimization**: Edge functions, ISR, and streaming
- **Perfect compatibility**: No plugin issues like with Netlify
- **Free tier**: Generous limits for personal projects
- **Fast deploys**: Typically 30-60 seconds

## Domain Setup

After deployment:
1. Vercel provides a `.vercel.app` domain automatically
2. You can add a custom domain in Project Settings → Domains
3. Vercel handles SSL certificates automatically

## Continuous Deployment

Once connected to your Git repository:
- Every push to `main` triggers a production deployment
- Pull requests get preview deployments automatically
- Rollback to any previous deployment with one click
