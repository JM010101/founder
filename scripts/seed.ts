import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your environment variables.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedPortfolioItems() {
  console.log('🌱 Starting portfolio seed...')

  // First, get all categories
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('*')
    .order('display_order')

  if (catError) {
    console.error('Error fetching categories:', catError)
    return
  }

  if (!categories || categories.length === 0) {
    console.error('No categories found. Please run the database schema first.')
    return
  }

  console.log(`Found ${categories.length} categories`)

  // Sample portfolio items for each category
  const portfolioItems = [
    // Photography
    {
      title: 'Premium Product Photography - Electronics',
      description: 'High-end product photography showcasing electronics with professional lighting and composition.',
      category_slug: 'photography',
      featured: true,
      image_urls: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      ],
    },
    {
      title: 'Lifestyle Product Photography',
      description: 'Natural lifestyle photography for e-commerce products, creating an authentic brand experience.',
      category_slug: 'photography',
      featured: false,
      image_urls: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      ],
    },
    {
      title: 'White Background Product Shots',
      description: 'Clean, professional white background photography perfect for Amazon listings.',
      category_slug: 'photography',
      featured: true,
      image_urls: [
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
      ],
    },
    // Infographics
    {
      title: 'Product Comparison Infographic',
      description: 'Visual comparison infographic highlighting product features and benefits.',
      category_slug: 'infographics',
      featured: true,
      image_urls: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      ],
    },
    {
      title: 'Process Flow Infographic',
      description: 'Step-by-step process visualization for product usage and benefits.',
      category_slug: 'infographics',
      featured: false,
      image_urls: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      ],
    },
    // A+ Content
    {
      title: 'Enhanced Brand Content - Amazon A+',
      description: 'Comprehensive A+ content design with rich media and detailed product information.',
      category_slug: 'a-plus',
      featured: true,
      image_urls: [
        'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800',
      ],
    },
    {
      title: 'Product Storytelling A+ Content',
      description: 'Engaging A+ content that tells your brand story and connects with customers.',
      category_slug: 'a-plus',
      featured: false,
      image_urls: [
        'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800',
      ],
    },
    // Logos
    {
      title: 'Modern Brand Logo Design',
      description: 'Clean, modern logo design that represents your brand identity and values.',
      category_slug: 'logos',
      featured: true,
      image_urls: [
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      ],
    },
    {
      title: 'Minimalist Logo Collection',
      description: 'Minimalist logo designs perfect for e-commerce and digital platforms.',
      category_slug: 'logos',
      featured: false,
      image_urls: [
        'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800',
      ],
    },
    {
      title: 'Typography-Based Logo',
      description: 'Elegant typography-focused logo design for premium brands.',
      category_slug: 'logos',
      featured: true,
      image_urls: [
        'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800',
      ],
    },
    // Packaging
    {
      title: 'Premium Product Packaging',
      description: 'Luxury packaging design that elevates the unboxing experience.',
      category_slug: 'packaging',
      featured: true,
      image_urls: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      ],
    },
    {
      title: 'Eco-Friendly Packaging Design',
      description: 'Sustainable packaging solutions that align with modern consumer values.',
      category_slug: 'packaging',
      featured: false,
      image_urls: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      ],
    },
    {
      title: 'Custom Box Design',
      description: 'Custom-designed packaging boxes that stand out on shelves and online.',
      category_slug: 'packaging',
      featured: true,
      image_urls: [
        'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800',
      ],
    },
  ]

  // Map category slugs to IDs
  const categoryMap = new Map(categories.map(cat => [cat.slug, cat.id]))

  // Insert portfolio items
  let inserted = 0
  let errors = 0

  for (const item of portfolioItems) {
    const categoryId = categoryMap.get(item.category_slug)
    
    if (!categoryId) {
      console.warn(`Category not found for slug: ${item.category_slug}`)
      errors++
      continue
    }

    const { error } = await supabase
      .from('portfolio_items')
      .insert({
        title: item.title,
        description: item.description,
        category_id: categoryId,
        featured: item.featured,
        image_urls: item.image_urls,
        project_info: {},
      })

    if (error) {
      console.error(`Error inserting ${item.title}:`, error)
      errors++
    } else {
      inserted++
      console.log(`✅ Added: ${item.title}`)
    }
  }

  console.log(`\n✨ Seed complete!`)
  console.log(`   Inserted: ${inserted} items`)
  console.log(`   Errors: ${errors} items`)
}

// Run the seed
seedPortfolioItems()
  .then(() => {
    console.log('\n🎉 Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
