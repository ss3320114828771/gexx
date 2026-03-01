'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  color: string
  trend?: {
    value: number
    isPositive: boolean
  }
  link?: string
  delay?: number
}

interface StatsCardsProps {
  cards?: StatCardProps[]
  loading?: boolean
}

export default function StatsCards({ cards = defaultCards, loading = false }: StatsCardsProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animation on mount
    setIsVisible(true)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6 animate-pulse">
            <div className="h-4 bg-purple-800 rounded w-24 mb-4"></div>
            <div className="h-8 bg-purple-800 rounded w-32 mb-2"></div>
            <div className="h-3 bg-purple-800 rounded w-20"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <StatCard 
          key={index}
          {...card}
          delay={index * 100}
          isVisible={isVisible}
        />
      ))}
    </div>
  )
}

// Individual Stat Card Component
function StatCard({ 
  title, 
  value, 
  icon, 
  color, 
  trend, 
  link,
  delay = 0,
  isVisible = true
}: StatCardProps & { delay?: number; isVisible?: boolean }) {
  
  const [count, setCount] = useState(0)
  const numericValue = typeof value === 'number' ? value : parseFloat(value.toString().replace(/[^0-9.-]+/g, '')) || 0
  const isCurrency = typeof value === 'string' && value.includes('$')

  // Animate count on mount
  useEffect(() => {
    if (isVisible && numericValue > 0) {
      const duration = 1500 // 1.5 seconds
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
    } else {
      setCount(numericValue)
    }
  }, [isVisible, numericValue])

  // Format the displayed value
  const displayValue = () => {
    if (typeof value === 'string' && !isCurrency) {
      return value
    }
    
    if (isCurrency) {
      return `$${count.toLocaleString()}`
    }
    
    return count.toLocaleString()
  }

  const cardContent = (
    <div 
      className={`bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6 hover:border-pink-500 transition-all duration-500 transform hover:scale-105 hover:shadow-xl ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`text-3xl ${color}`}>{icon}</div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
            trend.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-sm text-purple-400 mb-1">{title}</p>
        <p className="text-2xl font-bold text-white mb-2">{displayValue()}</p>
        
        {/* Progress Bar (optional - for stock levels etc) */}
        {title.toLowerCase().includes('stock') && (
          <div className="w-full h-1 bg-purple-900/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
              style={{ width: `${Math.min((count / 500) * 100, 100)}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-purple-500/0 hover:from-pink-500/10 hover:to-purple-500/10 rounded-xl transition-all duration-300 pointer-events-none"></div>
    </div>
  )

  // Wrap with Link if link is provided
  if (link) {
    return (
      <Link href={link} className="block relative">
        {cardContent}
      </Link>
    )
  }

  return <div className="relative">{cardContent}</div>
}

// Default cards data
const defaultCards: StatCardProps[] = [
  {
    title: 'Total Orders',
    value: 1256,
    icon: '📦',
    color: 'text-blue-400',
    trend: {
      value: 12,
      isPositive: true
    },
    link: '/dashboard/orders'
  },
  {
    title: 'Total Revenue',
    value: '$45,890',
    icon: '💰',
    color: 'text-green-400',
    trend: {
      value: 8,
      isPositive: true
    },
    link: '/dashboard/revenue'
  },
  {
    title: 'Total Products',
    value: 234,
    icon: '💎',
    color: 'text-purple-400',
    trend: {
      value: 5,
      isPositive: true
    },
    link: '/dashboard/products'
  },
  {
    title: 'Total Customers',
    value: 892,
    icon: '👥',
    color: 'text-pink-400',
    trend: {
      value: 15,
      isPositive: true
    },
    link: '/dashboard/customers'
  }
]

// Small variant for compact display
export function SmallStatsCards({ cards = defaultCards }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card, index) => (
        <div key={index} className="bg-white/5 backdrop-blur-lg rounded-lg border border-purple-500 p-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{card.icon}</span>
            <div>
              <p className="text-xs text-purple-400">{card.title}</p>
              <p className="text-sm font-bold text-white">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Minimal variant
export function MinimalStatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <div className="bg-purple-900/30 p-3 rounded text-center">
        <p className="text-2xl font-bold text-white">156</p>
        <p className="text-xs text-purple-400">Orders</p>
      </div>
      <div className="bg-purple-900/30 p-3 rounded text-center">
        <p className="text-2xl font-bold text-white">$45k</p>
        <p className="text-xs text-purple-400">Revenue</p>
      </div>
      <div className="bg-purple-900/30 p-3 rounded text-center">
        <p className="text-2xl font-bold text-white">234</p>
        <p className="text-xs text-purple-400">Products</p>
      </div>
      <div className="bg-purple-900/30 p-3 rounded text-center">
        <p className="text-2xl font-bold text-white">892</p>
        <p className="text-xs text-purple-400">Customers</p>
      </div>
    </div>
  )
}