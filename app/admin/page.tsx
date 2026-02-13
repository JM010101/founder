import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'
import { getCategories } from '@/lib/supabase/queries'

// In production, you should add proper authentication here
// For now, this is a basic admin interface

export default async function AdminPage() {
  const categories = await getCategories()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-light mb-8">Portfolio Management</h1>
          <AdminDashboard categories={categories} />
        </div>
      </div>
    </main>
  )
}
