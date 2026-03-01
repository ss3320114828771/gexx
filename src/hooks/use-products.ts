'use client'

import { useState, useEffect } from 'react'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  type: string
  origin: string
  stock: number
  featured: boolean
  images: string[]
  rating?: number
  reviewCount?: number
  createdAt?: string // Added this optional property
}

interface ProductFilters {
  category?: string
  type?: string
  origin?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
  search?: string
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'popular'
}

interface UseProductsOptions {
  initialFilters?: ProductFilters
  pageSize?: number
  autoLoad?: boolean
}

export function useProducts(options: UseProductsOptions = {}) {
  const {
    initialFilters = {},
    pageSize = 12,
    autoLoad = true
  } = options

  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState<ProductFilters>(initialFilters)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  // Load products on mount
  useEffect(() => {
    if (autoLoad) {
      loadProducts()
    }
  }, [autoLoad])

  // Apply filters whenever products or filters change
  useEffect(() => {
    applyFilters()
  }, [products, filters])

  // Load products from API
  const loadProducts = async () => {
    setLoading(true)
    setError('')

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock products data with createdAt
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Amethyst Crystal',
          description: 'Natural amethyst crystal cluster from Brazil. Deep purple color with excellent clarity.',
          price: 299,
          category: 'Crystals',
          type: 'Natural',
          origin: 'Brazil',
          stock: 15,
          featured: true,
          images: ['n1', 'n2', 'n3'],
          rating: 4.8,
          reviewCount: 124,
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'Ruby Rough',
          description: 'Natural rough ruby from Myanmar. Deep red color with good transparency.',
          price: 499,
          category: 'Rough Stones',
          type: 'Raw',
          origin: 'Myanmar',
          stock: 8,
          featured: true,
          images: ['n2', 'n3', 'n4'],
          rating: 4.9,
          reviewCount: 89,
          createdAt: '2024-01-20'
        },
        {
          id: '3',
          name: 'Sapphire Polished',
          description: 'Natural sapphire from Sri Lanka, expertly polished. Beautiful cornflower blue color.',
          price: 899,
          category: 'Polished Gems',
          type: 'Polished',
          origin: 'Sri Lanka',
          stock: 5,
          featured: true,
          images: ['n3', 'n4', 'n5'],
          rating: 5.0,
          reviewCount: 56,
          createdAt: '2024-01-25'
        },
        {
          id: '4',
          name: 'Emerald',
          description: 'Natural emerald from Colombia. Rich green color with excellent clarity.',
          price: 1299,
          category: 'Polished Gems',
          type: 'Polished',
          origin: 'Colombia',
          stock: 3,
          featured: true,
          images: ['n4', 'n5', 'n6'],
          rating: 4.7,
          reviewCount: 42,
          createdAt: '2024-02-01'
        },
        {
          id: '5',
          name: 'Rose Quartz Tumbled',
          description: 'Tumbled rose quartz from Madagascar. Soft pink color, polished and smooth.',
          price: 99,
          category: 'Tumbled Stones',
          type: 'Tumbled',
          origin: 'Madagascar',
          stock: 45,
          featured: false,
          images: ['n5', 'n6', 'n1'],
          rating: 4.6,
          reviewCount: 215,
          createdAt: '2024-02-05'
        },
        {
          id: '6',
          name: 'Citrine Points',
          description: 'Natural citrine points from Brazil. Golden yellow color, natural crystal points.',
          price: 199,
          category: 'Crystals',
          type: 'Natural',
          origin: 'Brazil',
          stock: 12,
          featured: false,
          images: ['n6', 'n1', 'n2'],
          rating: 4.5,
          reviewCount: 78,
          createdAt: '2024-02-10'
        },
        {
          id: '7',
          name: 'Lapis Lazuli',
          description: 'Deep blue lapis lazuli from Afghanistan with gold pyrite inclusions.',
          price: 159,
          category: 'Polished Gems',
          type: 'Polished',
          origin: 'Afghanistan',
          stock: 7,
          featured: false,
          images: ['n1', 'n3', 'n5'],
          rating: 4.8,
          reviewCount: 34,
          createdAt: '2024-02-12'
        },
        {
          id: '8',
          name: 'Tiger Eye',
          description: 'Golden brown tiger eye from South Africa with silky luster.',
          price: 79,
          category: 'Tumbled Stones',
          type: 'Tumbled',
          origin: 'South Africa',
          stock: 22,
          featured: false,
          images: ['n2', 'n4', 'n6'],
          rating: 4.4,
          reviewCount: 67,
          createdAt: '2024-02-15'
        }
      ]

      setProducts(mockProducts)
      setTotalCount(mockProducts.length)
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  // Apply filters to products
  const applyFilters = () => {
    let filtered = [...products]

    // Category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === filters.category?.toLowerCase()
      )
    }

    // Type filter
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(p => 
        p.type.toLowerCase() === filters.type?.toLowerCase()
      )
    }

    // Origin filter
    if (filters.origin && filters.origin !== 'all') {
      filtered = filtered.filter(p => 
        p.origin.toLowerCase() === filters.origin?.toLowerCase()
      )
    }

    // Price range filter
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!)
    }

    // Featured filter
    if (filters.featured) {
      filtered = filtered.filter(p => p.featured)
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      )
    }

    // Apply sorting - FIXED: Check if createdAt exists
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price_desc':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'name_asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'name_desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name))
          break
        case 'popular':
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
          break
        case 'newest':
          filtered.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
            return dateB - dateA
          })
          break
        default:
          // Default sort by newest
          filtered.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
            return dateB - dateA
          })
      }
    }

    setFilteredProducts(filtered)
    setHasMore(filtered.length > page * pageSize)
  }

  // Update filters
  const updateFilters = (newFilters: ProductFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setPage(1)
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters({})
    setPage(1)
  }

  // Load more products
  const loadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1)
    }
  }

  // Get product by ID
  const getProduct = (id: string) => {
    return products.find(p => p.id === id)
  }

  // Get unique filter options
  const getFilterOptions = () => {
    return {
      categories: [...new Set(products.map(p => p.category))],
      types: [...new Set(products.map(p => p.type))],
      origins: [...new Set(products.map(p => p.origin))],
      priceRange: {
        min: products.length > 0 ? Math.min(...products.map(p => p.price)) : 0,
        max: products.length > 0 ? Math.max(...products.map(p => p.price)) : 1000
      }
    }
  }

  // Get paginated products
  const paginatedProducts = filteredProducts.slice(0, page * pageSize)

  return {
    products: paginatedProducts,
    allProducts: products,
    filteredProducts,
    loading,
    error,
    page,
    hasMore,
    totalCount,
    loadMore,
    filters,
    updateFilters,
    resetFilters,
    getFilterOptions,
    getProduct,
    isEmpty: filteredProducts.length === 0
  }
}

// Simple version
export function useSimpleProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { id: '1', name: 'Amethyst', price: 299 },
        { id: '2', name: 'Ruby', price: 499 },
        { id: '3', name: 'Sapphire', price: 899 },
      ])
      setLoading(false)
    }, 500)
  }, [])

  return { products, loading }
}

// Search hook
export function useProductSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [searching, setSearching] = useState(false)

  const search = async (searchQuery: string) => {
    setQuery(searchQuery)
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setSearching(true)
    
    await new Promise(r => setTimeout(r, 300))
    
    // Mock results with createdAt
    const mockResults: Product[] = [
      { 
        id: '1', 
        name: 'Amethyst Crystal', 
        price: 299, 
        category: 'Crystals', 
        description: '', 
        type: '', 
        origin: '', 
        stock: 0, 
        featured: false, 
        images: [],
        createdAt: '2024-01-15'
      },
      { 
        id: '2', 
        name: 'Ruby Rough', 
        price: 499, 
        category: 'Rough Stones', 
        description: '', 
        type: '', 
        origin: '', 
        stock: 0, 
        featured: false, 
        images: [],
        createdAt: '2024-01-20'
      },
    ].filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    setResults(mockResults)
    setSearching(false)
  }

  return { query, results, searching, search }
}