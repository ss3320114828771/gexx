'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  name: string
  path: string
  icon: string
}

export default function AdminNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Products', path: '/dashboard/products', icon: '💎' },
    { name: 'Orders', path: '/dashboard/orders', icon: '📦' },
    { name: 'Customers', path: '/dashboard/customers', icon: '👥' },
    { name: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
  ]

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/')
  }

  return (
    <nav className="bg-gradient-to-r from-purple-900 to-indigo-900 border-b border-purple-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">💎</span>
            <span className="text-xl font-bold text-gradient hidden sm:block">
              Admin Panel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'bg-pink-600 text-white'
                    : 'text-purple-300 hover:bg-purple-800 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Admin User Info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm text-white font-medium">Hafiz Sajid Syed</p>
              <p className="text-xs text-purple-400">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
              H
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden ml-2 p-2 rounded-lg text-purple-300 hover:bg-purple-800 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-800">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
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
              
              {/* Mobile user info */}
              <div className="px-4 py-3 mt-2 border-t border-purple-800 pt-4">
                <p className="text-sm text-white">Hafiz Sajid Syed</p>
                <p className="text-xs text-purple-400">sajid.syed@gmail.com</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bismillah - Small */}
      <div className="border-t border-purple-800 py-1">
        <p className="text-xs text-center text-purple-400">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>
    </nav>
  )
}