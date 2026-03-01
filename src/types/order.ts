// Order status enum
export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'failed'

// Payment status enum
export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially_refunded'

// Payment method enum
export type PaymentMethod =
  | 'cod'
  | 'bank_transfer'
  | 'credit_card'
  | 'debit_card'
  | 'easypaisa'
  | 'jazzcash'
  | 'paypal'

// Order item interface
export interface OrderItem {
  // Product info
  productId: string
  name: string
  price: number
  quantity: number
  
  // Optional fields
  image?: string
  sku?: string
  variant?: string
  size?: string
  color?: string
  discount?: number
  originalPrice?: number
  total: number
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
  company?: string
  instructions?: string
}

// Order totals interface
export interface OrderTotals {
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  paid: number
  due: number
  refunded: number
}

// Order timeline event
export interface OrderTimelineEvent {
  id: string
  status: OrderStatus
  note?: string
  createdAt: string
  createdBy?: string
  metadata?: Record<string, any>
}

// Order payment info
export interface OrderPayment {
  method: PaymentMethod
  status: PaymentStatus
  transactionId?: string
  amount: number
  paidAt?: string
  refundedAt?: string
  refundAmount?: number
  metadata?: Record<string, any>
}

// Shipping info
export interface OrderShipping {
  method: string
  carrier?: string
  trackingNumber?: string
  trackingUrl?: string
  estimatedDelivery?: string
  shippedAt?: string
  deliveredAt?: string
  cost: number
  address: Address
  notes?: string
}

// Discount info
export interface OrderDiscount {
  code: string
  type: 'percentage' | 'fixed'
  value: number
  amount: number
  description?: string
}

// Main Order interface
export interface Order {
  // Core fields
  id: string
  orderNumber: string
  userId?: string
  guestEmail?: string
  
  // Customer info
  customer: {
    name: string
    email: string
    phone: string
  }
  
  // Order details
  items: OrderItem[]
  totals: OrderTotals
  status: OrderStatus
  
  // Payment
  payment: OrderPayment
  
  // Shipping
  shipping: OrderShipping
  
  // Billing
  billingAddress?: Address
  
  // Discounts
  discounts?: OrderDiscount[]
  
  // Metadata
  notes?: string
  tags?: string[]
  
  // Timeline
  timeline: OrderTimelineEvent[]
  
  // Timestamps
  createdAt: string
  updatedAt: string
  completedAt?: string
  cancelledAt?: string
}

// Create order request
export interface CreateOrderRequest {
  items: Array<{
    productId: string
    quantity: number
    variant?: string
  }>
  shippingAddress: Address
  billingAddress?: Address
  paymentMethod: PaymentMethod
  notes?: string
  discountCode?: string
}

// Update order request
export interface UpdateOrderRequest {
  status?: OrderStatus
  notes?: string
  trackingNumber?: string
  shipping?: Partial<OrderShipping>
}

// Order response
export interface OrderResponse {
  success: boolean
  order?: Order
  error?: string
  message?: string
}

// Orders list response
export interface OrdersResponse {
  success: boolean
  orders: Order[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Order statistics
export interface OrderStats {
  total: number
  pending: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
  revenue: number
  averageOrderValue: number
  topProducts: Array<{
    productId: string
    name: string
    quantity: number
    revenue: number
  }>
}

// Order filter options
export interface OrderFilters {
  status?: OrderStatus
  paymentStatus?: PaymentStatus
  dateFrom?: string
  dateTo?: string
  search?: string
  customerId?: string
  minAmount?: number
  maxAmount?: number
  sortBy?: 'date' | 'amount' | 'status'
  sortOrder?: 'asc' | 'desc'
}

// Order export format
export interface OrderExport {
  id: string
  orderNumber: string
  date: string
  customer: string
  email: string
  items: string
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: string
  paymentMethod: string
  trackingNumber?: string
}

// Invoice data
export interface Invoice {
  orderId: string
  invoiceNumber: string
  date: string
  dueDate?: string
  company: {
    name: string
    email: string
    phone: string
    address: string
    taxId?: string
  }
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: Array<{
    name: string
    quantity: number
    price: number
    total: number
  }>
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  notes?: string
  terms?: string
}

// Order constants
export const ORDER_CONSTANTS = {
  STATUSES: {
    pending: 'Pending',
    processing: 'Processing',
    confirmed: 'Confirmed',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
    failed: 'Failed'
  } as Record<OrderStatus, string>,
  
  PAYMENT_METHODS: {
    cod: 'Cash on Delivery',
    bank_transfer: 'Bank Transfer',
    credit_card: 'Credit Card',
    debit_card: 'Debit Card',
    easypaisa: 'Easypaisa',
    jazzcash: 'JazzCash',
    paypal: 'PayPal'
  } as Record<PaymentMethod, string>,
  
  STATUS_COLORS: {
    pending: 'yellow',
    processing: 'blue',
    confirmed: 'purple',
    shipped: 'indigo',
    delivered: 'green',
    cancelled: 'red',
    refunded: 'orange',
    failed: 'gray'
  } as Record<OrderStatus, string>
}

// Order event types
export type OrderEvent = 
  | { type: 'CREATED'; payload: { orderId: string } }
  | { type: 'UPDATED'; payload: { orderId: string; changes: Partial<Order> } }
  | { type: 'STATUS_CHANGED'; payload: { orderId: string; from: OrderStatus; to: OrderStatus } }
  | { type: 'PAYMENT_RECEIVED'; payload: { orderId: string; amount: number; transactionId: string } }
  | { type: 'SHIPPED'; payload: { orderId: string; trackingNumber: string; carrier: string } }
  | { type: 'DELIVERED'; payload: { orderId: string; deliveredAt: string } }
  | { type: 'CANCELLED'; payload: { orderId: string; reason: string } }
  | { type: 'REFUNDED'; payload: { orderId: string; amount: number; reason: string } }