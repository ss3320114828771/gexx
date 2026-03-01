'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-indigo-900 mt-16 py-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-gradient mb-3">Precious Gems</h3>
            <p className="text-purple-300 text-sm">
              Your trusted source for authentic precious stones since 1995.
            </p>
            <p className="text-pink-400 text-sm mt-2">Hafiz Sajid Syed</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-pink-400 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-purple-300 hover:text-pink-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-purple-300 hover:text-pink-400">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-purple-300 hover:text-pink-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-purple-300 hover:text-pink-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-pink-400 mb-3">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=crystals" className="text-purple-300 hover:text-pink-400">
                  Crystals
                </Link>
              </li>
              <li>
                <Link href="/products?category=rough" className="text-purple-300 hover:text-pink-400">
                  Rough Stones
                </Link>
              </li>
              <li>
                <Link href="/products?category=polished" className="text-purple-300 hover:text-pink-400">
                  Polished Gems
                </Link>
              </li>
              <li>
                <Link href="/products?category=tumbled" className="text-purple-300 hover:text-pink-400">
                  Tumbled Stones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-pink-400 mb-3">Contact Us</h4>
            <ul className="space-y-2 text-sm text-purple-300">
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:sajid.syed@gmail.com" className="hover:text-pink-400">
                  sajid.syed@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+923001234567" className="hover:text-pink-400">
                  +92 300 1234567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 my-6">
          <a href="#" className="text-purple-400 hover:text-pink-400 text-2xl">📘</a>
          <a href="#" className="text-purple-400 hover:text-pink-400 text-2xl">📷</a>
          <a href="#" className="text-purple-400 hover:text-pink-400 text-2xl">🐦</a>
          <a href="#" className="text-purple-400 hover:text-pink-400 text-2xl">💬</a>
        </div>

        {/* Bismillah */}
        <div className="text-center my-4">
          <p className="text-2xl text-gradient">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        </div>

        {/* Copyright */}
        <div className="text-center text-purple-400 text-sm border-t border-purple-800 pt-4">
          <p>© {currentYear} Precious Stones & Gems. All rights reserved.</p>
          <p className="mt-1">Powered by Hafiz Sajid Syed</p>
        </div>
      </div>
    </footer>
  )
}