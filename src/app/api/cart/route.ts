import { NextResponse } from 'next/server'

// Mock cart data storage (in real app, this would be in database)
let carts: Record<string, CartItem[]> = {}

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

// Mock products database
const products = {
  '1': { id: '1', name: 'Amethyst Crystal', price: 299, image: 'n1' },
  '2': { id: '2', name: 'Ruby Rough', price: 499, image: 'n2' },
  '3': { id: '3', name: 'Sapphire Polished', price: 899, image: 'n3' },
  '4': { id: '4', name: 'Emerald', price: 1299, image: 'n4' },
  '5': { id: '5', name: 'Rose Quartz', price: 99, image: 'n5' },
  '6': { id: '6', name: 'Citrine', price: 199, image: 'n6' },
}

// Helper to get user ID from request (in real app, from auth token)
function getUserId(request: Request) {
  // For demo, get from header or use default
  const authHeader = request.headers.get('authorization')
  return authHeader || 'guest_123'
}

// GET /api/cart - Get user's cart
export async function GET(request: Request) {
  try {
    const userId = getUserId(request)
    const userCart = carts[userId] || []
    
    // Calculate totals
    const subtotal = userCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const itemCount = userCart.reduce((sum, item) => sum + item.quantity, 0)
    
    return NextResponse.json({
      success: true,
      cart: userCart,
      summary: {
        subtotal,
        itemCount,
        shipping: subtotal > 100 ? 0 : 10,
        total: subtotal > 100 ? subtotal : subtotal + 10
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: Request) {
  try {
    const userId = getUserId(request)
    const { productId, quantity = 1 } = await request.json()
    
    // Validate product
    const product = products[productId as keyof typeof products]
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    // Initialize cart if needed
    if (!carts[userId]) {
      carts[userId] = []
    }
    
    // Check if product already in cart
    const existingItemIndex = carts[userId].findIndex(item => item.productId === productId)
    
    if (existingItemIndex >= 0) {
      // Update quantity
      carts[userId][existingItemIndex].quantity += quantity
    } else {
      // Add new item
      carts[userId].push({
        id: Date.now().toString(),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Item added to cart',
      cart: carts[userId]
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
}

// PUT /api/cart - Update cart item quantity
export async function PUT(request: Request) {
  try {
    const userId = getUserId(request)
    const { itemId, quantity } = await request.json()
    
    if (!carts[userId]) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      )
    }
    
    const itemIndex = carts[userId].findIndex(item => item.id === itemId)
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Item not found in cart' },
        { status: 404 }
      )
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      carts[userId].splice(itemIndex, 1)
    } else {
      // Update quantity
      carts[userId][itemIndex].quantity = quantity
    }
    
    return NextResponse.json({
      success: true,
      message: 'Cart updated',
      cart: carts[userId]
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    )
  }
}

// DELETE /api/cart - Remove item from cart or clear cart
export async function DELETE(request: Request) {
  try {
    const userId = getUserId(request)
    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get('itemId')
    const clearAll = searchParams.get('clear') === 'true'
    
    if (!carts[userId]) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      )
    }
    
    if (clearAll) {
      // Clear entire cart
      carts[userId] = []
      return NextResponse.json({
        success: true,
        message: 'Cart cleared',
        cart: []
      })
    }
    
    if (itemId) {
      // Remove specific item
      carts[userId] = carts[userId].filter(item => item.id !== itemId)
      return NextResponse.json({
        success: true,
        message: 'Item removed from cart',
        cart: carts[userId]
      })
    }
    
    return NextResponse.json(
      { error: 'Item ID required' },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove item' },
      { status: 500 }
    )
  }
}