'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  productCount: number
  image?: string
  color?: string
}

interface CategoriesProps {
  title?: string
  subtitle?: string
  categories?: Category[]
  layout?: 'grid' | 'carousel'
  showCount?: boolean
  limit?: number
}

export default function Categories({
  title = "Shop by Category",
  subtitle = "Browse our collection by category",
  categories = defaultCategories,
  layout = 'grid',
  showCount = true,
  limit = 6
}: CategoriesProps) {
  
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  
  // Limit the number of categories shown
  const displayedCategories = categories.slice(0, limit)

  // Grid Layout
  if (layout === 'grid') {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              {title}
            </h2>
            <p className="text-lg text-purple-200">
              {subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4"></div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCategories.map((category) => (
              <Link 
                key={category.id} 
                href={`/products?category=${category.slug}`}
                className="group"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="relative bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6 hover:border-pink-500 transition-all duration-300 hover:scale-105 overflow-hidden">
                  
                  {/* Background Icon */}
                  <div className="absolute right-0 bottom-0 text-8xl opacity-5 group-hover:opacity-10 transition-opacity">
                    {category.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 ${
                      hoveredCategory === category.id ? 'animate-bounce' : ''
                    }`}>
                      {category.icon}
                    </div>
                    
                    {/* Name */}
                    <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors mb-2">
                      {category.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-purple-300 mb-3">
                      {category.description}
                    </p>
                    
                    {/* Product Count & Link */}
                    <div className="flex items-center justify-between">
                      {showCount && (
                        <span className="text-xs text-purple-400">
                          {category.productCount} Products
                        </span>
                      )}
                      <span className="text-sm text-pink-400 group-hover:translate-x-2 transition-transform">
                        Shop Now →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-10">
            <Link href="/products">
              <button className="px-6 py-3 border-2 border-pink-500 text-pink-500 rounded-lg font-semibold hover:bg-pink-500 hover:text-white transition-all duration-300">
                View All Categories
              </button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // Carousel Layout (simplified horizontal scroll)
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            {title}
          </h2>
          <p className="text-lg text-purple-200">
            {subtitle}
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto pb-6 hide-scrollbar">
          <div className="flex gap-4 min-w-max">
            {displayedCategories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group w-64"
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-4 hover:border-pink-500 transition-all hover:scale-105">
                  <div className="text-4xl mb-3 text-center">{category.icon}</div>
                  <h3 className="text-lg font-bold text-white text-center group-hover:text-pink-400">
                    {category.name}
                  </h3>
                  {showCount && (
                    <p className="text-xs text-purple-400 text-center mt-1">
                      {category.productCount} items
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Default categories data
const defaultCategories: Category[] = [
  {
    id: '1',
    name: 'Crystals',
    slug: 'crystals',
    icon: '💎',
    description: 'Natural crystal formations and points',
    productCount: 45,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '2',
    name: 'Rough Stones',
    slug: 'rough',
    icon: '🪨',
    description: 'Uncut natural stones in raw form',
    productCount: 32,
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: '3',
    name: 'Polished Gems',
    slug: 'polished',
    icon: '✨',
    description: 'Cut and polished precious gems',
    productCount: 28,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '4',
    name: 'Tumbled Stones',
    slug: 'tumbled',
    icon: '⚪',
    description: 'Smooth polished stones for healing',
    productCount: 56,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: '5',
    name: 'Fossils',
    slug: 'fossils',
    icon: '🦴',
    description: 'Ancient fossils and specimens',
    productCount: 15,
    color: 'from-stone-500 to-brown-500'
  },
  {
    id: '6',
    name: 'Jewelry',
    slug: 'jewelry',
    icon: '💍',
    description: 'Handcrafted gemstone jewelry',
    productCount: 23,
    color: 'from-rose-500 to-red-500'
  },
  {
    id: '7',
    name: 'Minerals',
    slug: 'minerals',
    icon: '🔮',
    description: 'Rare mineral specimens',
    productCount: 19,
    color: 'from-teal-500 to-cyan-500'
  },
  {
    id: '8',
    name: 'Carvings',
    slug: 'carvings',
    icon: '🗿',
    description: 'Artistically carved gemstones',
    productCount: 12,
    color: 'from-indigo-500 to-purple-500'
  }
]

// Simple version
export function SimpleCategories() {
  const categories = [
    { name: 'Crystals', icon: '💎', slug: 'crystals' },
    { name: 'Rough', icon: '🪨', slug: 'rough' },
    { name: 'Polished', icon: '✨', slug: 'polished' },
    { name: 'Tumbled', icon: '⚪', slug: 'tumbled' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((cat, i) => (
        <Link key={i} href={`/products?category=${cat.slug}`}>
          <div className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-700">
            <div className="text-3xl mb-2">{cat.icon}</div>
            <h3 className="text-white">{cat.name}</h3>
          </div>
        </Link>
      ))}
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