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

// Helper to check if user is admin
function isAdmin(request: Request) {
  const authHeader = request.headers.get('authorization')
  return authHeader === 'admin_token'
}

// ✅ FIXED: GET /api/products/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ✅ Promise type
) {
  try {
    const { id } = await params  // ✅ Await karna zaroori
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

// ✅ FIXED: PUT /api/products/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ✅ Promise type
) {
  try {
    // Check admin permission
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin only' },
        { status: 403 }
      )
    }

    const { id } = await params  // ✅ Await karna zaroori
    const body = await request.json()

    if (!products[id]) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const updatedProduct = {
      ...products[id],
      ...body,
      id,
      updatedAt: new Date().toISOString()
    }

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

// ✅ FIXED: PATCH /api/products/[id]
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ✅ Promise type
) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin only' },
        { status: 403 }
      )
    }

    const { id } = await params  // ✅ Await karna zaroori
    const body = await request.json()

    if (!products[id]) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const updatedProduct = {
      ...products[id],
      ...body,
      id,
      updatedAt: new Date().toISOString()
    }

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

// ✅ FIXED: DELETE /api/products/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ✅ Promise type
) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin only' },
        { status: 403 }
      )
    }

    const { id } = await params  // ✅ Await karna zaroori

    if (!products[id]) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

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