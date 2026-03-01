'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category?: string
  image?: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isFeatured?: boolean
  discount?: number
  stock?: number
}

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'horizontal'
  showRating?: boolean
  showCategory?: boolean
  showAddToCart?: boolean
  onAddToCart?: (productId: string) => void
  onQuickView?: (productId: string) => void
  onWishlist?: (productId: string) => void
}

export default function ProductCard({
  product,
  variant = 'default',
  showRating = true,
  showCategory = true,
  showAddToCart = true,
  onAddToCart,
  onQuickView,
  onWishlist
}: ProductCardProps) {
  
  const [isHovered, setIsHovered] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (onAddToCart) {
      onAddToCart(product.id)
      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onQuickView) onQuickView(product.id)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onWishlist) onWishlist(product.id)
  }

  // Calculate discounted price
  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : null

  // Rating stars
  const renderRating = () => {
    if (!product.rating) return null
    
    const stars = []
    const fullStars = Math.floor(product.rating)
    const hasHalfStar = product.rating % 1 >= 0.5
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-yellow-400">★</span>)
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-400">½</span>)
      } else {
        stars.push(<span key={i} className="text-gray-600">★</span>)
      }
    }
    
    return stars
  }

  // Default variant
  if (variant === 'default') {
    return (
      <Link href={`/products/${product.id}`} className="block group">
        <div 
          className="relative bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 overflow-hidden hover:border-pink-500 transition-all duration-300 hover:shadow-2xl hover:scale-105"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {product.isNew && (
              <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
                New
              </span>
            )}
            {product.isFeatured && (
              <span className="px-2 py-1 text-xs bg-purple-500 text-white rounded-full">
                Featured
              </span>
            )}
            {product.discount && (
              <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
            aria-label="Add to wishlist"
          >
            ♥
          </button>

          {/* Image */}
          <div className="relative aspect-square bg-gradient-to-br from-purple-600 to-pink-600">
            {!imageError ? (
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                💎
              </div>
            )}

            {/* Hover Overlay */}
            {isHovered && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-2 transition-opacity">
                <button
                  onClick={handleQuickView}
                  className="px-3 py-1.5 bg-white text-purple-900 rounded-lg text-sm font-medium hover:bg-pink-500 hover:text-white transition-colors"
                >
                  Quick View
                </button>
                {showAddToCart && (
                  <button
                    onClick={handleAddToCart}
                    className="px-3 py-1.5 bg-pink-600 text-white rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors"
                  >
                    {isAdded ? '✓ Added' : 'Add to Cart'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Category */}
            {showCategory && product.category && (
              <p className="text-xs text-purple-400 mb-1">{product.category}</p>
            )}

            {/* Name */}
            <h3 className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors line-clamp-1">
              {product.name}
            </h3>

            {/* Rating */}
            {showRating && product.rating && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {renderRating()}
                </div>
                {product.reviewCount && (
                  <span className="text-xs text-purple-400">
                    ({product.reviewCount})
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-2 mt-2">
              {discountedPrice ? (
                <>
                  <span className="text-xl font-bold text-gradient">
                    ${discountedPrice.toFixed(2)}
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

            {/* Stock Status */}
            {product.stock !== undefined && (
              <p className={`text-xs mt-2 ${
                product.stock > 10 
                  ? 'text-green-400' 
                  : product.stock > 0 
                    ? 'text-yellow-400' 
                    : 'text-red-400'
              }`}>
                {product.stock > 10 
                  ? 'In Stock' 
                  : product.stock > 0 
                    ? `Only ${product.stock} left` 
                    : 'Out of Stock'}
              </p>
            )}
          </div>

          {/* Add to Cart Button (if not shown in hover) */}
          {showAddToCart && !isHovered && (
            <div className="p-4 pt-0">
              <button
                onClick={handleAddToCart}
                className="w-full py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </Link>
    )
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <Link href={`/products/${product.id}`} className="block group">
        <div className="bg-white/5 backdrop-blur-lg rounded-lg border border-purple-500 p-3 hover:border-pink-500 transition-all">
          <div className="flex gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white group-hover:text-pink-400 truncate">
                {product.name}
              </h3>
              <p className="text-xs text-purple-400">{product.category}</p>
              <p className="text-sm font-bold text-gradient mt-1">
                ${product.price}
              </p>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Horizontal variant
  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-4 hover:border-pink-500 transition-all">
        <div className="flex gap-4">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex-shrink-0" />
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-pink-400">
              {product.name}
            </h3>
            
            {showCategory && product.category && (
              <p className="text-sm text-purple-400">{product.category}</p>
            )}
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl font-bold text-gradient">
                ${product.price}
              </span>
              
              {showAddToCart && (
                <button
                  onClick={handleAddToCart}
                  className="px-3 py-1 bg-pink-600 text-white rounded-lg text-sm hover:bg-pink-700"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Simple version
export function SimpleProductCard({ product }: { product: { id: string; name: string; price: number } }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
        <div className="h-40 bg-gray-200 rounded mb-3"></div>
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-pink-600 font-bold mt-1">${product.price}</p>
        <button className="mt-2 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
          Add to Cart
        </button>
      </div>
    </Link>
  )
}