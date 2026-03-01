'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from './product-card'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  image?: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  discount?: number
}

interface RelatedProductsProps {
  currentProductId: string
  category?: string
  tags?: string[]
  products?: Product[]
  title?: string
  limit?: number
  showRating?: boolean
  showAddToCart?: boolean
  layout?: 'grid' | 'carousel'
}

export default function RelatedProducts({
  currentProductId,
  category,
  tags = [],
  products: initialProducts,
  title = 'You May Also Like',
  limit = 4,
  showRating = true,
  showAddToCart = true,
  layout = 'grid'
}: RelatedProductsProps) {
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Load related products
  useEffect(() => {
    const loadRelatedProducts = async () => {
      setLoading(true)
      
      // If products are provided directly, use them
      if (initialProducts) {
        setProducts(initialProducts.filter(p => p.id !== currentProductId).slice(0, limit))
        setLoading(false)
        return
      }

      // Simulate API call - in real app, fetch from API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock related products
      const mockProducts: Product[] = [
        {
          id: '2',
          name: 'Ruby Rough',
          price: 499,
          category: 'Rough Stones',
          rating: 4.9,
          reviewCount: 89,
          isNew: false
        },
        {
          id: '3',
          name: 'Sapphire Polished',
          price: 899,
          originalPrice: 999,
          category: 'Polished Gems',
          rating: 5.0,
          reviewCount: 56,
          discount: 10
        },
        {
          id: '4',
          name: 'Emerald',
          price: 1299,
          category: 'Polished Gems',
          rating: 4.7,
          reviewCount: 42,
          isNew: true
        },
        {
          id: '5',
          name: 'Rose Quartz',
          price: 99,
          category: 'Tumbled Stones',
          rating: 4.6,
          reviewCount: 215
        },
        {
          id: '6',
          name: 'Citrine Points',
          price: 199,
          category: 'Crystals',
          rating: 4.5,
          reviewCount: 78,
          discount: 15
        },
        {
          id: '7',
          name: 'Lapis Lazuli',
          price: 159,
          category: 'Polished Gems',
          rating: 4.8,
          reviewCount: 34
        }
      ]
      
      // Filter by category if provided
      let filtered = mockProducts.filter(p => p.id !== currentProductId)
      if (category) {
        filtered = filtered.filter(p => p.category === category)
      }
      
      setProducts(filtered.slice(0, limit))
      setLoading(false)
    }

    loadRelatedProducts()
  }, [currentProductId, category, initialProducts, limit])

  // Loading skeleton
  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gradient mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: limit }).map((_, index) => (
            <div 
              key={`skeleton-${index}`}
              className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-4 animate-pulse"
            >
              <div className="aspect-square bg-purple-800 rounded-lg mb-3"></div>
              <div className="h-4 bg-purple-800 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-purple-800 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-purple-800 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Don't render if no products
  if (products.length === 0) {
    return null
  }

  // Carousel layout
  if (layout === 'carousel') {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gradient mb-6">{title}</h2>
        
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-x-auto pb-6 hide-scrollbar">
            <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="w-64 flex-shrink-0 transform transition-transform duration-300 hover:scale-105"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-3 hover:border-pink-500 transition-all h-full">
                      <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-3"></div>
                      <h3 className="font-semibold text-white hover:text-pink-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-purple-400 mb-2">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gradient">
                          ${product.price}
                        </span>
                        {hoveredIndex === index && (
                          <span className="text-xs text-pink-400 animate-pulse">
                            View →
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Buttons (optional) */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
            ←
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
            →
          </button>
        </div>
      </div>
    )
  }

  // Grid layout (default)
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gradient mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="compact"
            showRating={showRating}
            showCategory={true}
            showAddToCart={showAddToCart}
          />
        ))}
      </div>

      {/* View All Link */}
      {category && (
        <div className="text-center mt-6">
          <Link
            href={`/products?category=${category.toLowerCase()}`}
            className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
          >
            View all {category} →
          </Link>
        </div>
      )}
    </div>
  )
}

// Simple version
export function SimpleRelatedProducts({ currentProductId }: { currentProductId: string }) {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    // Mock data
    setProducts([
      { id: '2', name: 'Ruby', price: 499 },
      { id: '3', name: 'Sapphire', price: 899 },
      { id: '4', name: 'Emerald', price: 1299 },
    ])
  }, [])

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Related Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {products.map(p => (
          <Link key={p.id} href={`/products/${p.id}`}>
            <div className="border rounded p-2 hover:shadow">
              <div className="h-24 bg-gray-200 mb-2"></div>
              <p className="font-medium text-sm">{p.name}</p>
              <p className="text-pink-600 font-bold">${p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Add hide-scrollbar styles
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