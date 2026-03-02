'use client'

import Link from 'next/link'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import Image from 'next/image' // Add this import

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            About Us
          </h1>
          <p className="text-xl text-purple-200">
            Your Trusted Source for Authentic Precious Stones Since 1995
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4"></div>
        </div>

        {/* Bismillah */}
        <div className="text-center mb-12">
          <p className="text-3xl md:text-4xl text-gradient font-arabic">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Our Story */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-purple-500">
            <h2 className="text-2xl font-bold text-pink-400 mb-4">Our Story</h2>
            <p className="text-purple-300 leading-relaxed mb-4">
              Founded in 1995 by Hafiz Sajid Syed, our journey began in the historic gem markets 
              of Lahore, Pakistan. With over three generations of gemstone expertise, we have 
              established ourselves as a trusted name in the precious stones trade.
            </p>
            <p className="text-purple-300 leading-relaxed">
              Today, we source the finest gems from around the world - from the ruby mines of 
              Myanmar to the sapphire deposits of Sri Lanka, bringing nature's most beautiful 
              creations directly to you.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-purple-500">
            <h2 className="text-2xl font-bold text-pink-400 mb-4">Our Mission</h2>
            <p className="text-purple-300 leading-relaxed mb-4">
              To provide authentic, ethically-sourced precious stones of the highest quality 
              while educating our customers about the beauty, history, and healing properties 
              of these natural treasures.
            </p>
            <p className="text-purple-300 leading-relaxed">
              We believe in transparency, fair trade, and sharing the rich cultural heritage 
              that each gemstone carries from its origin.
            </p>
          </div>
        </div>

        {/* Founder Section - ADDED YOUR PICTURE */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 border-2 border-purple-500 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image Container - FIXED: Added your actual image */}
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-pink-500 shadow-xl">
              <img 
                src="/sajid.jpeg"
                alt="Hafiz Sajid Syed - Founder"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.style.background = 'linear-gradient(to right, #a855f7, #ec4899)';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-6xl">👤</span>';
                }}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gradient mb-2">Hafiz Sajid Syed</h2>
              <p className="text-pink-400 mb-4">Founder & Chief Gemologist</p>
              <p className="text-purple-300 leading-relaxed">
                With over 30 years of experience in the gemstone industry, Hafiz Sajid Syed 
                has personally visited mines and markets across Asia, Africa, and South America. 
                His expertise in identifying and selecting the finest gems is renowned among 
                collectors and jewelers worldwide.
              </p>
              <p className="text-purple-300 mt-4">
                <span className="text-pink-400">Email:</span> sajid.syed@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <h2 className="text-3xl font-bold text-gradient text-center mb-8">Our Values</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-purple-500 hover:border-pink-500 transition-all">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-xl font-bold text-pink-400 mb-2">Authenticity</h3>
            <p className="text-purple-300">Every stone is certified and ethically sourced, ensuring you receive genuine, natural gems.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-purple-500 hover:border-pink-500 transition-all">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="text-xl font-bold text-pink-400 mb-2">Quality</h3>
            <p className="text-purple-300">We personally select each stone, ensuring only the finest grades reach our customers.</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center border border-purple-500 hover:border-pink-500 transition-all">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="text-xl font-bold text-pink-400 mb-2">Trust</h3>
            <p className="text-purple-300">Building lasting relationships through transparency, expertise, and exceptional service.</p>
          </div>
        </div>

        {/* Health Benefits Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-purple-500 mb-16">
          <h2 className="text-3xl font-bold text-gradient text-center mb-8">Healing Properties of Gems</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-2xl">💜</span>
                <div>
                  <h3 className="font-semibold text-pink-400">Amethyst</h3>
                  <p className="text-purple-300 text-sm">Promotes calmness, clarity, and spiritual awareness. Helps with stress and anxiety.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-2xl">❤️</span>
                <div>
                  <h3 className="font-semibold text-pink-400">Rose Quartz</h3>
                  <p className="text-purple-300 text-sm">The stone of unconditional love. Supports heart health and emotional healing.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-2xl">💛</span>
                <div>
                  <h3 className="font-semibold text-pink-400">Citrine</h3>
                  <p className="text-purple-300 text-sm">Boosts energy, vitality, and manifestation. Attracts abundance and success.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-2xl">💙</span>
                <div>
                  <h3 className="font-semibold text-pink-400">Lapis Lazuli</h3>
                  <p className="text-purple-300 text-sm">Enhances mental clarity, wisdom, and truth. Excellent for meditation.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-2xl">💚</span>
                <div>
                  <h3 className="font-semibold text-pink-400">Jade</h3>
                  <p className="text-purple-300 text-sm">Promotes emotional balance, harmony, and good fortune. Protective stone.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <span className="text-2xl">🤍</span>
                <div>
                  <h3 className="font-semibold text-pink-400">Clear Quartz</h3>
                  <p className="text-purple-300 text-sm">Master healer. Amplifies energy and intentions. Balances all chakras.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gradient mb-4">Ready to Find Your Perfect Gem?</h2>
          <div className="flex justify-center gap-4">
            <Link href="/products">
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all">
                Browse Collection
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 border-2 border-pink-500 text-pink-500 rounded-lg font-semibold hover:bg-pink-500 hover:text-white transition-all">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}