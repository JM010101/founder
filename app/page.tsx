import Link from 'next/link'
import { getCategories, getFeaturedPortfolioItems } from '@/lib/supabase/queries'
import PortfolioGrid from '@/components/PortfolioGrid'

export default async function Home() {
  const categories = await getCategories()
  const featuredItems = await getFeaturedPortfolioItems(6)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
            Premium Creative Services
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Product photography, infographics, A+ content, logos, and packaging 
            for Amazon and e-commerce sellers
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="container mx-auto px-4 py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-light mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/portfolio?filter=${category.slug}`}
                className="group p-6 border border-gray-200 hover:border-gray-900 transition-colors duration-200 text-center"
              >
                <span className="text-sm md:text-base font-medium group-hover:underline">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Portfolio */}
      {featuredItems.length > 0 && (
        <section className="container mx-auto px-4 py-20 border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-light mb-12 text-center">Featured Work</h2>
            <PortfolioGrid items={featuredItems} />
            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="inline-block px-8 py-3 border border-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                View All Work
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
