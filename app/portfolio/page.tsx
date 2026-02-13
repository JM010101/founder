import { Suspense } from 'react'
import { getCategories, getPortfolioItems } from '@/lib/supabase/queries'
import PortfolioGrid from '@/components/PortfolioGrid'
import PortfolioFilters from '@/components/PortfolioFilters'
import type { PortfolioFilter } from '@/types/portfolio'

type PortfolioPageProps = {
  searchParams: { filter?: string }
}

function getFilterFromSlug(slug?: string): PortfolioFilter {
  if (!slug) return 'all'
  const validFilters: PortfolioFilter[] = ['photography', 'infographics', 'a-plus', 'logos', 'packaging']
  return validFilters.includes(slug as PortfolioFilter) ? (slug as PortfolioFilter) : 'all'
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const filter = getFilterFromSlug(searchParams.filter)
  const categories = await getCategories()
  const items = await getPortfolioItems(filter)

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-light mb-12 text-center">Portfolio</h1>
          
          <Suspense fallback={<div className="text-center py-12">Loading filters...</div>}>
            <PortfolioFilters categories={categories} activeFilter={filter} />
          </Suspense>

          <Suspense fallback={<div className="text-center py-12">Loading portfolio...</div>}>
            {items.length > 0 ? (
              <PortfolioGrid items={items} />
            ) : (
              <div className="text-center py-20 text-gray-500">
                <p>No items found in this category.</p>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </main>
  )
}
