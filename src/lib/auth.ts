'use client'

// Types
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  avatar?: string
  createdAt?: string
}

interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
}

// Simple in-memory user store (in real app, this would be a database)
const users: User[] = [
  {
    id: '1',
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@gmail.com',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
]

// Mock tokens store
const tokens: Record<string, string> = {}

// Generate simple token
const generateToken = (userId: string): string => {
  return `token_${userId}_${Date.now()}`
}

// Login function
export async function login(email: string, password: string): Promise<AuthResponse> {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    // Find user (in real app, check hashed password)
    const user = users.find(u => u.email === email)
    
    // Mock password check (in real app, use bcrypt)
    if (!user || password !== 'password123') {
      return {
        success: false,
        error: 'Invalid email or password'
      }
    }

    // Generate token
    const token = generateToken(user.id)
    tokens[token] = user.id

    // Don't send password back
    const { ...userWithoutPassword } = user

    return {
      success: true,
      user: userWithoutPassword,
      token
    }
  } catch (error) {
    return {
      success: false,
      error: 'Login failed'
    }
  }
}

// Register function
export async function register(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    // Check if user exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return {
        success: false,
        error: 'Email already registered'
      }
    }

    // Create new user
    const newUser: User = {
      id: String(users.length + 1),
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString()
    }

    // Save user (in real app, save to database)
    users.push(newUser)

    // Generate token
    const token = generateToken(newUser.id)
    tokens[token] = newUser.id

    return {
      success: true,
      user: newUser,
      token
    }
  } catch (error) {
    return {
      success: false,
      error: 'Registration failed'
    }
  }
}

// Logout function
export async function logout(token?: string): Promise<{ success: boolean }> {
  try {
    if (token) {
      delete tokens[token]
    }
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

// Verify token
export async function verifyToken(token: string): Promise<User | null> {
  try {
    const userId = tokens[token]
    if (!userId) return null

    const user = users.find(u => u.id === userId)
    return user || null
  } catch (error) {
    return null
  }
}

// Get current user from token
export async function getCurrentUser(token?: string): Promise<User | null> {
  if (!token) return null
  return verifyToken(token)
}

// Simple client-side auth
export const clientAuth = {
  // Save user to localStorage
  setUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user))
    }
  },

  // Get user from localStorage
  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : null
    }
    return null
  },

  // Save token
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
  },

  // Get token
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  },

  // Clear auth data
  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  },

  // Check if user is logged in
  isAuthenticated: (): boolean => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token')
    }
    return false
  },

  // Check if user is admin
  isAdmin: (): boolean => {
    if (typeof window !== 'undefined') {
      const user = clientAuth.getUser()
      return user?.role === 'admin'
    }
    return false
  }
}

// Simple password utilities (in real app, use bcrypt)
export const passwordUtils = {
  hash: (password: string): string => {
    // This is NOT secure - just for demo
    return btoa(password)
  },

  compare: (password: string, hash: string): boolean => {
    // This is NOT secure - just for demo
    return btoa(password) === hash
  }
}

// Validation utilities
export const authValidation = {
  isValidEmail: (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  },

  isValidPassword: (password: string): boolean => {
    return password.length >= 6
  },

  isValidName: (name: string): boolean => {
    return name.length >= 2
  }
}