import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="text-lg md:text-xl font-light tracking-tight">
            Studio
          </Link>
          <div className="flex gap-6 md:gap-8">
            <Link
              href="/portfolio"
              className="text-sm md:text-base hover:underline transition-opacity"
            >
              Portfolio
            </Link>
            <Link
              href="/admin"
              className="text-sm md:text-base hover:underline transition-opacity"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
