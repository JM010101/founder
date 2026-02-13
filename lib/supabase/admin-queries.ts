import { createClient } from './server'
import type { PortfolioItem } from '@/types/portfolio'

export async function createPortfolioItem(item: {
  title: string
  description?: string
  category_id: string | null
  featured?: boolean
  image_urls?: string[]
  project_info?: Record<string, any>
}): Promise<PortfolioItem | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portfolio_items')
    .insert([item])
    .select(`
      *,
      category:categories(*)
    `)
    .single()

  if (error) {
    console.error('Error creating portfolio item:', error)
    return null
  }

  return data
}

export async function updatePortfolioItem(
  id: string,
  updates: Partial<{
    title: string
    description: string
    category_id: string | null
    featured: boolean
    image_urls: string[]
    project_info: Record<string, any>
  }>
): Promise<PortfolioItem | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('portfolio_items')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      category:categories(*)
    `)
    .single()

  if (error) {
    console.error('Error updating portfolio item:', error)
    return null
  }

  return data
}

export async function deletePortfolioItem(id: string): Promise<boolean> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('portfolio_items')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting portfolio item:', error)
    return false
  }

  return true
}
