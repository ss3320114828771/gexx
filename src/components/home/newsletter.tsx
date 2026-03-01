'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NewsletterProps {
  title?: string
  subtitle?: string
  buttonText?: string
  placeholder?: string
  successMessage?: string
  errorMessage?: string
  backgroundColor?: string
  showBenefits?: boolean
}

export default function Newsletter({
  title = "Join Our Gemstone Community",
  subtitle = "Subscribe to receive updates about new arrivals, special offers, and gemstone knowledge",
  buttonText = "Subscribe",
  placeholder = "Your email address",
  successMessage = "Thank you for subscribing! Check your email for confirmation.",
  errorMessage = "Something went wrong. Please try again.",
  backgroundColor = "bg-gradient-to-r from-purple-600/20 to-pink-600/20",
  showBenefits = true
}: NewsletterProps) {
  
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email
    if (!email.trim() || !isValidEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }
    
    setStatus('loading')
    setMessage('')
    
    // Simulate API call
    try {
      // In real app, replace with actual API call
      // await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setStatus('success')
      setMessage(successMessage)
      setEmail('')
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
      
    } catch {
      setStatus('error')
      setMessage(errorMessage)
    }
  }

  // Email validation helper
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (
    <section className={`py-16 ${backgroundColor} rounded-3xl`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Icon */}
          <div className="mb-6">
            <span className="text-6xl animate-pulse">💎</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-purple-200 mb-8">
            {subtitle}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-lg border-2 rounded-lg text-white placeholder-purple-300 focus:outline-none transition-colors ${
                    status === 'error' 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-purple-500 focus:border-pink-500'
                  }`}
                />
                <span className="absolute left-4 top-3.5 text-purple-300 text-xl">✉️</span>
              </div>
              
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {status === 'loading' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  buttonText
                )}
              </button>
            </div>

            {/* Message */}
            {message && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                status === 'success' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500' 
                  : status === 'error'
                    ? 'bg-red-500/20 text-red-400 border border-red-500'
                    : ''
              }`}>
                {message}
              </div>
            )}
          </form>

          {/* Benefits List */}
          {showBenefits && (
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              <BenefitItem icon="✨" text="New Arrivals" />
              <BenefitItem icon="💰" text="Special Offers" />
              <BenefitItem icon="📚" text="Gemstone Guide" />
              <BenefitItem icon="🎁" text="Exclusive Deals" />
            </div>
          )}

          {/* Privacy Note */}
          <p className="text-xs text-purple-400 mt-6">
            By subscribing, you agree to our{' '}
            <Link href="/privacy" className="text-pink-400 hover:text-pink-300">
              Privacy Policy
            </Link>{' '}
            and consent to receive updates from our company.
          </p>

          {/* Bismillah */}
          <p className="text-sm text-purple-500 mt-6">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>
      </div>
    </section>
  )
}

// Benefit item component
function BenefitItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="text-2xl">{icon}</span>
      <span className="text-sm text-purple-300">{text}</span>
    </div>
  )
}

// Simple version
export function SimpleNewsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setTimeout(() => setSubscribed(false), 3000)
    setEmail('')
  }

  return (
    <div className="bg-purple-900 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-2">Newsletter</h3>
      <p className="text-purple-300 mb-4">Get updates on new gems</p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full p-2 rounded bg-purple-800 text-white border border-purple-700"
          required
        />
        <button
          type="submit"
          className="w-full bg-pink-600 text-white p-2 rounded hover:bg-pink-700"
        >
          {subscribed ? 'Subscribed!' : 'Subscribe'}
        </button>
      </form>
      
      {subscribed && (
        <p className="text-green-400 text-sm mt-2">Thanks for subscribing!</p>
      )}
    </div>
  )
}

// Compact version for sidebar
export function CompactNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-4">
      <h4 className="font-semibold text-pink-400 mb-2">Join Our Newsletter</h4>
      <p className="text-xs text-purple-300 mb-3">Get 10% off your first order</p>
      
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded text-white text-sm"
          required
        />
        <button
          type="submit"
          className="w-full px-3 py-2 bg-pink-600 text-white text-sm rounded hover:bg-pink-700"
        >
          {status === 'success' ? '✓ Subscribed' : 'Subscribe'}
        </button>
      </form>
    </div>
  )
}

// Popup version
export function PopupNewsletter() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')

  // Auto-open after 5 seconds (optional)
  // useEffect(() => {
  //   const timer = setTimeout(() => setIsOpen(true), 5000)
  //   return () => clearTimeout(timer)
  // }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={() => setIsOpen(false)}></div>
      
      {/* Popup */}
      <div className="relative bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 max-w-md w-full border-2 border-purple-500">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-purple-400 hover:text-pink-400"
        >
          ✕
        </button>
        
        <div className="text-center">
          <span className="text-5xl mb-4 block">💎</span>
          <h3 className="text-2xl font-bold text-gradient mb-2">Never Miss a Gem!</h3>
          <p className="text-purple-300 mb-6">
            Subscribe for exclusive offers and new arrivals
          </p>
          
          <form onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full px-4 py-3 bg-purple-900/30 border border-purple-500 rounded-lg text-white mb-3"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-xs text-purple-400 mt-3">
            No spam, unsubscribe anytime
          </p>
        </div>
      </div>
    </div>
  )
}