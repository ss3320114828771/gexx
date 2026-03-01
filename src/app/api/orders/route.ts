import { NextResponse } from 'next/server'

// Types
interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface Order {
  id: string
  userId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  address: string
  city: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  paymentMethod: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
}

// Mock orders data (in real app, this would be in database)
let orders: Order[] = [
  {
    id: 'ORD-1001',
    userId: 'user1',
    customerName: 'Ahmed Khan',
    customerEmail: 'ahmed@example.com',
    customerPhone: '+92 300 1234567',
    address: '123 Main Street',
    city: 'Lahore',
    items: [
      { productId: '1', name: 'Amethyst Crystal', price: 299, quantity: 1, image: 'n1' }
    ],
    subtotal: 299,
    shipping: 10,
    total: 309,
    paymentMethod: 'cod',
    status: 'delivered',
    createdAt: '2024-03-01T10:30:00Z',
    updatedAt: '2024-03-05T14:20:00Z'
  },
  {
    id: 'ORD-1002',
    userId: 'user2',
    customerName: 'Fatima Ali',
    customerEmail: 'fatima@example.com',
    customerPhone: '+92 321 7654321',
    address: '456 Garden Road',
    city: 'Karachi',
    items: [
      { productId: '2', name: 'Ruby Rough', price: 499, quantity: 2, image: 'n2' }
    ],
    subtotal: 998,
    shipping: 0,
    total: 998,
    paymentMethod: 'bank_transfer',
    status: 'processing',
    createdAt: '2024-03-02T15:45:00Z',
    updatedAt: '2024-03-02T15:45:00Z'
  },
  {
    id: 'ORD-1003',
    userId: 'user3',
    customerName: 'Omar Hassan',
    customerEmail: 'omar@example.com',
    customerPhone: '+92 333 9876543',
    address: '789 Lake View',
    city: 'Islamabad',
    items: [
      { productId: '3', name: 'Sapphire Polished', price: 899, quantity: 1, image: 'n3' },
      { productId: '5', name: 'Rose Quartz', price: 99, quantity: 3, image: 'n5' }
    ],
    subtotal: 1196,
    shipping: 0,
    total: 1196,
    paymentMethod: 'credit_card',
    status: 'shipped',
    createdAt: '2024-03-03T09:15:00Z',
    updatedAt: '2024-03-04T11:30:00Z'
  }
]

// Helper to get user ID from request (in real app, from auth token)
function getUserId(request: Request) {
  const authHeader = request.headers.get('authorization')
  return authHeader || 'user1' // Default for demo
}

// Helper to check if user is admin
function isAdmin(request: Request) {
  const authHeader = request.headers.get('authorization')
  return authHeader === 'admin_token' // In real app, check JWT
}

// GET /api/orders - Get orders (admin gets all, users get their own)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')
    const status = searchParams.get('status')
    const userId = getUserId(request)
    const admin = isAdmin(request)

    // Get single order
    if (orderId) {
      const order = orders.find(o => o.id === orderId)
      
      if (!order) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        )
      }

      // Check permission (admin or order owner)
      if (!admin && order.userId !== userId) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 403 }
        )
      }

      return NextResponse.json({
        success: true,
        order
      })
    }

    // Get all orders (filtered by user if not admin)
    let filteredOrders = admin ? orders : orders.filter(o => o.userId === userId)

    // Filter by status
    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === status)
    }

    // Sort by date (newest first)
    filteredOrders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Calculate stats
    const stats = {
      total: filteredOrders.length,
      pending: filteredOrders.filter(o => o.status === 'pending').length,
      processing: filteredOrders.filter(o => o.status === 'processing').length,
      shipped: filteredOrders.filter(o => o.status === 'shipped').length,
      delivered: filteredOrders.filter(o => o.status === 'delivered').length,
      cancelled: filteredOrders.filter(o => o.status === 'cancelled').length,
      revenue: filteredOrders.reduce((sum, o) => sum + o.total, 0)
    }

    return NextResponse.json({
      success: true,
      orders: filteredOrders,
      stats
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create new order
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const userId = getUserId(request)
    
    // Validate required fields
    const required = ['customerName', 'customerEmail', 'customerPhone', 'address', 'city', 'items', 'paymentMethod']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Validate items
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = body.items.reduce((sum: number, item: OrderItem) => 
      sum + (item.price * item.quantity), 0
    )
    const shipping = subtotal > 100 ? 0 : 10
    const total = subtotal + shipping

    // Create new order
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      userId,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      address: body.address,
      city: body.city,
      items: body.items,
      subtotal,
      shipping,
      total,
      paymentMethod: body.paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Save order (in real app, save to database)
    orders.push(newOrder)

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order: newOrder
    }, { status: 201 })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

// PUT /api/orders - Update order status (admin only)
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')
    const { status } = await request.json()

    // Check admin
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin only' },
        { status: 403 }
      )
    }

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID required' },
        { status: 400 }
      )
    }

    // Find order
    const orderIndex = orders.findIndex(o => o.id === orderId)
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Validate status
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Update order
    orders[orderIndex] = {
      ...orders[orderIndex],
      status: status || orders[orderIndex].status,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      message: 'Order updated successfully',
      order: orders[orderIndex]
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}

// DELETE /api/orders - Cancel order (admin or order owner)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')
    const userId = getUserId(request)
    const admin = isAdmin(request)

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID required' },
        { status: 400 }
      )
    }

    // Find order
    const orderIndex = orders.findIndex(o => o.id === orderId)
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Check permission
    if (!admin && orders[orderIndex].userId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Only allow cancellation of pending orders
    if (orders[orderIndex].status !== 'pending' && !admin) {
      return NextResponse.json(
        { error: 'Only pending orders can be cancelled' },
        { status: 400 }
      )
    }

    // Soft delete - update status to cancelled
    orders[orderIndex] = {
      ...orders[orderIndex],
      status: 'cancelled',
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      message: 'Order cancelled successfully'
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to cancel order' },
      { status: 500 }
    )
  }
}