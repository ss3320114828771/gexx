'use client'

import { useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load user on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('user')
      if (saved) {
        setUser(JSON.parse(saved))
      }
    } catch (err) {
      console.error('Failed to load user')
    } finally {
      setLoading(false)
    }
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true)
    setError('')

    try {
      // Mock API call
      await new Promise(r => setTimeout(r, 500))

      // Simple validation
      if (email === 'sajid.syed@gmail.com' && password === 'admin123') {
        const userData = {
          id: '1',
          name: 'Hafiz Sajid Syed',
          email: 'sajid.syed@gmail.com',
          role: 'admin' as const
        }
        
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        setLoading(false)
        return true
      }

      setError('Invalid email or password')
      setLoading(false)
      return false
    } catch (err) {
      setError('Login failed')
      setLoading(false)
      return false
    }
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true)
    setError('')

    try {
      // Mock API call
      await new Promise(r => setTimeout(r, 500))

      // Check if user exists
      if (email === 'sajid.syed@gmail.com') {
        setError('Email already registered')
        setLoading(false)
        return false
      }

      const userData = {
        id: Date.now().toString(),
        name,
        email,
        role: 'user' as const
      }

      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      setLoading(false)
      return true
    } catch (err) {
      setError('Registration failed')
      setLoading(false)
      return false
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  // Check if admin
  const isAdmin = user?.role === 'admin'

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated: !!user
  }
}