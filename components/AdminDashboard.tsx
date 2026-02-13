'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Category, PortfolioItem } from '@/types/portfolio'

type AdminDashboardProps = {
  categories: Category[]
}

export default function AdminDashboard({ categories }: AdminDashboardProps) {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    featured: false,
    image_urls: [] as string[],
    project_info: {} as Record<string, any>,
  })

  const supabase = createClient()

  useEffect(() => {
    loadItems()
  }, [])

  async function loadItems() {
    setLoading(true)
    const { data, error } = await supabase
      .from('portfolio_items')
      .select(`
        *,
        category:categories(*)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading items:', error)
    } else {
      setItems(data || [])
    }
    setLoading(false)
  }

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files || files.length === 0) return

    const uploadedUrls: string[] = []

    for (const file of Array.from(files)) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `portfolio/${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Error uploading image:', uploadError)
        continue
      }

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath)

      uploadedUrls.push(publicUrl)
    }

    setFormData({ ...formData, image_urls: [...formData.image_urls, ...uploadedUrls] })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload = {
      title: formData.title,
      description: formData.description || null,
      category_id: formData.category_id || null,
      featured: formData.featured,
      image_urls: formData.image_urls,
      project_info: formData.project_info,
    }

    if (editingItem) {
      const { error } = await supabase
        .from('portfolio_items')
        .update(payload)
        .eq('id', editingItem.id)

      if (error) {
        console.error('Error updating item:', error)
        alert('Error updating item')
      } else {
        alert('Item updated successfully')
        resetForm()
        loadItems()
      }
    } else {
      const { error } = await supabase
        .from('portfolio_items')
        .insert([payload])

      if (error) {
        console.error('Error creating item:', error)
        alert('Error creating item')
      } else {
        alert('Item created successfully')
        resetForm()
        loadItems()
      }
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      description: '',
      category_id: '',
      featured: false,
      image_urls: [],
      project_info: {},
    })
    setEditingItem(null)
    setShowForm(false)
  }

  function startEdit(item: PortfolioItem) {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description || '',
      category_id: item.category_id || '',
      featured: item.featured,
      image_urls: item.image_urls,
      project_info: item.project_info,
    })
    setShowForm(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return

    const { error } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting item:', error)
      alert('Error deleting item')
    } else {
      alert('Item deleted successfully')
      loadItems()
    }
  }

  function removeImage(index: number) {
    setFormData({
      ...formData,
      image_urls: formData.image_urls.filter((_, i) => i !== index),
    })
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-medium">Portfolio Items</h2>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
        >
          Add New Item
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 bg-white border border-gray-200">
          <h3 className="text-lg font-medium mb-4">
            {editingItem ? 'Edit Item' : 'Create New Item'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-900"
              >
                <option value="">No Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <span className="text-sm font-medium">Featured</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300"
              />
              {formData.image_urls.length > 0 && (
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {formData.image_urls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
              >
                {editingItem ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Featured</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-gray-200">
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">
                    {item.category ? item.category.name : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {item.featured ? '✓' : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(item)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No portfolio items yet. Create your first item above.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
