import { createClient } from './server'
import type { PortfolioItem, Category, PortfolioFilter } from '@/types/portfolio'

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

export async function getPortfolioItems(filter?: PortfolioFilter): Promise<PortfolioItem[]> {
  const supabase = await createClient()
  
  let query = supabase
    .from('portfolio_items')
    .select(`
      *,
      category:categories(*)
    `)
    .order('created_at', { ascending: false })

  if (filter && filter !== 'all') {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', filter)
      .single()

    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching portfolio items:', error)
    return []
  }

  return data || []
}

export async function getFeaturedPortfolioItems(limit: number = 6): Promise<PortfolioItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portfolio_items')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured portfolio items:', error)
    return []
  }

  return data || []
}

export async function getPortfolioItemById(id: string): Promise<PortfolioItem | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portfolio_items')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching portfolio item:', error)
    return null
  }

  return data
}
