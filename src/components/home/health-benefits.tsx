'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Benefit {
  id: string
  title: string
  description: string
  icon: string
  stone: string
  color: string
  details?: string[]
}

interface HealthBenefitsProps {
  title?: string
  subtitle?: string
  benefits?: Benefit[]
  layout?: 'grid' | 'list'
  showDetails?: boolean
}

export default function HealthBenefits({
  title = "Healing Properties & Health Benefits",
  subtitle = "Discover the ancient wisdom of crystal healing and their positive effects on mind, body, and spirit",
  benefits = defaultBenefits,
  layout = 'grid',
  showDetails = true
}: HealthBenefitsProps) {
  
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null)
  const [selectedStone, setSelectedStone] = useState<string | null>(null)

  // Toggle expanded details
  const toggleExpand = (id: string) => {
    setExpandedBenefit(expandedBenefit === id ? null : id)
  }

  // Grid Layout
  if (layout === 'grid') {
    return (
      <section className="py-16 bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              {title}
            </h2>
            <p className="text-lg text-purple-200 max-w-3xl mx-auto">
              {subtitle}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4"></div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="group relative bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6 hover:border-pink-500 transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => toggleExpand(benefit.id)}
                onMouseEnter={() => setSelectedStone(benefit.id)}
                onMouseLeave={() => setSelectedStone(null)}
              >
                {/* Background glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>

                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`text-5xl transform group-hover:scale-110 transition-transform duration-300 ${
                    selectedStone === benefit.id ? 'animate-pulse' : ''
                  }`}>
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                      {benefit.stone}
                    </h3>
                    <p className="text-sm text-purple-400">{benefit.title}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-purple-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>

                {/* Expandable Details */}
                {showDetails && expandedBenefit === benefit.id && benefit.details && (
                  <div className="mt-4 pt-4 border-t border-purple-800">
                    <ul className="space-y-2">
                      {benefit.details.map((detail, index) => (
                        <li key={index} className="text-sm text-purple-300 flex items-start gap-2">
                          <span className="text-pink-400 mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Expand indicator */}
                <div className="absolute bottom-4 right-4 text-purple-400 group-hover:text-pink-400 transition-colors">
                  {expandedBenefit === benefit.id ? '−' : '+'}
                </div>
              </div>
            ))}
          </div>

          {/* Scientific Note */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-white/5 backdrop-blur-lg rounded-lg px-6 py-3 border border-purple-500">
              <p className="text-sm text-purple-300">
                <span className="text-pink-400 font-semibold">Note:</span> These benefits are based on traditional crystal healing practices and personal experiences. Results may vary.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // List Layout
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gradient mb-4">{title}</h2>
          <p className="text-purple-200">{subtitle}</p>
        </div>

        {/* Benefits List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white/5 backdrop-blur-lg rounded-lg border border-purple-500 p-4 hover:border-pink-500 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{benefit.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{benefit.stone}</h3>
                  <p className="text-sm text-purple-300">{benefit.title}</p>
                </div>
                <button
                  onClick={() => toggleExpand(benefit.id)}
                  className="text-pink-400 hover:text-pink-300"
                >
                  {expandedBenefit === benefit.id ? 'Show Less' : 'Read More'}
                </button>
              </div>
              
              {expandedBenefit === benefit.id && (
                <div className="mt-3 pt-3 border-t border-purple-800">
                  <p className="text-sm text-purple-300">{benefit.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Default benefits data
const defaultBenefits: Benefit[] = [
  {
    id: '1',
    title: 'Calmness & Clarity',
    description: 'Amethyst promotes calmness, mental clarity, and spiritual awareness. It helps reduce stress, anxiety, and insomnia while enhancing meditation practices.',
    icon: '💜',
    stone: 'Amethyst',
    color: 'from-purple-500 to-pink-500',
    details: [
      'Helps with stress and anxiety',
      'Promotes restful sleep',
      'Enhances spiritual awareness',
      'Clears negative thoughts'
    ]
  },
  {
    id: '2',
    title: 'Love & Emotional Healing',
    description: 'Rose Quartz, the stone of unconditional love, opens the heart to all forms of love: self-love, family love, romantic love, and universal love.',
    icon: '❤️',
    stone: 'Rose Quartz',
    color: 'from-pink-500 to-red-500',
    details: [
      'Opens heart chakra',
      'Promotes self-love',
      'Heals emotional wounds',
      'Attracts new love'
    ]
  },
  {
    id: '3',
    title: 'Energy & Vitality',
    description: 'Citrine boosts energy, vitality, and manifestation. It attracts abundance, success, and positivity while cleansing negative energy.',
    icon: '💛',
    stone: 'Citrine',
    color: 'from-yellow-500 to-orange-500',
    details: [
      'Increases energy levels',
      'Attracts abundance',
      'Boosts creativity',
      'Promotes optimism'
    ]
  },
  {
    id: '4',
    title: 'Wisdom & Truth',
    description: 'Lapis Lazuli enhances mental clarity, wisdom, and truth. It strengthens the ability to communicate clearly and express thoughts effectively.',
    icon: '💙',
    stone: 'Lapis Lazuli',
    color: 'from-blue-500 to-indigo-500',
    details: [
      'Enhances wisdom',
      'Improves communication',
      'Strengthens intuition',
      'Reveals inner truth'
    ]
  },
  {
    id: '5',
    title: 'Balance & Harmony',
    description: 'Jade promotes emotional balance, harmony, and good fortune. It is a protective stone that brings stability and peace to the wearer.',
    icon: '💚',
    stone: 'Jade',
    color: 'from-green-500 to-emerald-500',
    details: [
      'Brings emotional balance',
      'Attracts good fortune',
      'Provides protection',
      'Promotes harmony'
    ]
  },
  {
    id: '6',
    title: 'Master Healer',
    description: 'Clear Quartz is known as the master healer. It amplifies energy and intentions, balances all chakras, and enhances spiritual growth.',
    icon: '🤍',
    stone: 'Clear Quartz',
    color: 'from-gray-300 to-white',
    details: [
      'Amplifies intentions',
      'Balances all chakras',
      'Enhances meditation',
      'Clears energy blocks'
    ]
  }
]

// Simple version
export function SimpleHealthBenefits() {
  const benefits = [
    { stone: 'Amethyst', benefit: 'Calmness & Clarity', icon: '💜' },
    { stone: 'Rose Quartz', benefit: 'Love & Healing', icon: '❤️' },
    { stone: 'Citrine', benefit: 'Energy & Vitality', icon: '💛' },
  ]

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Health Benefits</h2>
      <div className="space-y-3">
        {benefits.map((b, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <span className="text-2xl">{b.icon}</span>
            <div>
              <p className="font-medium">{b.stone}</p>
              <p className="text-sm text-gray-600">{b.benefit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Chakra alignment component
export function ChakraBenefits() {
  const chakras = [
    { name: 'Root', color: 'red', stone: 'Red Jasper', icon: '🔴' },
    { name: 'Sacral', color: 'orange', stone: 'Carnelian', icon: '🟠' },
    { name: 'Solar Plexus', color: 'yellow', stone: 'Citrine', icon: '🟡' },
    { name: 'Heart', color: 'green', stone: 'Rose Quartz', icon: '💚' },
    { name: 'Throat', color: 'blue', stone: 'Lapis Lazuli', icon: '🔵' },
    { name: 'Third Eye', color: 'indigo', stone: 'Amethyst', icon: '🟣' },
    { name: 'Crown', color: 'violet', stone: 'Clear Quartz', icon: '⚪' },
  ]

  return (
    <div className="p-4 bg-gradient-to-b from-purple-900/20 rounded-xl">
      <h3 className="text-xl font-bold text-gradient mb-4">Chakra Healing Stones</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {chakras.map((chakra, i) => (
          <div key={i} className="bg-white/5 p-3 rounded-lg border border-purple-500 text-center">
            <div className="text-2xl mb-1">{chakra.icon}</div>
            <p className="text-xs text-purple-400">{chakra.name}</p>
            <p className="text-sm text-white font-medium">{chakra.stone}</p>
          </div>
        ))}
      </div>
    </div>
  )
}