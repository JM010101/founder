# Studio Portfolio Website

A modern, premium, conversion-focused website for a creative studio specializing in product photography, infographics, A+ content, logos, and packaging for Amazon and e-commerce sellers.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Database and storage

## Features

- ✅ Dynamic portfolio with filtering (Photography, Infographics, A+, Logos, Packaging)
- ✅ Homepage with category navigation and featured work
- ✅ Pre-filtered portfolio views from homepage links
- ✅ Admin/CMS interface for managing portfolio items
- ✅ Responsive design
- ✅ Image upload and management
- ✅ Featured items system

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase/schema.sql`
3. Create a storage bucket named `portfolio-images` with public access
4. Copy your project URL and anon key

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── page.tsx              # Homepage
│   ├── portfolio/
│   │   └── page.tsx          # Portfolio page with filtering
│   ├── admin/
│   │   └── page.tsx          # Admin/CMS interface
│   └── layout.tsx            # Root layout
├── components/
│   ├── PortfolioGrid.tsx     # Portfolio grid display
│   ├── PortfolioFilters.tsx  # Filter buttons
│   └── AdminDashboard.tsx    # CMS dashboard
├── lib/
│   └── supabase/
│       ├── client.ts         # Browser Supabase client
│       ├── server.ts         # Server Supabase client
│       ├── queries.ts        # Data fetching functions
│       └── admin-queries.ts  # Admin CRUD functions
├── types/
│   └── portfolio.ts          # TypeScript types
└── supabase/
    └── schema.sql            # Database schema
```

## Database Schema

The database includes:

- **categories** - Predefined portfolio categories
- **portfolio_items** - Portfolio projects with images, descriptions, and metadata

## Admin Interface

Access the admin interface at `/admin` to:
- Create new portfolio items
- Upload images
- Assign categories
- Mark items as featured
- Edit and delete items

## Next Steps

1. Add your Supabase credentials to `.env.local`
2. Run the database schema in Supabase SQL Editor
3. Create the `portfolio-images` storage bucket
4. Customize the design/styling to match your provided designs
5. Add authentication to the admin interface (recommended for production)

## Notes

- The admin interface is currently open. Add authentication before deploying to production.
- Image uploads require the Supabase storage bucket to be configured.
- Categories are predefined and managed through the database schema.
