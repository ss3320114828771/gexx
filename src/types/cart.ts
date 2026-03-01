// Cart item interface
export interface CartItem {
  // Unique identifier for cart item
  id: string
  
  // Product identifier
  productId: string
  
  // Product details
  name: string
  price: number
  
  // Quantity in cart
  quantity: number
  
  // Optional fields
  image?: string
  variant?: string
  size?: string
  color?: string
  maxStock?: number
  discount?: number
  originalPrice?: number
}

// Cart summary interface
export interface CartSummary {
  // Totals
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  
  // Counts
  itemCount: number
  uniqueItemCount: number
  
  // Shipping info
  freeShippingThreshold?: number
  shippingMethod?: string
  
  // Tax info
  taxRate?: number
  
  // Discount info
  discountCode?: string
  discountPercentage?: number
}

// Cart state interface
export interface CartState {
  // Items
  items: CartItem[]
  
  // Summary
  summary: CartSummary
  
  // Status
  isLoading: boolean
  isUpdating: boolean
  error: string | null
  
  // Metadata
  lastUpdated: string | null
  userId?: string
  sessionId?: string
}

// Cart actions
export interface CartActions {
  // Add item
  addItem: (item: Omit<CartItem, 'id'>) => void
  
  // Update quantity
  updateQuantity: (itemId: string, quantity: number) => void
  
  // Remove item
  removeItem: (itemId: string) => void
  
  // Clear cart
  clearCart: () => void
  
  // Apply discount
  applyDiscount: (code: string) => Promise<boolean>
  
  // Remove discount
  removeDiscount: () => void
  
  // Set shipping
  setShipping: (method: string, cost: number) => void
}

// Cart context interface
export interface CartContextType extends CartState, CartActions {}

// Cart item with product details
export interface CartItemWithProduct extends CartItem {
  // Product details (populated)
  category?: string
  inStock?: boolean
  rating?: number
  reviewCount?: number
}

// Checkout summary interface
export interface CheckoutSummary extends CartSummary {
  // Checkout specific
  paymentMethod?: string
  billingAddress?: Address
  shippingAddress?: Address
  estimatedDelivery?: string
}

// Address interface
export interface Address {
  firstName: string
  lastName: string
  email: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  zipCode: string
  country: string
}

// Payment method interface
export interface PaymentMethod {
  id: string
  name: string
  type: 'cod' | 'bank_transfer' | 'credit_card' | 'debit_card' | 'easypaisa' | 'jazzcash'
  icon?: string
  enabled: boolean
  fee?: number
  feeType?: 'fixed' | 'percentage'
  minAmount?: number
  maxAmount?: number
}

// Shipping method interface
export interface ShippingMethod {
  id: string
  name: string
  cost: number
  estimatedDays: string
  enabled: boolean
  minAmount?: number
  maxAmount?: number
  freeShippingThreshold?: number
}

// Cart API response
export interface CartResponse {
  success: boolean
  cart?: CartState
  error?: string
  message?: string
}

// Add to cart request
export interface AddToCartRequest {
  productId: string
  quantity: number
  variant?: string
  size?: string
  color?: string
}

// Update cart request
export interface UpdateCartRequest {
  itemId: string
  quantity: number
}

// Cart errors
export interface CartError {
  code: string
  message: string
  field?: string
  itemId?: string
}

// Cart constants
export const CART_CONSTANTS = {
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 99,
  FREE_SHIPPING_THRESHOLD: 100,
  DEFAULT_SHIPPING: 10,
  DEFAULT_TAX_RATE: 0.05, // 5%
  MAX_ITEMS: 50,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
}

// Cart event types
export type CartEvent = 
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string; discount: number } }
  | { type: 'REMOVE_DISCOUNT' }
  | { type: 'SET_SHIPPING'; payload: { method: string; cost: number } }
  | { type: 'SET_ERROR'; payload: { error: string } }
  | { type: 'SET_LOADING'; payload: { isLoading: boolean } }

// Cart storage keys
export const CART_STORAGE_KEYS = {
  ITEMS: 'cart_items',
  SUMMARY: 'cart_summary',
  SESSION: 'cart_session',
  USER_ID: 'cart_user_id',
} as const