'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/button'

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: string
  overlay?: boolean
  alignment?: 'left' | 'center' | 'right'
  showSearch?: boolean
  showStats?: boolean
}

export default function Hero({
  title = "Discover Nature's Finest Precious Stones",
  subtitle = "Explore our collection of authentic gems from around the world, ethically sourced and carefully selected for their beauty and quality",
  ctaText = "Shop Now",
  ctaLink = "/products",
  secondaryCtaText = "Learn More",
  secondaryCtaLink = "/about",
  backgroundImage,
  overlay = true,
  alignment = 'center',
  showSearch = true,
  showStats = true
}: HeroProps) {
  
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Animation on mount
    setIsVisible(true)
  }, [])

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  // Alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  // Background style
  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {}

  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        {/* Animated particles/glow effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
          <div className="absolute top-40 right-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-4000"></div>
        </div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      {/* Optional image overlay */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={backgroundStyle}
        >
          {overlay && <div className="absolute inset-0 bg-black/50"></div>}
        </div>
      )}

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 z-10">
        <div className={`max-w-4xl mx-auto ${alignmentClasses[alignment]}`}>
          {/* Bismillah */}
          <div 
            className={`mb-6 transform transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-2xl md:text-3xl text-gradient font-arabic">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>

          {/* Title */}
          <h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-6 transform transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-lg md:text-xl text-purple-200 mb-8 max-w-2xl mx-auto transform transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {subtitle}
          </p>

          {/* Search Bar */}
          {showSearch && (
            <form 
              onSubmit={handleSearch}
              className={`max-w-xl mx-auto mb-8 transform transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for gems..."
                  className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-lg border-2 border-purple-500 rounded-full text-white placeholder-purple-300 focus:border-pink-500 focus:outline-none transition-colors"
                />
                <span className="absolute left-5 top-4 text-purple-300 text-xl">🔍</span>
                <button
                  type="submit"
                  className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-purple-500 hover:to-pink-500 transition-all"
                >
                  Search
                </button>
              </div>
            </form>
          )}

          {/* CTA Buttons - Removed size prop */}
          <div 
            className={`flex flex-wrap gap-4 justify-center transform transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link href={ctaLink}>
              <Button variant="primary">
                {ctaText}
              </Button>
            </Link>
            <Link href={secondaryCtaLink}>
              <Button variant="outline">
                {secondaryCtaText}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          {showStats && (
            <div 
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transform transition-all duration-1000 delay-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <StatItem number="500+" label="Products" />
              <StatItem number="50+" label="Origins" />
              <StatItem number="30+" label="Years" />
              <StatItem number="10k+" label="Customers" />
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

// Stat item component
function StatItem({ number, label }: { number: string; label: string }) {
  const [count, setCount] = useState(0)
  const numericValue = parseInt(number.replace(/[^0-9]/g, ''))

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepTime = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const currentCount = Math.floor(numericValue * progress)
      setCount(currentCount)

      if (currentStep >= steps) {
        setCount(numericValue)
        clearInterval(timer)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [numericValue])

  const displayNumber = number.includes('+') ? `${count}+` : count.toString()

  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-gradient">{displayNumber}</div>
      <div className="text-sm text-purple-300 mt-1">{label}</div>
    </div>
  )
}

// Simple version
export function SimpleHero() {
  return (
    <div className="bg-gradient-to-r from-purple-900 to-pink-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-2xl mb-4">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Precious Stones & Gems</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Discover nature's finest creations</p>
        <div className="flex gap-4 justify-center">
          <Link href="/products" className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700">
            Shop Now
          </Link>
          <Link href="/about" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-purple-900">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}

// Add animation styles
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`

// Add styles to document (only once)
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  document.head.appendChild(styleElement)
}