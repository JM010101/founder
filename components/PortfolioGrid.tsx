import Image from 'next/image'
import type { PortfolioItem } from '@/types/portfolio'

type PortfolioGridProps = {
  items: PortfolioItem[]
}

export default function PortfolioGrid({ items }: PortfolioGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No portfolio items to display.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative overflow-hidden border border-gray-200 hover:border-gray-900 transition-all duration-300"
        >
          {item.image_urls && item.image_urls.length > 0 ? (
            <div className="relative aspect-square w-full bg-gray-100">
              <Image
                src={item.image_urls[0]}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="aspect-square w-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          
          <div className="p-4 bg-white">
            <h3 className="font-medium mb-1">{item.title}</h3>
            {item.category && (
              <p className="text-sm text-gray-500">{item.category.name}</p>
            )}
            {item.description && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
