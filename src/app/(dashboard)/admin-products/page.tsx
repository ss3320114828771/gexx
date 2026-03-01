'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/button'
import DeleteProduct from './[id]/delete'

interface Product {
  id: string
  name: string
  price: number
  category: string
  type: string
  origin: string
  stock: number
  featured: boolean
  images: string[]
  createdAt: string
  orders: number
  revenue: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStock, setSelectedStock] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [productToDelete, setProductToDelete] = useState<{id: string, name: string} | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [showBulkActions, setShowBulkActions] = useState(false)

  // Categories for filter
  const categories = ['All', 'Crystals', 'Rough Stones', 'Polished Gems', 'Tumbled Stones', 'Jewelry', 'Fossils']
  const stockFilters = ['All', 'In Stock', 'Low Stock', 'Out of Stock']

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock products data
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Amethyst Crystal',
          price: 299,
          category: 'Crystals',
          type: 'Natural',
          origin: 'Brazil',
          stock: 15,
          featured: true,
          images: ['n1', 'n2', 'n3'],
          createdAt: '2024-01-15',
          orders: 23,
          revenue: 6877
        },
        {
          id: '2',
          name: 'Ruby Rough',
          price: 499,
          category: 'Rough Stones',
          type: 'Raw',
          origin: 'Myanmar',
          stock: 8,
          featured: true,
          images: ['n2', 'n3', 'n4'],
          createdAt: '2024-01-20',
          orders: 12,
          revenue: 5988
        },
        {
          id: '3',
          name: 'Sapphire Polished',
          price: 899,
          category: 'Polished Gems',
          type: 'Polished',
          origin: 'Sri Lanka',
          stock: 5,
          featured: false,
          images: ['n3', 'n4', 'n5'],
          createdAt: '2024-01-25',
          orders: 8,
          revenue: 7192
        },
        {
          id: '4',
          name: 'Emerald Crystal',
          price: 1299,
          category: 'Crystals',
          type: 'Natural',
          origin: 'Colombia',
          stock: 3,
          featured: true,
          images: ['n4', 'n5', 'n6'],
          createdAt: '2024-02-01',
          orders: 5,
          revenue: 6495
        },
        {
          id: '5',
          name: 'Rose Quartz Tumbled',
          price: 99,
          category: 'Tumbled Stones',
          type: 'Tumbled',
          origin: 'Madagascar',
          stock: 45,
          featured: false,
          images: ['n5', 'n6', 'n1'],
          createdAt: '2024-02-05',
          orders: 67,
          revenue: 6633
        },
        {
          id: '6',
          name: 'Citrine Points',
          price: 199,
          category: 'Crystals',
          type: 'Natural',
          origin: 'Brazil',
          stock: 12,
          featured: false,
          images: ['n6', 'n1', 'n2'],
          createdAt: '2024-02-10',
          orders: 31,
          revenue: 6169
        },
        {
          id: '7',
          name: 'Lapis Lazuli Polished',
          price: 159,
          category: 'Polished Gems',
          type: 'Polished',
          origin: 'Afghanistan',
          stock: 0,
          featured: false,
          images: ['n1', 'n3', 'n5'],
          createdAt: '2024-02-12',
          orders: 18,
          revenue: 2862
        },
        {
          id: '8',
          name: 'Tiger Eye Rough',
          price: 79,
          category: 'Rough Stones',
          type: 'Raw',
          origin: 'South Africa',
          stock: 22,
          featured: false,
          images: ['n2', 'n4', 'n6'],
          createdAt: '2024-02-15',
          orders: 42,
          revenue: 3318
        }
      ]
      
      setProducts(mockProducts)
      setLoading(false)
    }
    
    fetchProducts()
  }, [])

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.origin.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Category filter
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      
      // Stock filter
      const matchesStock = 
        selectedStock === 'All' ? true :
        selectedStock === 'In Stock' ? product.stock > 10 :
        selectedStock === 'Low Stock' ? product.stock > 0 && product.stock <= 10 :
        selectedStock === 'Out of Stock' ? product.stock === 0 : true
      
      return matchesSearch && matchesCategory && matchesStock
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'price-high':
          return b.price - a.price
        case 'price-low':
          return a.price - b.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'stock':
          return b.stock - a.stock
        default:
          return 0
      }
    })

  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  const handleSelectProduct = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    )
  }

  const handleBulkDelete = () => {
    if (selectedProducts.length > 0 && confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      // In real app, make API call to delete multiple products
      setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)))
      setSelectedProducts([])
      setShowBulkActions(false)
    }
  }

  const handleBulkFeatured = () => {
    // In real app, make API call to update multiple products
    setProducts(prev => prev.map(p => 
      selectedProducts.includes(p.id) ? { ...p, featured: !p.featured } : p
    ))
    setSelectedProducts([])
    setShowBulkActions(false)
  }

  const getStockStatus = (stock: number) => {
    if (stock > 10) return { label: 'In Stock', color: 'text-green-400', bg: 'bg-green-500/20' }
    if (stock > 0) return { label: 'Low Stock', color: 'text-yellow-400', bg: 'bg-yellow-500/20' }
    return { label: 'Out of Stock', color: 'text-red-400', bg: 'bg-red-500/20' }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 bg-gradient-animated rounded-full blur-xl opacity-50 animate-pulse"></div>
          </div>
          <p className="text-gradient text-2xl font-bold animate-pulse">Loading Products...</p>
          <p className="text-purple-400 mt-2">Please wait while we fetch your inventory</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient">Products Management</h1>
          <p className="text-purple-300 mt-2">
            Total Products: <span className="text-pink-400 font-bold">{products.length}</span>
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link href="/dashboard/products/new">
            <Button variant="primary">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Product
            </Button>
          </Link>
          <Button variant="outline" onClick={() => {}}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6 mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm text-purple-400 mb-2">Search Products</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, category, origin..."
                className="w-full px-4 py-2 pl-10 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 text-purple-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm text-purple-400 mb-2">Category</label>
            <select
              className="w-full px-4 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div>
            <label className="block text-sm text-purple-400 mb-2">Stock Status</label>
            <select
              className="w-full px-4 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
            >
              {stockFilters.map(filter => (
                <option key={filter} value={filter}>{filter}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort and Active Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-purple-800">
          <div className="flex items-center gap-2">
            <span className="text-sm text-purple-400">Sort by:</span>
            <select
              className="px-3 py-1 bg-purple-900/30 border border-purple-500 rounded-lg text-white text-sm focus:border-pink-500 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
              <option value="name">Name</option>
              <option value="stock">Stock</option>
            </select>
          </div>
          
          <div className="text-sm text-purple-400">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedProducts.length > 0 && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 mb-6 flex items-center justify-between animate-pulse-slow">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold">{selectedProducts.length}</span>
            <span className="text-purple-200">products selected</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="px-3 py-1 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
            >
              Actions ▼
            </button>
            <button
              onClick={() => setSelectedProducts([])}
              className="px-3 py-1 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
            >
              Clear
            </button>
          </div>
          
          {showBulkActions && (
            <div className="absolute mt-2 right-4 bg-purple-900 rounded-lg shadow-xl border border-purple-500 overflow-hidden z-10">
              <button
                onClick={handleBulkFeatured}
                className="block w-full text-left px-4 py-2 hover:bg-purple-800 text-purple-300 hover:text-white transition-colors"
              >
                Toggle Featured
              </button>
              <button
                onClick={handleBulkDelete}
                className="block w-full text-left px-4 py-2 hover:bg-red-900/50 text-red-400 hover:text-red-300 transition-colors"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-purple-900/50">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-purple-500 bg-purple-900/30 text-pink-500 focus:ring-pink-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-purple-300 font-semibold">Product</th>
                <th className="px-4 py-3 text-left text-purple-300 font-semibold">Category</th>
                <th className="px-4 py-3 text-left text-purple-300 font-semibold">Price</th>
                <th className="px-4 py-3 text-left text-purple-300 font-semibold">Stock</th>
                <th className="px-4 py-3 text-left text-purple-300 font-semibold">Origin</th>
                <th className="px-4 py-3 text-left text-purple-300 font-semibold">Orders</th>
                <th className="px-4 py-3 text-left text-purple-300 font-semibold">Revenue</th>
                <th className="px-4 py-3 text-left text-purple-300 font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-purple-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-800">
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock)
                return (
                  <tr key={product.id} className="hover:bg-purple-900/30 transition-colors group">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="w-4 h-4 rounded border-purple-500 bg-purple-900/30 text-pink-500 focus:ring-pink-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-animated rounded-lg"></div>
                        <div>
                          <Link href={`/dashboard/products/${product.id}`} className="font-semibold text-white hover:text-pink-400 transition-colors">
                            {product.name}
                          </Link>
                          {product.featured && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-gradient-animated rounded-full text-white">
                              Featured
                            </span>
                          )}
                          <div className="text-xs text-purple-400">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-purple-300">{product.category}</span>
                      <div className="text-xs text-purple-500">{product.type}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold text-gradient">${product.price}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${stockStatus.bg} ${stockStatus.color}`}>
                        {product.stock} {stockStatus.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-purple-300">{product.origin}</td>
                    <td className="px-4 py-3 text-purple-300">{product.orders}</td>
                    <td className="px-4 py-3">
                      <span className="text-green-400">${product.revenue}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className={`w-2 h-2 rounded-full ${product.featured ? 'bg-pink-500' : 'bg-gray-500'}`}></span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/dashboard/products/${product.id}`}>
                          <button className="p-1 hover:bg-purple-700 rounded transition-colors" title="View">
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </Link>
                        <Link href={`/dashboard/products/${product.id}/edit`}>
                          <button className="p-1 hover:bg-purple-700 rounded transition-colors" title="Edit">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </Link>
                        <button 
                          onClick={() => setProductToDelete({ id: product.id, name: product.name })}
                          className="p-1 hover:bg-purple-700 rounded transition-colors"
                          title="Delete"
                        >
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-20 h-20 mx-auto text-purple-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-bold text-gradient mb-2">No products found</h3>
            <p className="text-purple-400 mb-6">Try adjusting your filters or add a new product</p>
            <Link href="/dashboard/products/new">
              <Button variant="primary">Add New Product</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-purple-400">
            Showing 1 to {filteredProducts.length} of {filteredProducts.length} products
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-purple-900/30 border border-purple-500 rounded-lg text-purple-400 hover:bg-purple-800 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 bg-gradient-animated text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1 bg-purple-900/30 border border-purple-500 rounded-lg text-purple-400 hover:bg-purple-800 transition-colors">
              2
            </button>
            <button className="px-3 py-1 bg-purple-900/30 border border-purple-500 rounded-lg text-purple-400 hover:bg-purple-800 transition-colors">
              3
            </button>
            <button className="px-3 py-1 bg-purple-900/30 border border-purple-500 rounded-lg text-purple-400 hover:bg-purple-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {productToDelete && (
        <DeleteProduct
          productId={productToDelete.id}
          productName={productToDelete.name}
          isOpen={true}
          onClose={() => setProductToDelete(null)}
          onDeleted={() => {
            setProducts(prev => prev.filter(p => p.id !== productToDelete.id))
            setProductToDelete(null)
          }}
        />
      )}
    </div>
  )
}