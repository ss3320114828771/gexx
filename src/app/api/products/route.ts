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
let products: Product[] = [
  {
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
  {
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
  {
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
  },
  {
    id: '4',
    name: 'Emerald',
    description: 'Natural emerald from Colombia. Rich green color with excellent clarity.',
    price: 1299,
    category: 'Polished Gems',
    type: 'Polished',
    origin: 'Colombia',
    hardness: 8,
    weight: 28,
    dimensions: '2x1.5x1 cm',
    stock: 3,
    featured: true,
    images: ['n4', 'n5', 'n6'],
    createdAt: '2024-02-01',
    updatedAt: '2024-02-10'
  },
  {
    id: '5',
    name: 'Rose Quartz Tumbled',
    description: 'Tumbled rose quartz from Madagascar. Soft pink color, polished and smooth.',
    price: 99,
    category: 'Tumbled Stones',
    type: 'Tumbled',
    origin: 'Madagascar',
    hardness: 7,
    weight: 250,
    dimensions: 'Various 2-4cm',
    stock: 45,
    featured: false,
    images: ['n5', 'n6', 'n1'],
    createdAt: '2024-02-05',
    updatedAt: '2024-02-12'
  },
  {
    id: '6',
    name: 'Citrine Points',
    description: 'Natural citrine points from Brazil. Golden yellow color, natural crystal points.',
    price: 199,
    category: 'Crystals',
    type: 'Natural',
    origin: 'Brazil',
    hardness: 7,
    weight: 85,
    dimensions: '4-6cm',
    stock: 12,
    featured: false,
    images: ['n6', 'n1', 'n2'],
    createdAt: '2024-02-10',
    updatedAt: '2024-02-15'
  }
]

// Helper to check if user is admin
function isAdmin(request: Request) {
  const authHeader = request.headers.get('authorization')
  return authHeader === 'admin_token' // In real app, verify JWT
}

// GET /api/products - Get all products with filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Filter parameters
    const category = searchParams.get('category')
    const type = searchParams.get('type')
    const origin = searchParams.get('origin')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const sort = searchParams.get('sort') || 'newest'

    // Apply filters
    let filteredProducts = [...products]

    // Filter by category
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Filter by type
    if (type && type !== 'all') {
      filteredProducts = filteredProducts.filter(p => 
        p.type.toLowerCase() === type.toLowerCase()
      )
    }

    // Filter by origin
    if (origin && origin !== 'all') {
      filteredProducts = filteredProducts.filter(p => 
        p.origin.toLowerCase() === origin.toLowerCase()
      )
    }

    // Filter by price range
    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseInt(minPrice))
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseInt(maxPrice))
    }

    // Filter featured
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.featured)
    }

    // Search by name or description
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      )
    }

    // Apply sorting
    switch (sort) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'name_asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name_desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'newest':
        filteredProducts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      case 'oldest':
        filteredProducts.sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        break
      default:
        // Default to newest
        filteredProducts.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
    }

    // Apply limit
    if (limit && limit > 0) {
      filteredProducts = filteredProducts.slice(0, limit)
    }

    // Get unique values for filters
    const categories = [...new Set(products.map(p => p.category))]
    const types = [...new Set(products.map(p => p.type))]
    const origins = [...new Set(products.map(p => p.origin))]

    return NextResponse.json({
      success: true,
      count: filteredProducts.length,
      total: products.length,
      products: filteredProducts,
      filters: {
        categories,
        types,
        origins,
        priceRange: {
          min: Math.min(...products.map(p => p.price)),
          max: Math.max(...products.map(p => p.price))
        }
      }
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create new product (admin only)
export async function POST(request: Request) {
  try {
    // Check admin permission
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin only' },
        { status: 403 }
      )
    }

    const body = await request.json()

    // Validate required fields
    const required = ['name', 'description', 'price', 'category', 'origin', 'stock']
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Validate price and stock are positive
    if (body.price <= 0) {
      return NextResponse.json(
        { error: 'Price must be greater than 0' },
        { status: 400 }
      )
    }

    if (body.stock < 0) {
      return NextResponse.json(
        { error: 'Stock cannot be negative' },
        { status: 400 }
      )
    }

    // Create new product
    const newProduct: Product = {
      id: String(products.length + 1),
      name: body.name,
      description: body.description,
      price: body.price,
      category: body.category,
      type: body.type || 'Natural',
      origin: body.origin,
      hardness: body.hardness || 7,
      weight: body.weight || 0,
      dimensions: body.dimensions || '',
      stock: body.stock,
      featured: body.featured || false,
      images: body.images || ['n1', 'n2', 'n3'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Add to database
    products.push(newProduct)

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: newProduct
    }, { status: 201 })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

// PUT /api/products - Bulk update (admin only)
export async function PUT(request: Request) {
  try {
    // Check admin permission
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin only' },
        { status: 403 }
      )
    }

    const { updates } = await request.json()

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: 'Updates must be an array' },
        { status: 400 }
      )
    }

    // Apply updates
    updates.forEach(update => {
      const index = products.findIndex(p => p.id === update.id)
      if (index !== -1) {
        products[index] = {
          ...products[index],
          ...update,
          updatedAt: new Date().toISOString()
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: `Updated ${updates.length} products`,
      products: products
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update products' },
      { status: 500 }
    )
  }
}

// DELETE /api/products - Bulk delete (admin only)
export async function DELETE(request: Request) {
  try {
    // Check admin permission
    if (!isAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin only' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const ids = searchParams.get('ids')?.split(',')

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { error: 'No product IDs provided' },
        { status: 400 }
      )
    }

    // Filter out deleted products
    const initialCount = products.length
    products = products.filter(p => !ids.includes(p.id))
    const deletedCount = initialCount - products.length

    return NextResponse.json({
      success: true,
      message: `Deleted ${deletedCount} products`,
      deletedCount
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete products' },
      { status: 500 }
    )
  }
}