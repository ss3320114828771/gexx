'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import Button from '@/components/ui/button'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  type: string
  origin: string
  stock: number
  featured: boolean
  images: string[]
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedOrigin, setSelectedOrigin] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 })

  // Mock products data
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts([
        {
          id: '1',
          name: 'Amethyst Crystal',
          description: 'Natural amethyst crystal cluster from Brazil. Deep purple color.',
          price: 299,
          category: 'Crystals',
          type: 'Natural',
          origin: 'Brazil',
          stock: 15,
          featured: true,
          images: ['n1', 'n2', 'n3']
        },
        {
          id: '2',
          name: 'Ruby Rough',
          description: 'Natural rough ruby from Myanmar. Deep red color with good transparency.',
          price: 499,
          category: 'Rough Stones',
          type: 'Raw',
          origin: 'Myanmar',
          stock: 8,
          featured: true,
          images: ['n2', 'n3', 'n4']
        },
        {
          id: '3',
          name: 'Sapphire Polished',
          description: 'Natural sapphire from Sri Lanka, expertly polished. Beautiful blue color.',
          price: 899,
          category: 'Polished Gems',
          type: 'Polished',
          origin: 'Sri Lanka',
          stock: 5,
          featured: true,
          images: ['n3', 'n4', 'n5']
        },
        {
          id: '4',
          name: 'Emerald',
          description: 'Natural emerald from Colombia. Rich green color with excellent clarity.',
          price: 1299,
          category: 'Polished Gems',
          type: 'Polished',
          origin: 'Colombia',
          stock: 3,
          featured: true,
          images: ['n4', 'n5', 'n6']
        },
        {
          id: '5',
          name: 'Rose Quartz Tumbled',
          description: 'Tumbled rose quartz from Madagascar. Soft pink color, polished and smooth.',
          price: 99,
          category: 'Tumbled Stones',
          type: 'Tumbled',
          origin: 'Madagascar',
          stock: 45,
          featured: false,
          images: ['n5', 'n6', 'n1']
        },
        {
          id: '6',
          name: 'Citrine Points',
          description: 'Natural citrine points from Brazil. Golden yellow color.',
          price: 199,
          category: 'Crystals',
          type: 'Natural',
          origin: 'Brazil',
          stock: 12,
          featured: false,
          images: ['n6', 'n1', 'n2']
        },
        {
          id: '7',
          name: 'Lapis Lazuli',
          description: 'Deep blue lapis lazuli from Afghanistan with gold pyrite inclusions.',
          price: 159,
          category: 'Polished Gems',
          type: 'Polished',
          origin: 'Afghanistan',
          stock: 7,
          featured: false,
          images: ['n1', 'n3', 'n5']
        },
        {
          id: '8',
          name: 'Tiger Eye',
          description: 'Golden brown tiger eye from South Africa with silky luster.',
          price: 79,
          category: 'Tumbled Stones',
          type: 'Tumbled',
          origin: 'South Africa',
          stock: 22,
          featured: false,
          images: ['n2', 'n4', 'n6']
        },
        {
          id: '9',
          name: 'Jade',
          description: 'Green jade from Myanmar, polished and smooth.',
          price: 249,
          category: 'Polished Gems',
          type: 'Polished',
          origin: 'Myanmar',
          stock: 6,
          featured: true,
          images: ['n3', 'n5', 'n1']
        }
      ])
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Get unique filter options
  const categories = ['all', ...new Set(products.map(p => p.category))]
  const types = ['all', ...new Set(products.map(p => p.type))]
  const origins = ['all', ...new Set(products.map(p => p.origin))]

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false
      
      // Type filter
      if (selectedType !== 'all' && product.type !== selectedType) return false
      
      // Origin filter
      if (selectedOrigin !== 'all' && product.origin !== selectedOrigin) return false
      
      // Price range filter
      if (product.price < priceRange.min || product.price > priceRange.max) return false
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return product.name.toLowerCase().includes(query) ||
               product.description.toLowerCase().includes(query)
      }
      
      return true
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'price_asc': return a.price - b.price
        case 'price_desc': return b.price - a.price
        case 'name_asc': return a.name.localeCompare(b.name)
        case 'name_desc': return b.name.localeCompare(a.name)
        default: return 0 // newest
      }
    })

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-purple-300">Loading products...</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Our Collection
          </h1>
          <p className="text-xl text-purple-200">
            Discover nature's finest creations
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4"></div>
        </div>

        {/* Bismillah */}
        <div className="text-center mb-8">
          <p className="text-2xl text-gradient font-arabic">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-purple-900/30 border border-purple-500 rounded-lg text-white placeholder-purple-400 focus:border-pink-500 focus:outline-none"
            />
            <span className="absolute left-4 top-3 text-purple-400">🔍</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm text-purple-400 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-purple-900">
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm text-purple-400 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              >
                {types.map(type => (
                  <option key={type} value={type} className="bg-purple-900">
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Origin Filter */}
            <div>
              <label className="block text-sm text-purple-400 mb-2">Origin</label>
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              >
                {origins.map(origin => (
                  <option key={origin} value={origin} className="bg-purple-900">
                    {origin === 'all' ? 'All Origins' : origin}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm text-purple-400 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-4">
            <label className="block text-sm text-purple-400 mb-2">
              Price Range: ${priceRange.min} - ${priceRange.max}
            </label>
            <div className="flex gap-4">
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-2 py-1 bg-pink-600 text-white text-xs rounded-full flex items-center gap-1"
              >
                {selectedCategory} ✕
              </button>
            )}
            {selectedType !== 'all' && (
              <button
                onClick={() => setSelectedType('all')}
                className="px-2 py-1 bg-pink-600 text-white text-xs rounded-full flex items-center gap-1"
              >
                {selectedType} ✕
              </button>
            )}
            {selectedOrigin !== 'all' && (
              <button
                onClick={() => setSelectedOrigin('all')}
                className="px-2 py-1 bg-pink-600 text-white text-xs rounded-full flex items-center gap-1"
              >
                {selectedOrigin} ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-purple-300 mb-4">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-xl font-bold text-pink-400 mb-2">No Products Found</h3>
            <p className="text-purple-300">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="group bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-4 hover:border-pink-500 transition-all hover:scale-105 cursor-pointer">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-3"></div>
                    {product.featured && (
                      <span className="absolute top-2 right-2 px-2 py-1 bg-pink-600 text-white text-xs rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-purple-300 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-bold text-gradient">
                      ${product.price}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.stock > 10 ? 'bg-green-500/20 text-green-400' :
                      product.stock > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <span className="text-xs text-purple-400">{product.category}</span>
                    <span className="text-xs text-purple-600">•</span>
                    <span className="text-xs text-purple-400">{product.origin}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  )
}