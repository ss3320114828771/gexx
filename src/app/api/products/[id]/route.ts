import { NextResponse } from 'next/server'

// Types
interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  type: string
  origin: string
  hardness: number
  weight: number
  dimensions: string
  stock: number
  featured: boolean
  images: string[]
  createdAt: string
  updatedAt: string
}

// Mock products database
const products: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Amethyst Crystal',
    description: 'Natural amethyst crystal cluster from Brazil. Deep purple color with excellent clarity.',
    price: 299,
    category: 'Crystals',
    type: 'Natural',
    origin: 'Brazil',
    hardness: 7,
    weight: 125,
    dimensions: '8x5x3 cm',
    stock: 15,
    featured: true,
    images: ['n1', 'n2', 'n3'],
    createdAt: '2024-01-15',
    updatedAt: '2024-02-20'
  },
  '2': {
    id: '2',
    name: 'Ruby Rough',
    description: 'Natural rough ruby from Myanmar. Deep red color with good transparency.',
    price: 499,
    category: 'Rough Stones',
    type: 'Raw',
    origin: 'Myanmar',
    hardness: 9,
    weight: 45,
    dimensions: '3x2x1.5 cm',
    stock: 8,
    featured: true,
    images: ['n2', 'n3', 'n4'],
    createdAt: '2024-01-20',
    updatedAt: '2024-02-18'
  },
  '3': {
    id: '3',
    name: 'Sapphire Polished',
    description: 'Natural sapphire from Sri Lanka, expertly polished. Beautiful cornflower blue color.',
    price: 899,
    category: 'Polished Gems',
    type: 'Polished',
    origin: 'Sri Lanka',
    hardness: 9,
    weight: 32,
    dimensions: '2x1.5x1 cm',
    stock: 5,
    featured: false,
    images: ['n3', 'n4', 'n5'],
    createdAt: '2024-01-25',
    updatedAt: '2024-02-15'
  }
}

// Helper to check if user is admin (in real app, verify JWT)
function isAdmin(request: Request) {
  const authHeader = request.headers.get('authorization')
  return authHeader === 'admin_token' // Demo purpose only
}

// GET /api/products/[id] - Get single product
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const product = products[id]

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      product
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Update product (admin only)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin permission
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin only' },
        { status: 403 }
      )
    }

    const id = params.id
    const body = await request.json()

    // Check if product exists
    if (!products[id]) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Update product
    const updatedProduct = {
      ...products[id],
      ...body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    }

    // Save to mock database
    products[id] = updatedProduct

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// PATCH /api/products/[id] - Partially update product (admin only)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin permission
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin only' },
        { status: 403 }
      )
    }

    const id = params.id
    const body = await request.json()

    // Check if product exists
    if (!products[id]) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Update only provided fields
    const updatedProduct = {
      ...products[id],
      ...body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    }

    // Save to mock database
    products[id] = updatedProduct

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Delete product (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin permission
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin only' },
        { status: 403 }
      )
    }

    const id = params.id

    // Check if product exists
    if (!products[id]) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Delete product (in real app, you might want soft delete)
    delete products[id]

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}