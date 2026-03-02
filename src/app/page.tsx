'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import Button from '@/components/ui/button'
import Image from 'next/image' // Add this import

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading featured products
    setTimeout(() => {
      setFeaturedProducts([
        { id: '1', name: 'Amethyst Crystal', price: 299, category: 'Crystals', image: '/n1.jpeg' },
        { id: '2', name: 'Ruby Rough', price: 499, category: 'Rough Stones', image: '/n2.jpeg' },
        { id: '3', name: 'Sapphire Polished', price: 899, category: 'Polished Gems', image: '/n3.jpeg' },
        { id: '4', name: 'Emerald', price: 1299, category: 'Polished Gems', image: '/n4.jpeg' },
        { id: '5', name: 'Rose Quartz', price: 99, category: 'Tumbled Stones', image: '/n5.jpeg' },
        { id: '6', name: 'Citrine', price: 199, category: 'Crystals', image: '/n6.jpeg' }, // Fixed: added dot
      ])
      setLoading(false)
    }, 500)
  }, [])

  const gemImages = ["n1.jpeg", "n2.jpeg", "n3.jpeg", "n4.jpeg", "n5.jpeg", "n6.jpeg"]

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6 animate-float">
            Precious Stones & Gems
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Discover nature's finest creations - ethically sourced precious stones from around the world
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products">
              <Button variant="primary">Explore Collection</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </section>

        {/* Bismillah */}
        <div className="text-center mb-16">
          <p className="text-3xl md:text-5xl text-gradient font-arabic">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {/* Image Gallery - FIXED: Added actual images */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient text-center mb-8">
            Our Collection
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gemImages.map((img, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-lg"></div>
                <div className="relative aspect-square rounded-lg shadow-2xl transform group-hover:scale-105 transition-all duration-300 border-2 border-transparent group-hover:border-white overflow-hidden">
                  {/* ADDED: Actual image tag */}
                  <img 
                    src={`/${img}`}
                    alt={`Gem ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image doesn't load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.style.background = 'linear-gradient(to right, #a855f7, #ec4899)';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products - FIXED: Added images */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient text-center mb-8">
            Featured Gems
          </h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="group bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-4 hover:border-pink-500 transition-all hover:scale-105 cursor-pointer">
                    {/* FIXED: Added image */}
                    <div className="aspect-square rounded-lg mb-3 overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image doesn't load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-purple-300">{product.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xl font-bold text-gradient">
                        ${product.price}
                      </span>
                      <span className="text-sm text-pink-400">View Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Rest of your sections remain the same... */}
        {/* Health Benefits Section, Categories, etc. */}

        {/* Instagram Feed - FIXED: Added images */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient text-center mb-6">
            Follow Us on Instagram
          </h2>
          <p className="text-purple-300 text-center mb-8">@preciousgems</p>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform">
                <img 
                  src={`/n${i}.jpeg`}
                  alt={`Instagram post ${i}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.background = 'linear-gradient(to right, #a855f7, #ec4899)';
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-4">
            Ready to Find Your Perfect Gem?
          </h2>
          <Link href="/products">
            <Button variant="primary">Start Exploring</Button>
          </Link>
        </section>
      </div>
      
      <Footer />
    </main>
  )
}