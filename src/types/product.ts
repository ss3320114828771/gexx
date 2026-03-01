// Product status enum
export type ProductStatus = 'active' | 'draft' | 'archived' | 'out-of-stock'

// Product condition enum
export type ProductCondition = 'natural' | 'treated' | 'synthetic' | 'enhanced'

// Product clarity enum (for gemstones)
export type GemClarity = 
  | 'flawless' 
  | 'vvs1' | 'vvs2' 
  | 'vs1' | 'vs2' 
  | 'si1' | 'si2' 
  | 'i1' | 'i2' | 'i3'

// Product cut enum (for gemstones)
export type GemCut = 
  | 'round' 
  | 'princess' 
  | 'emerald' 
  | 'asscher' 
  | 'marquise' 
  | 'oval' 
  | 'pear' 
  | 'heart' 
  | 'cushion' 
  | 'radiant' 
  | 'baguette' 
  | 'rough'

// Main Product interface
export interface Product {
  // Core fields
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  
  // Pricing
  price: number
  compareAtPrice?: number
  cost?: number // For profit calculation
  margin?: number
  
  // Inventory
  sku: string
  barcode?: string
  quantity: number
  lowStockThreshold?: number
  trackQuantity: boolean
  allowBackorder: boolean
  
  // Categories
  category: string
  subcategory?: string
  tags?: string[]
  
  // Gemstone specific
  type: string
  origin: string
  condition: ProductCondition
  clarity?: GemClarity
  cut?: GemCut
  hardness?: number
  weight?: number
  dimensions?: string
  color?: string
  treatment?: string
  
  // Media
  images: ProductImage[]
  thumbnail?: string
  video?: string
  threeDModel?: string
  
  // SEO
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  
  // Status
  status: ProductStatus
  featured: boolean
  publishedAt?: string
  
  // Ratings
  rating?: number
  reviewCount?: number
  
  // Attributes
  attributes?: ProductAttribute[]
  variants?: ProductVariant[]
  
  // Related
  relatedProducts?: string[]
  upSell?: string[]
  crossSell?: string[]
  
  // Metadata
  createdAt: string
  updatedAt: string
  createdBy?: string
  updatedBy?: string
}

// Product image interface
export interface ProductImage {
  id: string
  url: string
  alt?: string
  title?: string
  isPrimary: boolean
  sortOrder: number
  width?: number
  height?: number
  size?: number
}

// Product attribute interface
export interface ProductAttribute {
  name: string
  value: string
  type?: 'text' | 'number' | 'boolean' | 'color'
  unit?: string
}

// Product variant interface
export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  compareAtPrice?: number
  quantity: number
  attributes: ProductAttribute[]
  image?: string
  isDefault?: boolean
}

// Product review interface
export interface ProductReview {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title?: string
  content: string
  pros?: string[]
  cons?: string[]
  images?: string[]
  verified: boolean
  helpful: number
  notHelpful: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
}

// Product category interface
export interface ProductCategory {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  children?: ProductCategory[]
  productCount?: number
  sortOrder: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Product collection interface (e.g., "New Arrivals", "Best Sellers")
export interface ProductCollection {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  products: string[] // Product IDs
  conditions?: ProductCollectionCondition[]
  isActive: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

// Collection condition for dynamic collections
export interface ProductCollectionCondition {
  field: string
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'nin' | 'like'
  value: any
}

// Product filter options
export interface ProductFilters {
  category?: string
  subcategory?: string
  type?: string
  origin?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  inStock?: boolean
  featured?: boolean
  onSale?: boolean
  tags?: string[]
  search?: string
  sortBy?: ProductSortOption
  page?: number
  limit?: number
}

// Product sort options
export type ProductSortOption = 
  | 'newest'
  | 'oldest'
  | 'price_asc'
  | 'price_desc'
  | 'name_asc'
  | 'name_desc'
  | 'popular'
  | 'rating'
  | 'best_selling'

// Product search result
export interface ProductSearchResult {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
  filters: ProductFilters
  facets?: ProductFacets
}

// Product facets (for filter UI)
export interface ProductFacets {
  categories: Array<{ value: string; count: number }>
  types: Array<{ value: string; count: number }>
  origins: Array<{ value: string; count: number }>
  priceRange: {
    min: number
    max: number
  }
  ratings: Array<{ value: number; count: number }>
}

// Product API response
export interface ProductResponse {
  success: boolean
  product?: Product
  error?: string
  message?: string
}

// Products API response
export interface ProductsResponse {
  success: boolean
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Create product request
export interface CreateProductRequest {
  name: string
  description: string
  price: number
  category: string
  type: string
  origin: string
  quantity: number
  sku: string
  images?: string[]
  featured?: boolean
  [key: string]: any
}

// Update product request
export interface UpdateProductRequest {
  name?: string
  description?: string
  price?: number
  category?: string
  type?: string
  origin?: string
  quantity?: number
  status?: ProductStatus
  featured?: boolean
  [key: string]: any
}

// Product statistics
export interface ProductStats {
  total: number
  active: number
  draft: number
  archived: number
  outOfStock: number
  lowStock: number
  featured: number
  totalValue: number
  averagePrice: number
  topCategories: Array<{ name: string; count: number }>
  topOrigins: Array<{ name: string; count: number }>
}

// Product import/export format
export interface ProductImport {
  name: string
  description: string
  price: number
  category: string
  type: string
  origin: string
  quantity: number
  sku: string
  weight?: number
  dimensions?: string
  featured?: boolean
  tags?: string
}

// Product constants
export const PRODUCT_CONSTANTS = {
  STATUSES: {
    active: 'Active',
    draft: 'Draft',
    archived: 'Archived',
    'out-of-stock': 'Out of Stock'
  } as Record<ProductStatus, string>,
  
  CONDITIONS: {
    natural: 'Natural',
    treated: 'Treated',
    synthetic: 'Synthetic',
    enhanced: 'Enhanced'
  } as Record<ProductCondition, string>,
  
  CLARITY: {
    flawless: 'Flawless',
    vvs1: 'VVS1',
    vvs2: 'VVS2',
    vs1: 'VS1',
    vs2: 'VS2',
    si1: 'SI1',
    si2: 'SI2',
    i1: 'I1',
    i2: 'I2',
    i3: 'I3'
  } as Record<GemClarity, string>,
  
  CUTS: {
    round: 'Round',
    princess: 'Princess',
    emerald: 'Emerald',
    asscher: 'Asscher',
    marquise: 'Marquise',
    oval: 'Oval',
    pear: 'Pear',
    heart: 'Heart',
    cushion: 'Cushion',
    radiant: 'Radiant',
    baguette: 'Baguette',
    rough: 'Rough'
  } as Record<GemCut, string>,
  
  STATUS_COLORS: {
    active: 'green',
    draft: 'gray',
    archived: 'orange',
    'out-of-stock': 'red'
  } as Record<ProductStatus, string>
}