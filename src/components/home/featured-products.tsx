'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  price: number
  category: string
  image?: string
  rating?: number
  reviews?: number
  isNew?: boolean
  discount?: number
}

interface FeaturedProductsProps {
  title?: string
  subtitle?: string
  products?: Product[]
  layout?: 'grid' | 'carousel'
  limit?: number
  showRating?: boolean
  showCategory?: boolean
}

export default function FeaturedProducts({
  title = "Featured Gems",
  subtitle = "Discover our most popular precious stones",
  products = defaultProducts,
  layout = 'grid',
  limit = 6,
  showRating = true,
  showCategory = true
}: FeaturedProductsProps) {
  
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation on mount
    setIsVisible(true)
  }, [])

  // Limit products
  const displayedProducts = products.slice(0, limit)

  // Calculate discounted price
  const getDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price
    return price - (price * discount / 100)
  }

  // Grid Layout
  if (layout === 'grid') {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              {title}
            </h2>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              {subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4"></div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div 
                  className={`relative bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-4 hover:border-pink-500 transition-all duration-500 hover:scale-105 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Badges */}
                  <div className="absolute top-2 left-2 z-10 flex gap-2">
                    {product.isNew && (
                      <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
                        New
                      </span>
                    )}
                    {product.discount && (
                      <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-75 group-hover:opacity-90 transition-opacity"></div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        View Details
                      </span>
                    </div>

                    {/* Quick View Button (appears on hover) */}
                    <button 
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      onClick={(e) => {
                        e.preventDefault()
                        // Quick view functionality
                      }}
                    >
                      <span className="text-purple-900">👁️</span>
                    </button>
                  </div>

                  {/* Content */}
                  <div>
                    {/* Category */}
                    {showCategory && (
                      <p className="text-xs text-purple-400 mb-1">{product.category}</p>
                    )}

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors mb-2">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    {showRating && product.rating && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-sm ${
                                star <= Math.floor(product.rating || 0)
                                  ? 'text-yellow-400'
                                  : 'text-gray-600'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-purple-400">
                          ({product.reviews})
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      {product.discount ? (
                        <>
                          <span className="text-xl font-bold text-gradient">
                            ${getDiscountedPrice(product.price, product.discount).toFixed(2)}
                          </span>
                          <span className="text-sm text-purple-400 line-through">
                            ${product.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-gradient">
                          ${product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <Link href="/products">
              <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105">
                View All Products
              </button>
            </Link>
          </div>

          {/* Bismillah */}
          <div className="text-center mt-8">
            <p className="text-sm text-purple-400">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          </div>
        </div>
      </section>
    )
  }

  // Carousel Layout
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">{title}</h2>
          <p className="text-purple-200">{subtitle}</p>
        </div>

        {/* Horizontal Scroll */}
        <div className="overflow-x-auto pb-6 hide-scrollbar">
          <div className="flex gap-4 min-w-max">
            {displayedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group w-64"
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-3 hover:border-pink-500 transition-all">
                  <div className="aspect-square bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-2"></div>
                  <h3 className="font-semibold text-white group-hover:text-pink-400">{product.name}</h3>
                  <p className="text-pink-400 font-bold mt-1">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Default products data
const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Amethyst Crystal',
    price: 299,
    category: 'Crystals',
    rating: 4.8,
    reviews: 124,
    isNew: true,
    image: 'n1'
  },
  {
    id: '2',
    name: 'Ruby Rough',
    price: 499,
    category: 'Rough Stones',
    rating: 4.9,
    reviews: 89,
    image: 'n2'
  },
  {
    id: '3',
    name: 'Sapphire Polished',
    price: 899,
    category: 'Polished Gems',
    rating: 5.0,
    reviews: 56,
    discount: 10,
    image: 'n3'
  },
  {
    id: '4',
    name: 'Emerald',
    price: 1299,
    category: 'Polished Gems',
    rating: 4.7,
    reviews: 42,
    isNew: true,
    image: 'n4'
  },
  {
    id: '5',
    name: 'Rose Quartz',
    price: 99,
    category: 'Tumbled Stones',
    rating: 4.6,
    reviews: 215,
    image: 'n5'
  },
  {
    id: '6',
    name: 'Citrine Points',
    price: 199,
    category: 'Crystals',
    rating: 4.5,
    reviews: 78,
    discount: 15,
    image: 'n6'
  }
]

// Simple version
export function SimpleFeaturedProducts() {
  const products = [
    { id: '1', name: 'Amethyst', price: 299 },
    { id: '2', name: 'Ruby', price: 499 },
    { id: '3', name: 'Sapphire', price: 899 },
  ]

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(p => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <div className="border rounded p-3 hover:shadow-lg">
              <div className="h-32 bg-gray-200 mb-2"></div>
              <h3 className="font-medium">{p.name}</h3>
              <p className="text-pink-600 font-bold">${p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Hide scrollbar CSS
const styles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

// Add styles to document (only once)
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}