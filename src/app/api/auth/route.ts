import { NextResponse } from 'next/server'

// Mock user data (in real app, this would come from database)
const users = [
  {
    id: '1',
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@gmail.com',
    password: 'admin123', // In real app, this would be hashed
    role: 'admin'
  },
  {
    id: '2',
    name: 'Test User',
    email: 'user@test.com',
    password: 'user123',
    role: 'user'
  }
]

// POST /api/auth/login
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, action } = body

    // Handle different auth actions
    if (action === 'login') {
      // Find user
      const user = users.find(u => u.email === email && u.password === password)
      
      if (!user) {
        return NextResponse.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        )
      }

      // Return user info (without password)
      const { password: _, ...userWithoutPassword } = user
      
      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
        message: 'Login successful'
      })
    }

    // Handle registration
    if (action === 'register') {
      const { name, email, password } = body

      // Check if user exists
      const existingUser = users.find(u => u.email === email)
      
      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 400 }
        )
      }

      // Create new user (in real app, save to database)
      const newUser = {
        id: String(users.length + 1),
        name,
        email,
        password, // In real app, hash this!
        role: 'user'
      }

      // Add to mock array
      users.push(newUser)

      // Return user info (without password)
      const { password: _, ...userWithoutPassword } = newUser

      return NextResponse.json({
        success: true,
        user: userWithoutPassword,
        message: 'Registration successful'
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/auth/me - Get current user
export async function GET(request: Request) {
  try {
    // Get token from header
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'No authorization token' },
        { status: 401 }
      )
    }

    // In real app, verify JWT token and get user
    // For demo, return mock admin user
    return NextResponse.json({
      success: true,
      user: {
        id: '1',
        name: 'Hafiz Sajid Syed',
        email: 'sajid.syed@gmail.com',
        role: 'admin'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/auth/logout
export async function PUT() {
  try {
    // In real app, invalidate token/session
    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}