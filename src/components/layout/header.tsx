'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  showBismillah?: boolean
  showAdminInfo?: boolean
  transparent?: boolean
  sticky?: boolean
}

export default function Header({
  showBismillah = true,
  showAdminInfo = true,
  transparent = false,
  sticky = true
}: HeaderProps) {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Load cart count (in real app, from context/state)
  useEffect(() => {
    // Mock cart count
    setCartCount(3)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Products', path: '/products', icon: '💎' },
    { name: 'About', path: '/about', icon: '📖' },
    { name: 'Contact', path: '/contact', icon: '📞' },
  ]

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/')
  }

  return (
    <header 
      className={`w-full z-50 transition-all duration-300 ${
        sticky ? 'fixed top-0' : 'relative'
      } ${
        isScrolled || !transparent
          ? 'bg-gradient-to-r from-purple-900 via-pink-800 to-indigo-900 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        
        {/* Bismillah */}
        {showBismillah && (
          <div className="text-center py-2 border-b border-purple-800/50">
            <p className="text-sm md:text-base text-gradient font-arabic">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        )}

        {/* Main Header */}
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl transform group-hover:scale-110 transition-transform">
              💎
            </span>
            <span className="text-lg md:text-xl font-bold text-gradient hidden sm:block">
              Precious Gems
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'bg-pink-600 text-white shadow-lg'
                    : 'text-purple-200 hover:bg-purple-800 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            
            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 text-purple-200 hover:text-white transition-colors">
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-600 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Info (Desktop) */}
            {showAdminInfo && (
              <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-purple-700">
                <div className="text-right">
                  <p className="text-xs text-purple-300">Hafiz Sajid Syed</p>
                  <p className="text-xs text-pink-400">Administrator</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  H
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-purple-200 hover:bg-purple-800 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-800">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
                    isActive(item.path)
                      ? 'bg-pink-600 text-white'
                      : 'text-purple-300 hover:bg-purple-800 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
              
              {/* Admin Info (Mobile) */}
              {showAdminInfo && (
                <div className="px-4 py-3 mt-2 border-t border-purple-800 pt-4">
                  <p className="text-sm text-white">Hafiz Sajid Syed</p>
                  <p className="text-xs text-purple-400">sajid.syed@gmail.com</p>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Progress Bar (optional) */}
      {sticky && <ScrollProgress />}
    </header>
  )
}

// Scroll Progress Indicator
function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-900">
      <div 
        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

// Simple version
export function SimpleHeader() {
  return (
    <header className="bg-purple-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          💎 Precious Gems
        </Link>
        
        <nav className="flex gap-4">
          <Link href="/" className="hover:text-pink-400">Home</Link>
          <Link href="/products" className="hover:text-pink-400">Products</Link>
          <Link href="/about" className="hover:text-pink-400">About</Link>
          <Link href="/contact" className="hover:text-pink-400">Contact</Link>
        </nav>
        
        <Link href="/cart" className="relative">
          🛒 <span className="absolute -top-2 -right-2 bg-pink-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
        </Link>
      </div>
    </header>
  )
}

// Transparent version for homepage
export function TransparentHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-purple-900 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            💎
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-white hover:text-pink-400">Home</Link>
            <Link href="/products" className="text-white hover:text-pink-400">Products</Link>
            <Link href="/about" className="text-white hover:text-pink-400">About</Link>
          </nav>
          
          <div className="flex gap-4">
            <Link href="/cart" className="text-white">🛒</Link>
            <button className="md:hidden text-white">☰</button>
          </div>
        </div>
      </div>
    </header>
  )
}