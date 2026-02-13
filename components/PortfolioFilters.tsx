'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { Category } from '@/types/portfolio'
import type { PortfolioFilter } from '@/types/portfolio'

type PortfolioFiltersProps = {
  categories: Category[]
  activeFilter: PortfolioFilter
}

export default function PortfolioFilters({ categories, activeFilter }: PortfolioFiltersProps) {
  const searchParams = useSearchParams()

  return (
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        <Link
          href="/portfolio"
          className={`px-6 py-2 border transition-colors duration-200 ${
            activeFilter === 'all'
              ? 'border-gray-900 bg-gray-900 text-white'
              : 'border-gray-200 hover:border-gray-900'
          }`}
        >
          All
        </Link>
        {categories.map((category) => {
          const isActive = activeFilter === category.slug
          return (
            <Link
              key={category.id}
              href={`/portfolio?filter=${category.slug}`}
              className={`px-6 py-2 border transition-colors duration-200 ${
                isActive
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 hover:border-gray-900'
              }`}
            >
              {category.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
