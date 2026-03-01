'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// ✅ Simple button component (built-in, no import needed)
function Button({ children, onClick, variant = 'primary', disabled = false, type = 'button' }: any) {
  const baseClass = "px-6 py-3 rounded-lg font-semibold transition-all duration-300"
  const variants: any = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700",
    outline: "border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  )
}

// ✅ Complete interface
interface ProductFormData {
  name: string
  description: string
  price: string
  category: string
  type: string
  origin: string
  hardness: string
  weight: string
  dimensions: string
  stock: string
  featured: boolean
  images: string[]
}

export default function EditProduct({ params }: { params: { id: string } }) {  // ✅ id use karein, productId nahi
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    type: '',
    origin: '',
    hardness: '',
    weight: '',
    dimensions: '',
    stock: '',
    featured: false,
    images: ['n1', 'n2', 'n3']
  })

  const categories = ['Crystals', 'Rough Stones', 'Polished Gems', 'Tumbled Stones', 'Jewelry', 'Fossils']
  const types = ['Natural', 'Polished', 'Raw', 'Cut', 'Tumbled', 'Faceted']
  const origins = ['Brazil', 'Myanmar', 'Sri Lanka', 'Colombia', 'Madagascar', 'Pakistan', 'Afghanistan', 'India']

  useEffect(() => {
    setTimeout(() => {
      const mockProducts: any = {
        '1': {
          name: 'Amethyst Crystal',
          description: 'Natural amethyst crystal cluster from Brazil. Deep purple color with excellent clarity.',
          price: '299',
          category: 'Crystals',
          type: 'Natural',
          origin: 'Brazil',
          hardness: '7',
          weight: '125',
          dimensions: '8x5x3 cm',
          stock: '15',
          featured: true,
          images: ['n1', 'n2', 'n3']
        },
        '2': {
          name: 'Ruby Rough',
          description: 'Natural rough ruby from Myanmar. Deep red color with good transparency.',
          price: '499',
          category: 'Rough Stones',
          type: 'Raw',
          origin: 'Myanmar',
          hardness: '9',
          weight: '45',
          dimensions: '3x2x1.5 cm',
          stock: '8',
          featured: true,
          images: ['n2', 'n3', 'n4']
        },
        '3': {
          name: 'Sapphire Polished',
          description: 'Natural sapphire from Sri Lanka, expertly polished. Beautiful blue color.',
          price: '899',
          category: 'Polished Gems',
          type: 'Polished',
          origin: 'Sri Lanka',
          hardness: '9',
          weight: '32',
          dimensions: '2x1.5x1 cm',
          stock: '5',
          featured: false,
          images: ['n3', 'n4', 'n5']
        }
      }
      
      setFormData(mockProducts[params.id] || {
        name: 'Unknown Product',
        description: 'Product description not available.',
        price: '0',
        category: 'Crystals',
        type: 'Natural',
        origin: 'Brazil',
        hardness: '7',
        weight: '0',
        dimensions: '',
        stock: '0',
        featured: false,
        images: ['/n1.jpeg', 'n2.jpeg', '/n3jpeg']
      })
      setLoading(false)
    }, 1000)
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    
    try {
      if (!formData.name || !formData.price || !formData.category) {
        throw new Error('Please fill in all required fields')
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSuccess('Product updated successfully!')
      setSaving(false)
      
      setTimeout(() => {
        router.push('/dashboard/products')
        router.refresh()
      }, 2000)
      
    } catch (err: any) {
      setSaving(false)
      setError(err.message || 'Failed to update product. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-purple-300">Loading product data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/dashboard/products" 
          className="text-pink-400 hover:text-pink-300 mb-2 inline-block"
        >
          ← Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-purple-300">Edit Product: {formData.name}</h1>
        <p className="text-gray-400 mt-2">Product ID: {params.id}</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
          <p className="text-green-400">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-pink-400 mb-4">Basic Information</h2>
            
            <div>
              <label className="block text-gray-300 mb-2">
                Product Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                rows={4}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">
                  Price ($) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  min="0"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  name="category"
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Type</label>
                <select
                  name="type"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  value={formData.type}
                  onChange={handleChange}
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-pink-400 mb-4">Physical Properties</h2>

            <div>
              <label className="block text-gray-300 mb-2">Origin</label>
              <select
                name="origin"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                value={formData.origin}
                onChange={handleChange}
              >
                {origins.map(origin => (
                  <option key={origin} value={origin}>{origin}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Hardness (Mohs)</label>
                <input
                  type="number"
                  name="hardness"
                  min="0"
                  max="10"
                  step="0.1"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  value={formData.hardness}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Weight (carats)</label>
                <input
                  type="number"
                  name="weight"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Dimensions</label>
              <input
                type="text"
                name="dimensions"
                placeholder="e.g., 8x5x3 cm"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                value={formData.dimensions}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center space-x-3 mt-4">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                className="w-5 h-5"
                checked={formData.featured}
                onChange={handleChange}
              />
              <label htmlFor="featured" className="text-gray-300">
                Feature this product on homepage
              </label>
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h2 className="text-xl font-bold text-pink-400 mb-4">Product Images</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-purple-800 rounded-lg"></div>
                <button
                  type="button"
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className="aspect-square border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-500"
            >
              <span className="text-2xl">+</span>
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Click + to add images. First image will be used as thumbnail.
          </p>
        </div>

        {/* Form Actions */}
        <div className="mt-8 pt-6 border-t border-gray-700 flex justify-end space-x-4">
          <Link href="/dashboard/products">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button 
            type="submit" 
            variant="primary"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>

      {/* Preview Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-pink-400 mb-4">Live Preview</h2>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-purple-800 rounded-lg"></div>
            <div>
              <h3 className="text-2xl font-bold text-white">{formData.name || 'Product Name'}</h3>
              <p className="text-pink-400">${formData.price || '0'}</p>
              <p className="text-gray-400 text-sm mt-2">{formData.description || 'Description will appear here'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}