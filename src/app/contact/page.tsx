'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // Validate
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all required fields')
      }
      
      // In real app, send to API
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-purple-200">
            Get in touch with us for any questions or inquiries
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4"></div>
        </div>

        {/* Bismillah */}
        <div className="text-center mb-12">
          <p className="text-3xl md:text-4xl text-gradient font-arabic">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <p className="text-green-400">
              Thank you for contacting us! We'll get back to you soon.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-3">
            <span className="text-2xl">❌</span>
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Admin Info Card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-purple-500">
              <h2 className="text-2xl font-bold text-pink-400 mb-6">Hafiz Sajid Syed</h2>
              <p className="text-purple-300 mb-4">Founder & Chief Gemologist</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="text-sm text-purple-400">Email</p>
                    <a href="mailto:sajid.syed@gmail.com" className="text-white hover:text-pink-400">
                      sajid.syed@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-sm text-purple-400">Phone</p>
                    <a href="tel:+923001234567" className="text-white hover:text-pink-400">
                      +92 300 1234567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-sm text-purple-400">Address</p>
                    <p className="text-white">123 Gem Market, Anarkali<br />Lahore, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-purple-500">
              <h2 className="text-2xl font-bold text-pink-400 mb-4">Business Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-purple-300">Monday - Friday</span>
                  <span className="text-white">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Saturday</span>
                  <span className="text-white">11:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Sunday</span>
                  <span className="text-white">Closed</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-purple-500">
              <h2 className="text-2xl font-bold text-pink-400 mb-4">Follow Us</h2>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-purple-800 rounded-full flex items-center justify-center text-2xl hover:bg-pink-600 transition-colors">
                  📘
                </a>
                <a href="#" className="w-12 h-12 bg-purple-800 rounded-full flex items-center justify-center text-2xl hover:bg-pink-600 transition-colors">
                  📷
                </a>
                <a href="#" className="w-12 h-12 bg-purple-800 rounded-full flex items-center justify-center text-2xl hover:bg-pink-600 transition-colors">
                  🐦
                </a>
                <a href="#" className="w-12 h-12 bg-purple-800 rounded-full flex items-center justify-center text-2xl hover:bg-pink-600 transition-colors">
                  💬
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-purple-500">
            <h2 className="text-2xl font-bold text-gradient mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-pink-300 mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-pink-300 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-pink-300 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                  placeholder="+92 300 1234567"
                />
              </div>
              
              <div>
                <label className="block text-pink-300 mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="order">Order Status</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-pink-300 mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                  placeholder="How can we help you?"
                />
              </div>
              
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gradient text-center mb-6">Visit Our Store</h2>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-purple-500 h-96 flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🗺️</span>
              <p className="text-purple-300">123 Gem Market, Anarkali, Lahore, Pakistan</p>
              <p className="text-sm text-purple-400 mt-2">Interactive map would be embedded here</p>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <p className="text-purple-300">
            Check our{' '}
            <Link href="/faq" className="text-pink-400 hover:text-pink-300">
              Frequently Asked Questions
            </Link>{' '}
            for quick answers.
          </p>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}