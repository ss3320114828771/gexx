'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/button'
import Navbar from '@/components/ui/navbar'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 border-2 border-purple-500">
          <h2 className="text-3xl font-bold text-center mb-8 text-gradient">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-pink-300 mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-pink-300 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" variant="primary" fullWidth>
              Login
            </Button>
          </form>
          <p className="text-center mt-4 text-purple-300">
            Don't have an account?{' '}
            <Link href="/register" className="text-pink-400 hover:text-pink-300">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}