# Vercel Deployment Guide

## Environment Variables for Vercel

Copy and paste these environment variables into your Vercel project settings:

### Required Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
SUPABASE_SECRET_KEY=your-secret-key-here
```

**⚠️ Important:** Replace the placeholder values above with your actual Supabase credentials from your `.env.local` file or Supabase dashboard.

## How to Add Environment Variables in Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable one by one:
   - Click **Add New**
   - Enter the **Key** (variable name)
   - Enter the **Value**
   - Select **Environment(s)**: 
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **Save**
5. Repeat for all 5 variables

### Method 2: Via Vercel CLI

If you have Vercel CLI installed, you can add them via command line:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add SUPABASE_SECRET_KEY
```

## Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Or deploy to production:
   ```bash
   vercel --prod
   ```

4. **Or use GitHub Integration**:
   - Push your code to GitHub
   - Import the repository in Vercel
   - Vercel will automatically detect Next.js
   - Add environment variables in the project settings
   - Deploy

## After Deployment

1. **Redeploy** after adding environment variables:
   - Go to **Deployments** tab
   - Click the **⋯** menu on the latest deployment
   - Select **Redeploy**

2. **Verify** your deployment:
   - Visit your Vercel URL
   - Test the homepage
   - Test the portfolio page
   - Test the admin interface at `/admin`

## Important Notes

- ⚠️ **Never commit `.env.local`** to Git (it's already in `.gitignore`)
- ✅ All `NEXT_PUBLIC_*` variables are exposed to the browser
- 🔒 `SUPABASE_SERVICE_ROLE_KEY` and `SUPABASE_SECRET_KEY` are server-only
- 🔄 After adding/changing environment variables, you must redeploy

## Troubleshooting

### Environment variables not working?
- Make sure you've added them in Vercel dashboard
- Redeploy after adding variables
- Check that variable names match exactly (case-sensitive)

### Build errors?
- Verify all environment variables are set
- Check Vercel build logs for specific errors
- Ensure Supabase project is active and accessible
