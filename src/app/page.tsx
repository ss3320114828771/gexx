'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import Button from '@/components/ui/button'

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
        { id: '6', name: 'Citrine', price: 199, category: 'Crystals', image: '/n6jpeg' },
      ])
      setLoading(false)
    }, 500)
  }, [])

  const gemImages = ["/n1.jpeg", "n2.jpeg", 'n3', 'n4', 'n5', 'n6']

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

        {/* Image Gallery */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient text-center mb-8">
            Our Collection
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gemImages.map((img, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-lg"></div>
                <div className="relative aspect-square bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-2xl transform group-hover:scale-105 transition-all duration-300 border-2 border-transparent group-hover:border-white"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
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
                    <div className="aspect-square bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-3"></div>
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

        {/* Health Benefits Section */}
        <section className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 mb-16 border border-purple-500">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient text-center mb-8">
            Healing Properties & Health Benefits
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="text-4xl">💜</span>
                <div>
                  <h3 className="text-xl font-semibold text-pink-400">Amethyst</h3>
                  <p className="text-purple-300">Promotes calmness, mental clarity, and spiritual awareness. Helps with stress, anxiety, and insomnia.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <span className="text-4xl">❤️</span>
                <div>
                  <h3 className="text-xl font-semibold text-pink-400">Rose Quartz</h3>
                  <p className="text-purple-300">The stone of unconditional love. Supports heart health, emotional healing, and self-love.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <span className="text-4xl">💛</span>
                <div>
                  <h3 className="text-xl font-semibold text-pink-400">Citrine</h3>
                  <p className="text-purple-300">Boosts energy, vitality, and manifestation. Attracts abundance, success, and positivity.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="text-4xl">💙</span>
                <div>
                  <h3 className="text-xl font-semibold text-pink-400">Lapis Lazuli</h3>
                  <p className="text-purple-300">Enhances mental clarity, wisdom, and truth. Excellent for meditation and spiritual growth.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <span className="text-4xl">💚</span>
                <div>
                  <h3 className="text-xl font-semibold text-pink-400">Jade</h3>
                  <p className="text-purple-300">Promotes emotional balance, harmony, and good fortune. Protective stone for body and mind.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <span className="text-4xl">🤍</span>
                <div>
                  <h3 className="text-xl font-semibold text-pink-400">Clear Quartz</h3>
                  <p className="text-purple-300">Master healer. Amplifies energy and intentions. Balances all chakras and enhances spiritual growth.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-purple-300 italic">
              For centuries, precious stones have been valued not only for their beauty 
              but also for their healing properties and positive energy.
            </p>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient text-center mb-8">
            Shop by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Crystals', 'Rough Stones', 'Polished Gems', 'Tumbled Stones', 'Fossils', 'Jewelry'].map((category) => (
              <Link key={category} href={`/products?category=${category.toLowerCase()}`}>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-purple-500 hover:border-pink-500 transition-all hover:scale-105">
                  <span className="text-4xl mb-2 block">
                    {category === 'Crystals' && '💎'}
                    {category === 'Rough Stones' && '🪨'}
                    {category === 'Polished Gems' && '✨'}
                    {category === 'Tumbled Stones' && '⚪'}
                    {category === 'Fossils' && '🦴'}
                    {category === 'Jewelry' && '💍'}
                  </span>
                  <h3 className="text-lg font-semibold text-white">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-purple-500">
            <span className="text-4xl mb-2 block">✅</span>
            <h3 className="text-lg font-semibold text-pink-400 mb-2">Authenticity Guaranteed</h3>
            <p className="text-purple-300 text-sm">Every stone is certified and ethically sourced</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-purple-500">
            <span className="text-4xl mb-2 block">🚚</span>
            <h3 className="text-lg font-semibold text-pink-400 mb-2">Free Shipping</h3>
            <p className="text-purple-300 text-sm">On orders over $100</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-purple-500">
            <span className="text-4xl mb-2 block">💬</span>
            <h3 className="text-lg font-semibold text-pink-400 mb-2">Expert Support</h3>
            <p className="text-purple-300 text-sm">30+ years of gemstone expertise</p>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-8 text-center border border-purple-500 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-4">
            Join Our Gemstone Community
          </h2>
          <p className="text-purple-300 mb-6 max-w-2xl mx-auto">
            Subscribe to receive updates about new arrivals, special offers, and gemstone knowledge
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-purple-900/30 border border-purple-500 rounded-lg text-white placeholder-purple-400 focus:border-pink-500 focus:outline-none"
            />
            <Button variant="primary">Subscribe</Button>
          </div>
        </section>

        {/* Instagram Feed */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gradient text-center mb-6">
            Follow Us on Instagram
          </h2>
          <p className="text-purple-300 text-center mb-8">@preciousgems</p>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:scale-105 transition-transform"></div>
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