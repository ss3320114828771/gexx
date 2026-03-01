'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  image?: string
}

interface ProductTableProps {
  products: Product[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onStatusChange?: (id: string, status: string) => void
}

export default function ProductTable({ 
  products, 
  onDelete,
  onStatusChange 
}: ProductTableProps) {
  
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [sortField, setSortField] = useState<keyof Product | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filterText, setFilterText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Handle select all
  const handleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  // Handle select single
  const handleSelect = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    )
  }

  // Handle bulk status change
  const handleBulkStatusChange = (status: string) => {
    if (onStatusChange) {
      selectedProducts.forEach(id => {
        onStatusChange(id, status)
      })
      setSelectedProducts([])
    }
  }

  // Handle sort
  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Get sort indicator
  const getSortIndicator = (field: keyof Product) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? '↑' : '↓'
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'in-stock':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">In Stock</span>
      case 'low-stock':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">Low Stock</span>
      case 'out-of-stock':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400">Out of Stock</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400">{status}</span>
    }
  }

  // Filter products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filterText.toLowerCase()) ||
    product.category.toLowerCase().includes(filterText.toLowerCase()) ||
    product.id.includes(filterText)
  )

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortField) return 0
    
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    // Handle string comparison
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const multiplier = sortDirection === 'asc' ? 1 : -1
      return aValue.localeCompare(bValue) * multiplier
    }
    
    // Handle number comparison
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      const multiplier = sortDirection === 'asc' ? 1 : -1
      return (aValue - bValue) * multiplier
    }
    
    return 0
  })

  // Paginate
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-purple-800 flex flex-wrap gap-3 justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-8 pr-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white text-sm focus:border-pink-500 focus:outline-none"
            />
            <span className="absolute left-2.5 top-2.5 text-purple-400 text-sm">🔍</span>
          </div>

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && onStatusChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-300">
                {selectedProducts.length} selected
              </span>
              <button
                onClick={() => handleBulkStatusChange('in-stock')}
                className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
              >
                In Stock
              </button>
              <button
                onClick={() => handleBulkStatusChange('out-of-stock')}
                className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
              >
                Out of Stock
              </button>
            </div>
          )}
        </div>

        {/* Add Product Button */}
        <Link href="/dashboard/products/new">
          <button className="px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg text-sm hover:from-purple-500 hover:to-pink-500 transition-all">
            + Add Product
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-900/50">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-purple-500 bg-purple-900/30 text-pink-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-purple-300 font-semibold text-sm cursor-pointer" onClick={() => handleSort('name')}>
                Product {getSortIndicator('name')}
              </th>
              <th className="px-4 py-3 text-left text-purple-300 font-semibold text-sm cursor-pointer" onClick={() => handleSort('category')}>
                Category {getSortIndicator('category')}
              </th>
              <th className="px-4 py-3 text-left text-purple-300 font-semibold text-sm cursor-pointer" onClick={() => handleSort('price')}>
                Price {getSortIndicator('price')}
              </th>
              <th className="px-4 py-3 text-left text-purple-300 font-semibold text-sm cursor-pointer" onClick={() => handleSort('stock')}>
                Stock {getSortIndicator('stock')}
              </th>
              <th className="px-4 py-3 text-left text-purple-300 font-semibold text-sm">Status</th>
              <th className="px-4 py-3 text-left text-purple-300 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-800">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-purple-900/20 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelect(product.id)}
                      className="w-4 h-4 rounded border-purple-500 bg-purple-900/30 text-pink-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
                      <div>
                        <Link href={`/dashboard/products/${product.id}`} className="font-medium text-white hover:text-pink-400">
                          {product.name}
                        </Link>
                        <p className="text-xs text-purple-400">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-purple-300">{product.category}</td>
                  <td className="px-4 py-3 text-white font-medium">${product.price}</td>
                  <td className="px-4 py-3 text-purple-300">{product.stock}</td>
                  <td className="px-4 py-3">{getStatusBadge(product.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/dashboard/products/${product.id}/edit`}>
                        <button className="p-1 hover:bg-purple-700 rounded transition-colors" title="Edit">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </Link>
                      <button
                        onClick={() => onDelete?.(product.id)}
                        className="p-1 hover:bg-purple-700 rounded transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      {onStatusChange && (
                        <select
                          onChange={(e) => onStatusChange(product.id, e.target.value)}
                          value={product.status}
                          className="text-xs bg-purple-900/30 border border-purple-500 rounded text-white px-1"
                        >
                          <option value="in-stock">In Stock</option>
                          <option value="low-stock">Low Stock</option>
                          <option value="out-of-stock">Out of Stock</option>
                        </select>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-purple-400">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-purple-800 flex items-center justify-between">
          <div className="text-sm text-purple-400">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} products
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-purple-900/30 border border-purple-500 rounded text-purple-400 hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNum = i + 1
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-purple-900/30 border border-purple-500 text-purple-400 hover:bg-purple-800'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-purple-900/30 border border-purple-500 rounded text-purple-400 hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}