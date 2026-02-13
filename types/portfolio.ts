export type Category = {
  id: string
  name: string
  slug: string
  display_order: number
  created_at: string
}

export type PortfolioItem = {
  id: string
  title: string
  description: string | null
  category_id: string | null
  category?: Category
  featured: boolean
  image_urls: string[]
  project_info: Record<string, any>
  created_at: string
  updated_at: string
}

export type PortfolioFilter = 'all' | 'photography' | 'infographics' | 'a-plus' | 'logos' | 'packaging'
