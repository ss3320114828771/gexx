'use client'

import { useState, useEffect } from 'react'

interface FilterOptions {
  categories: string[]
  types: string[]
  origins: string[]
  priceRange: {
    min: number
    max: number
  }
}

interface FilterState {
  category: string
  type: string
  origin: string
  minPrice: number
  maxPrice: number
  sortBy: string
  inStock: boolean
  featured: boolean
  search: string
}

interface ProductFilterProps {
  options: FilterOptions
  onFilterChange: (filters: FilterState) => void
  initialFilters?: Partial<FilterState>
  showSearch?: boolean
  showSort?: boolean
  showPriceRange?: boolean
  compact?: boolean
}

export default function ProductFilter({
  options,
  onFilterChange,
  initialFilters = {},
  showSearch = true,
  showSort = true,
  showPriceRange = true,
  compact = false
}: ProductFilterProps) {
  
  const [filters, setFilters] = useState<FilterState>({
    category: initialFilters.category || 'all',
    type: initialFilters.type || 'all',
    origin: initialFilters.origin || 'all',
    minPrice: initialFilters.minPrice || options.priceRange.min,
    maxPrice: initialFilters.maxPrice || options.priceRange.max,
    sortBy: initialFilters.sortBy || 'newest',
    inStock: initialFilters.inStock || false,
    featured: initialFilters.featured || false,
    search: initialFilters.search || ''
  })

  const [isExpanded, setIsExpanded] = useState(false)
  const [activeFilterCount, setActiveFilterCount] = useState(0)

  // Update active filter count
  useEffect(() => {
    let count = 0
    if (filters.category !== 'all') count++
    if (filters.type !== 'all') count++
    if (filters.origin !== 'all') count++
    if (filters.minPrice > options.priceRange.min) count++
    if (filters.maxPrice < options.priceRange.max) count++
    if (filters.inStock) count++
    if (filters.featured) count++
    if (filters.search) count++
    setActiveFilterCount(count)
  }, [filters, options.priceRange])

  // Handle filter change
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  // Handle price range change - FIXED
  const handleMinPriceChange = (value: number) => {
    const newFilters = { ...filters, minPrice: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleMaxPriceChange = (value: number) => {
    const newFilters = { ...filters, maxPrice: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  // Reset all filters
  const resetFilters = () => {
    const resetState = {
      category: 'all',
      type: 'all',
      origin: 'all',
      minPrice: options.priceRange.min,
      maxPrice: options.priceRange.max,
      sortBy: 'newest',
      inStock: false,
      featured: false,
      search: ''
    }
    setFilters(resetState)
    onFilterChange(resetState)
  }

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'name_desc', label: 'Name: Z to A' },
    { value: 'popular', label: 'Most Popular' }
  ]

  // Compact version (mobile friendly)
  if (compact) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-4">
        {/* Search */}
        {showSearch && (
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 bg-purple-900/30 border border-purple-500 rounded-lg text-white placeholder-purple-400 focus:border-pink-500 focus:outline-none"
              />
              <span className="absolute left-3 top-2.5 text-purple-400">🔍</span>
            </div>
          </div>
        )}

        {/* Filter Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-white"
        >
          <span className="font-medium">Filters</span>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 bg-pink-600 text-white text-xs rounded-full">
                {activeFilterCount}
              </span>
            )}
            <span>{isExpanded ? '−' : '+'}</span>
          </div>
        </button>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="mt-4 space-y-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm text-purple-400 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              >
                <option value="all">All Categories</option>
                {options.categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm text-purple-400 mb-2">Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              >
                <option value="all">All Types</option>
                {options.types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Origin Filter */}
            <div>
              <label className="block text-sm text-purple-400 mb-2">Origin</label>
              <select
                value={filters.origin}
                onChange={(e) => handleFilterChange('origin', e.target.value)}
                className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              >
                <option value="all">All Origins</option>
                {options.origins.map((origin) => (
                  <option key={origin} value={origin}>{origin}</option>
                ))}
              </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                  className="w-4 h-4 rounded border-purple-500 bg-purple-900/30 text-pink-500"
                />
                <span className="text-sm text-purple-300">In Stock Only</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.featured}
                  onChange={(e) => handleFilterChange('featured', e.target.checked)}
                  className="w-4 h-4 rounded border-purple-500 bg-purple-900/30 text-pink-500"
                />
                <span className="text-sm text-purple-300">Featured Only</span>
              </label>
            </div>

            {/* Reset Button */}
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-sm text-pink-400 hover:text-pink-300"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    )
  }

  // Full version
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gradient">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-pink-400 hover:text-pink-300"
          >
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Search */}
      {showSearch && (
        <div className="mb-4">
          <label className="block text-sm text-purple-400 mb-2">Search</label>
          <div className="relative">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 bg-purple-900/30 border border-purple-500 rounded-lg text-white placeholder-purple-400 focus:border-pink-500 focus:outline-none"
            />
            <span className="absolute left-3 top-2.5 text-purple-400">🔍</span>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm text-purple-400 mb-2">Category</label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
        >
          <option value="all">All Categories</option>
          {options.categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Type Filter */}
      <div className="mb-4">
        <label className="block text-sm text-purple-400 mb-2">Type</label>
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
        >
          <option value="all">All Types</option>
          {options.types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Origin Filter */}
      <div className="mb-4">
        <label className="block text-sm text-purple-400 mb-2">Origin</label>
        <select
          value={filters.origin}
          onChange={(e) => handleFilterChange('origin', e.target.value)}
          className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
        >
          <option value="all">All Origins</option>
          {options.origins.map((origin) => (
            <option key={origin} value={origin}>{origin}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      {showPriceRange && (
        <div className="mb-4">
          <label className="block text-sm text-purple-400 mb-2">
            Price Range: ${filters.minPrice} - ${filters.maxPrice}
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min={options.priceRange.min}
              max={options.priceRange.max}
              value={filters.minPrice}
              onChange={(e) => handleMinPriceChange(parseInt(e.target.value))}
              className="w-full"
            />
            <input
              type="range"
              min={options.priceRange.min}
              max={options.priceRange.max}
              value={filters.maxPrice}
              onChange={(e) => handleMaxPriceChange(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Sort Options */}
      {showSort && (
        <div className="mb-4">
          <label className="block text-sm text-purple-400 mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Additional Filters */}
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => handleFilterChange('inStock', e.target.checked)}
            className="w-4 h-4 rounded border-purple-500 bg-purple-900/30 text-pink-500"
          />
          <span className="text-sm text-purple-300">In Stock Only</span>
        </label>
        
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.featured}
            onChange={(e) => handleFilterChange('featured', e.target.checked)}
            className="w-4 h-4 rounded border-purple-500 bg-purple-900/30 text-pink-500"
          />
          <span className="text-sm text-purple-300">Featured Only</span>
        </label>
      </div>
    </div>
  )
}