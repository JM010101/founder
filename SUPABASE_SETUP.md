# Supabase Setup Guide

Follow these steps to set up your Supabase database and storage.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in your project details and wait for it to be created

## 2. Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click **Run** (or press Ctrl+Enter)
5. Verify the tables were created by checking the **Table Editor**

## 3. Create Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click **New bucket**
3. Name it: `portfolio-images`
4. Set it to **Public bucket** (toggle ON)
5. Click **Create bucket**

### Storage Policies (Important!)

After creating the bucket, you need to set up policies:

1. Click on the `portfolio-images` bucket
2. Go to **Policies** tab
3. Click **New Policy**
4. Choose **For full customization**
5. Name: `Allow public read access`
6. Policy definition:
   ```sql
   (bucket_id = 'portfolio-images'::text)
   ```
7. Check **SELECT** operation
8. Click **Review** then **Save policy**

5. Create another policy for uploads:
   - Name: `Allow authenticated uploads`
   - Policy definition:
     ```sql
     (bucket_id = 'portfolio-images'::text)
     ```
   - Check **INSERT** operation
   - Click **Review** then **Save policy**

## 4. Get Your API Keys

1. Go to **Settings** → **API**
2. Copy the following:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 5. Configure Environment Variables

1. In your project root, create `.env.local` file
2. Add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 6. Verify Setup

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/admin`
3. Try creating a portfolio item with an image upload
4. If everything works, you're all set!

## Troubleshooting

### Images not uploading?
- Make sure the storage bucket is set to **Public**
- Verify the storage policies are set correctly
- Check that you're using the correct bucket name: `portfolio-images`

### Database errors?
- Verify the schema was run successfully
- Check that categories were inserted (should see 5 categories in Table Editor)
- Ensure foreign key relationships are correct

### API errors?
- Double-check your environment variables
- Make sure you're using the **anon** key, not the service role key
- Verify your Supabase project is active
