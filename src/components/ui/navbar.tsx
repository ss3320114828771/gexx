'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Cart', path: '/cart' },
    { name: 'Dashboard', path: '/dashboard' }
  ]

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-pink-800 to-indigo-900 shadow-2xl">
      <div className="container mx-auto px-4">
        
        {/* Bismillah - Always visible */}
        <div className="text-center py-2">
          <p className="text-lg md:text-2xl text-gradient font-arabic">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center space-x-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110 shadow-lg border-2 border-white/20"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-center py-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
          >
            {isMenuOpen ? 'Close Menu ✕' : 'Menu ☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block text-center py-2 px-4 my-1 rounded-lg bg-purple-800/50 text-white font-semibold hover:bg-pink-600 transition-all duration-300 border border-purple-500"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}

        {/* Admin Info */}
        <div className="text-center py-2 text-sm text-yellow-300 border-t border-purple-800">
          <p>Hafiz Sajid Syed - Administrator</p>
          <p className="text-xs">sajid.syed@gmail.com</p>
        </div>
      </div>
    </nav>
  )
}