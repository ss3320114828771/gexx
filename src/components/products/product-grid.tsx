'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProductCard from './product-card'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  type?: string
  origin?: string
  image?: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isFeatured?: boolean
  discount?: number
  stock?: number
}

interface ProductGridProps {
  products: Product[]
  layout?: 'grid' | 'list' | 'compact'
  columns?: 2 | 3 | 4 | 5 | 6
  gap?: 'sm' | 'md' | 'lg'
  showRating?: boolean
  showCategory?: boolean
  showAddToCart?: boolean
  loading?: boolean
  emptyMessage?: string
  onAddToCart?: (productId: string) => void
  onQuickView?: (productId: string) => void
  onWishlist?: (productId: string) => void
}

export default function ProductGrid({
  products,
  layout = 'grid',
  columns = 4,
  gap = 'md',
  showRating = true,
  showCategory = true,
  showAddToCart = true,
  loading = false,
  emptyMessage = 'No products found',
  onAddToCart,
  onQuickView,
  onWishlist
}: ProductGridProps) {
  
  const [page, setPage] = useState(1)
  const itemsPerPage = 12

  // Column classes based on columns prop
  const getColumnClasses = () => {
    const baseClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    }
    return baseClasses[columns]
  }

  // Gap classes
  const getGapClasses = () => {
    const gapClasses = {
      sm: 'gap-2 md:gap-3',
      md: 'gap-4 md:gap-6',
      lg: 'gap-6 md:gap-8',
    }
    return gapClasses[gap]
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className={`grid ${getColumnClasses()} ${getGapClasses()}`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div 
            key={`skeleton-${index}`} 
            className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-4 animate-pulse"
          >
            <div className="aspect-square bg-purple-800 rounded-lg mb-4"></div>
            <div className="h-4 bg-purple-800 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-purple-800 rounded w-1/2 mb-3"></div>
            <div className="h-6 bg-purple-800 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    )
  }

  // List layout
  if (layout === 'list') {
    return (
      <div className="space-y-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-4 hover:border-pink-500 transition-all">
              <div className="flex gap-4">
                <Link href={`/products/${product.id}`} className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
                </Link>
                
                <div className="flex-1">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-white hover:text-pink-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {showCategory && product.category && (
                    <p className="text-sm text-purple-400 mt-1">{product.category}</p>
                  )}
                  
                  <p className="text-xl font-bold text-gradient mt-2">
                    ${product.price}
                  </p>
                  
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => onAddToCart?.(product.id)}
                      className="px-4 py-2 bg-pink-600 text-white text-sm rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => onQuickView?.(product.id)}
                      className="px-4 py-2 border border-purple-500 text-purple-300 text-sm rounded-lg hover:bg-purple-800 transition-colors"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500">
            <p className="text-purple-400">{emptyMessage}</p>
          </div>
        )}
      </div>
    )
  }

  // Compact layout
  if (layout === 'compact') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3`}>
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white/5 backdrop-blur-lg rounded-lg border border-purple-500 p-3 hover:border-pink-500 transition-all">
                <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-2"></div>
                <h3 className="text-sm font-medium text-white truncate">{product.name}</h3>
                <p className="text-sm font-bold text-gradient mt-1">${product.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-purple-400">{emptyMessage}</p>
          </div>
        )}
      </div>
    )
  }

  // Default grid layout
  const paginatedProducts = products.slice(0, page * itemsPerPage)
  const hasMore = products.length > paginatedProducts.length

  return (
    <div className="space-y-8">
      {/* Grid */}
      <div className={`grid ${getColumnClasses()} ${getGapClasses()}`}>
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showRating={showRating}
              showCategory={showCategory}
              showAddToCart={showAddToCart}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onWishlist={onWishlist}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500">
            <div className="text-6xl mb-4">💎</div>
            <p className="text-xl text-purple-300 mb-2">No products found</p>
            <p className="text-sm text-purple-400">{emptyMessage}</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-3 border-2 border-pink-500 text-pink-500 rounded-lg font-semibold hover:bg-pink-500 hover:text-white transition-all duration-300"
          >
            Load More Products
          </button>
        </div>
      )}

      {/* Results Count */}
      {products.length > 0 && (
        <div className="text-center text-sm text-purple-400">
          Showing {paginatedProducts.length} of {products.length} products
        </div>
      )}
    </div>
  )
}

// Simple version
export function SimpleProductGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <div className="border rounded-lg p-3 hover:shadow-lg">
            <div className="aspect-square bg-gray-200 rounded mb-2"></div>
            <h3 className="font-medium text-sm">{product.name}</h3>
            <p className="text-pink-600 font-bold mt-1">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

// Featured products grid
export function FeaturedProductGrid({ products }: { products: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.slice(0, 6).map((product) => (
        <div key={product.id} className="relative group">
          <ProductCard
            product={product}
            showRating={true}
            showCategory={true}
            showAddToCart={true}
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 z-10 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
        </div>
      ))}
    </div>
  )
}