'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems?: NavItem[]
  showAdmin?: boolean
  adminName?: string
  adminEmail?: string
}

interface NavItem {
  name: string
  path: string
  icon?: string
}

export default function MobileMenu({
  isOpen,
  onClose,
  navItems = defaultNavItems,
  showAdmin = true,
  adminName = 'Hafiz Sajid Syed',
  adminEmail = 'sajid.syed@gmail.com'
}: MobileMenuProps) {
  
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      // Wait for animation to complete before removing from DOM
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
    }
    
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  // Don't render if not open and not animating
  if (!isOpen && !isAnimating) return null

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={`fixed inset-y-0 left-0 w-full max-w-sm bg-gradient-to-b from-purple-900 to-indigo-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="p-4 border-b border-purple-700">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={onClose} className="flex items-center gap-2">
                <span className="text-3xl">💎</span>
                <span className="text-xl font-bold text-gradient">Precious Gems</span>
              </Link>
              
              <button
                onClick={onClose}
                className="p-2 text-purple-300 hover:text-pink-400 transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-pink-600 text-white shadow-lg'
                        : 'text-purple-300 hover:bg-purple-800 hover:text-white'
                    }`}
                  >
                    {item.icon && <span className="text-xl">{item.icon}</span>}
                    <span className="font-medium">{item.name}</span>
                    
                    {/* Active indicator */}
                    {isActive(item.path) && (
                      <span className="ml-auto text-sm">✓</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Admin Info */}
          {showAdmin && (
            <div className="p-4 border-t border-purple-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {adminName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{adminName}</p>
                  <p className="text-xs text-purple-400">{adminEmail}</p>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="px-3 py-2 text-xs bg-purple-800 rounded-lg text-purple-300 hover:bg-purple-700 hover:text-white text-center"
                >
                  Dashboard
                </Link>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="px-3 py-2 text-xs bg-purple-800 rounded-lg text-purple-300 hover:bg-purple-700 hover:text-white text-center"
                >
                  Cart
                </Link>
              </div>
            </div>
          )}

          {/* Bismillah */}
          <div className="p-4 text-center border-t border-purple-700">
            <p className="text-xs text-purple-400">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// Default navigation items
const defaultNavItems: NavItem[] = [
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'Products', path: '/products', icon: '💎' },
  { name: 'About', path: '/about', icon: '📖' },
  { name: 'Contact', path: '/contact', icon: '📞' },
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
]

// Simple version
export function SimpleMobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="absolute top-0 right-0 w-64 h-full bg-purple-900 p-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-white">✕</button>
        
        <nav className="mt-12">
          <Link href="/" className="block py-2 text-white" onClick={onClose}>Home</Link>
          <Link href="/products" className="block py-2 text-white" onClick={onClose}>Products</Link>
          <Link href="/about" className="block py-2 text-white" onClick={onClose}>About</Link>
          <Link href="/contact" className="block py-2 text-white" onClick={onClose}>Contact</Link>
        </nav>
        
        <div className="absolute bottom-4 left-4 text-purple-300 text-sm">
          <p>Hafiz Sajid Syed</p>
          <p className="text-xs">sajid.syed@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

// Bottom sheet style menu
export function BottomSheetMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShow(true)
    } else {
      const timer = setTimeout(() => setShow(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!show) return null

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      <div
        className={`fixed bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900 to-indigo-900 rounded-t-2xl p-6 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="w-12 h-1 bg-purple-500 rounded-full mx-auto mb-4" />
        
        <h3 className="text-xl font-bold text-gradient text-center mb-4">Menu</h3>
        
        <nav className="space-y-2">
          <Link href="/" className="block py-3 text-center text-white hover:bg-purple-800 rounded-lg" onClick={onClose}>
            Home
          </Link>
          <Link href="/products" className="block py-3 text-center text-white hover:bg-purple-800 rounded-lg" onClick={onClose}>
            Products
          </Link>
          <Link href="/about" className="block py-3 text-center text-white hover:bg-purple-800 rounded-lg" onClick={onClose}>
            About
          </Link>
          <Link href="/contact" className="block py-3 text-center text-white hover:bg-purple-800 rounded-lg" onClick={onClose}>
            Contact
          </Link>
        </nav>
        
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-800"
        >
          Close
        </button>
      </div>
    </>
  )
}