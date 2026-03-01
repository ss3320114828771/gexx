'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/button'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  type?: string
  origin?: string
  hardness?: number
  weight?: number
  dimensions?: string
  stock: number
  featured?: boolean
  images?: string[]
  rating?: number
  reviewCount?: number
  specifications?: Record<string, string>
}

interface ProductDetailsProps {
  product: Product
  onAddToCart?: (productId: string, quantity: number) => void
  onBuyNow?: (productId: string, quantity: number) => void
  onWishlist?: (productId: string) => void
}

export default function ProductDetails({
  product,
  onAddToCart,
  onBuyNow,
  onWishlist
}: ProductDetailsProps) {
  
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description')
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    if (!onAddToCart) return
    
    setIsAdding(true)
    await onAddToCart(product.id, quantity)
    setIsAdding(false)
  }

  const handleWishlist = () => {
    if (onWishlist) {
      onWishlist(product.id)
      setIsWishlisted(!isWishlisted)
    }
  }

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(product.id, quantity)
    }
  }

  // Calculate discount percentage
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Stock status
  const stockStatus = product.stock > 10 
    ? { text: 'In Stock', color: 'text-green-400' }
    : product.stock > 0 
      ? { text: `Only ${product.stock} left`, color: 'text-yellow-400' }
      : { text: 'Out of Stock', color: 'text-red-400' }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-500 p-6">
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Left Column - Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-30">💎</span>
            </div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              {product.featured && (
                <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                  Featured
                </span>
              )}
              {discount > 0 && (
                <span className="px-3 py-1 bg-red-600 text-white text-sm rounded-full">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlist}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl hover:bg-pink-600 transition-colors"
              aria-label="Add to wishlist"
            >
              {isWishlisted ? '❤️' : '🤍'}
            </button>
          </div>

          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-pink-500 scale-105' 
                      : 'border-transparent hover:border-purple-500'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
              {product.name}
            </h1>
            
            {/* Category & Origin */}
            <div className="flex flex-wrap gap-2 text-sm">
              {product.category && (
                <Link 
                  href={`/products?category=${product.category.toLowerCase()}`}
                  className="text-purple-400 hover:text-pink-400 transition-colors"
                >
                  {product.category}
                </Link>
              )}
              {product.origin && (
                <>
                  <span className="text-purple-600">•</span>
                  <span className="text-purple-400">{product.origin}</span>
                </>
              )}
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= Math.floor(product.rating || 0)
                          ? 'text-yellow-400'
                          : 'text-gray-600'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {product.reviewCount && (
                  <span className="text-sm text-purple-400">
                    ({product.reviewCount} reviews)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-gradient">
              ${product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-purple-400 line-through">
                  ${product.originalPrice}
                </span>
                <span className="px-2 py-1 bg-green-600 text-white text-sm rounded-full">
                  Save ${product.originalPrice - product.price}
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className={`text-sm ${stockStatus.color}`}>
            {stockStatus.text}
          </div>

          {/* Short Description */}
          <p className="text-purple-300 leading-relaxed">
            {product.description}
          </p>

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-3">
            {product.type && (
              <div className="bg-purple-900/30 p-3 rounded-lg">
                <p className="text-xs text-purple-400">Type</p>
                <p className="text-sm text-white font-medium">{product.type}</p>
              </div>
            )}
            {product.hardness && (
              <div className="bg-purple-900/30 p-3 rounded-lg">
                <p className="text-xs text-purple-400">Hardness</p>
                <p className="text-sm text-white font-medium">{product.hardness} Mohs</p>
              </div>
            )}
            {product.weight && (
              <div className="bg-purple-900/30 p-3 rounded-lg">
                <p className="text-xs text-purple-400">Weight</p>
                <p className="text-sm text-white font-medium">{product.weight} ct</p>
              </div>
            )}
            {product.dimensions && (
              <div className="bg-purple-900/30 p-3 rounded-lg">
                <p className="text-xs text-purple-400">Dimensions</p>
                <p className="text-sm text-white font-medium">{product.dimensions}</p>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-pink-400">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-xl font-bold text-white w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAdding}
              fullWidth
            >
              {isAdding ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding...</span>
                </div>
              ) : (
                'Add to Cart'
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy Now
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-purple-400 space-y-1">
            <p>✓ Free shipping on orders over $100</p>
            <p>✓ 30-day return policy</p>
            <p>✓ Authenticity guaranteed</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        {/* Tab Headers */}
        <div className="flex gap-6 border-b border-purple-800">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 px-1 font-medium transition-colors relative ${
              activeTab === 'description'
                ? 'text-pink-400 border-b-2 border-pink-400'
                : 'text-purple-400 hover:text-purple-300'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 px-1 font-medium transition-colors relative ${
              activeTab === 'specs'
                ? 'text-pink-400 border-b-2 border-pink-400'
                : 'text-purple-400 hover:text-purple-300'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 px-1 font-medium transition-colors relative ${
              activeTab === 'reviews'
                ? 'text-pink-400 border-b-2 border-pink-400'
                : 'text-purple-400 hover:text-purple-300'
            }`}
          >
            Reviews
            {product.reviewCount && (
              <span className="ml-2 text-xs bg-purple-800 px-2 py-0.5 rounded-full">
                {product.reviewCount}
              </span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'description' && (
            <div className="prose prose-invert max-w-none">
              <p className="text-purple-300 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {product.specifications ? (
                Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="bg-purple-900/30 p-3 rounded-lg">
                    <p className="text-xs text-purple-400 capitalize">{key}</p>
                    <p className="text-sm text-white font-medium">{value}</p>
                  </div>
                ))
              ) : (
                <>
                  <SpecItem label="Category" value={product.category} />
                  <SpecItem label="Type" value={product.type || 'Natural'} />
                  <SpecItem label="Origin" value={product.origin || 'Various'} />
                  <SpecItem label="Hardness" value={`${product.hardness || 7} Mohs`} />
                  <SpecItem label="Weight" value={`${product.weight || 0} ct`} />
                  <SpecItem label="Dimensions" value={product.dimensions || 'Various'} />
                </>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-8">
              <p className="text-purple-400">Reviews coming soon</p>
            </div>
          )}
        </div>
      </div>

      {/* Bismillah */}
      <div className="text-center mt-8 pt-4 border-t border-purple-800">
        <p className="text-sm text-purple-400">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>
    </div>
  )
}

// Helper component for spec items
function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-purple-900/30 p-3 rounded-lg">
      <p className="text-xs text-purple-400">{label}</p>
      <p className="text-sm text-white font-medium">{value}</p>
    </div>
  )
}