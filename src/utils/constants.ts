// App information
export const APP = {
  NAME: 'Precious Stones & Gems',
  DESCRIPTION: 'Premium imported precious stones and gems',
  VERSION: '1.0.0',
  URL: 'https://preciousgems.com',
  EMAIL: 'sajid.syed@gmail.com',
  PHONE: '+92 300 1234567',
  ADDRESS: '123 Gem Market, Anarkali, Lahore, Pakistan',
  ADMIN_NAME: 'Hafiz Sajid Syed',
  ADMIN_EMAIL: 'sajid.syed@gmail.com',
  COPYRIGHT: `© ${new Date().getFullYear()} Precious Stones & Gems. All rights reserved.`,
} as const

// Navigation items
export const NAVIGATION = {
  MAIN: [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Products', href: '/products', icon: '💎' },
    { name: 'About', href: '/about', icon: '📖' },
    { name: 'Contact', href: '/contact', icon: '📞' },
  ],
  DASHBOARD: [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Products', href: '/dashboard/products', icon: '💎' },
    { name: 'Orders', href: '/dashboard/orders', icon: '📦' },
    { name: 'Customers', href: '/dashboard/customers', icon: '👥' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ],
  FOOTER: {
    ABOUT: [
      { name: 'Our Story', href: '/about' },
      { name: 'Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
    ],
    SUPPORT: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Shipping', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Contact', href: '/contact' },
    ],
    LEGAL: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  },
} as const

// Product categories
export const CATEGORIES = {
  ALL: 'All Categories',
  CRYSTALS: 'Crystals',
  ROUGH_STONES: 'Rough Stones',
  POLISHED_GEMS: 'Polished Gems',
  TUMBLED_STONES: 'Tumbled Stones',
  FOSSILS: 'Fossils',
  JEWELRY: 'Jewelry',
  MINERALS: 'Minerals',
  CARVINGS: 'Carvings',
} as const

// Product types
export const PRODUCT_TYPES = {
  NATURAL: 'Natural',
  RAW: 'Raw',
  POLISHED: 'Polished',
  TUMBLED: 'Tumbled',
  CUT: 'Cut',
  FACETED: 'Faceted',
  ROUGH: 'Rough',
} as const

// Product origins
export const ORIGINS = {
  BRAZIL: 'Brazil',
  MYANMAR: 'Myanmar',
  SRI_LANKA: 'Sri Lanka',
  COLOMBIA: 'Colombia',
  MADAGASCAR: 'Madagascar',
  PAKISTAN: 'Pakistan',
  AFGHANISTAN: 'Afghanistan',
  INDIA: 'India',
  SOUTH_AFRICA: 'South Africa',
  USA: 'USA',
  RUSSIA: 'Russia',
  AUSTRALIA: 'Australia',
} as const

// Gemstone hardness scale
export const HARDNESS_SCALE = {
  TALC: 1,
  GYPSUM: 2,
  CALCITE: 3,
  FLUORITE: 4,
  APATITE: 5,
  FELDSPAR: 6,
  QUARTZ: 7,
  TOPAZ: 8,
  CORUNDUM: 9,
  DIAMOND: 10,
} as const

// Order statuses
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  FAILED: 'failed',
} as const

// Order status labels
export const ORDER_STATUS_LABELS: Record<string, string> = {
  [ORDER_STATUS.PENDING]: 'Pending',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.CONFIRMED]: 'Confirmed',
  [ORDER_STATUS.SHIPPED]: 'Shipped',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
  [ORDER_STATUS.REFUNDED]: 'Refunded',
  [ORDER_STATUS.FAILED]: 'Failed',
}

// Order status colors
export const ORDER_STATUS_COLORS: Record<string, string> = {
  [ORDER_STATUS.PENDING]: 'yellow',
  [ORDER_STATUS.PROCESSING]: 'blue',
  [ORDER_STATUS.CONFIRMED]: 'purple',
  [ORDER_STATUS.SHIPPED]: 'indigo',
  [ORDER_STATUS.DELIVERED]: 'green',
  [ORDER_STATUS.CANCELLED]: 'red',
  [ORDER_STATUS.REFUNDED]: 'orange',
  [ORDER_STATUS.FAILED]: 'gray',
}

// Payment methods
export const PAYMENT_METHODS = {
  COD: 'cod',
  BANK_TRANSFER: 'bank_transfer',
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  EASYPAISA: 'easypaisa',
  JAZZCASH: 'jazzcash',
  PAYPAL: 'paypal',
} as const

// Payment method labels
export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  [PAYMENT_METHODS.COD]: 'Cash on Delivery',
  [PAYMENT_METHODS.BANK_TRANSFER]: 'Bank Transfer',
  [PAYMENT_METHODS.CREDIT_CARD]: 'Credit Card',
  [PAYMENT_METHODS.DEBIT_CARD]: 'Debit Card',
  [PAYMENT_METHODS.EASYPAISA]: 'Easypaisa',
  [PAYMENT_METHODS.JAZZCASH]: 'JazzCash',
  [PAYMENT_METHODS.PAYPAL]: 'PayPal',
}

// Shipping methods
export const SHIPPING_METHODS = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  OVERNIGHT: 'overnight',
  INTERNATIONAL: 'international',
} as const

// Shipping costs
export const SHIPPING_COSTS = {
  [SHIPPING_METHODS.STANDARD]: 10,
  [SHIPPING_METHODS.EXPRESS]: 25,
  [SHIPPING_METHODS.OVERNIGHT]: 50,
  [SHIPPING_METHODS.INTERNATIONAL]: 35,
} as const

// Tax rates
export const TAX_RATES = {
  DEFAULT: 0.05, // 5%
  VAT: 0.20, // 20%
  GST: 0.10, // 10%
} as const

// Discount types
export const DISCOUNT_TYPES = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
} as const

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  CUSTOMER: 'customer',
} as const

// User role labels
export const USER_ROLE_LABELS: Record<string, string> = {
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.MANAGER]: 'Manager',
  [USER_ROLES.STAFF]: 'Staff',
  [USER_ROLES.CUSTOMER]: 'Customer',
}

// User statuses
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [10, 25, 50, 100],
  MAX_LIMIT: 100,
} as const

// Sort options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
  POPULAR: 'popular',
  RATING: 'rating',
} as const

// Sort option labels
export const SORT_OPTION_LABELS: Record<string, string> = {
  [SORT_OPTIONS.NEWEST]: 'Newest First',
  [SORT_OPTIONS.OLDEST]: 'Oldest First',
  [SORT_OPTIONS.PRICE_ASC]: 'Price: Low to High',
  [SORT_OPTIONS.PRICE_DESC]: 'Price: High to Low',
  [SORT_OPTIONS.NAME_ASC]: 'Name: A to Z',
  [SORT_OPTIONS.NAME_DESC]: 'Name: Z to A',
  [SORT_OPTIONS.POPULAR]: 'Most Popular',
  [SORT_OPTIONS.RATING]: 'Top Rated',
}

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  CART: 'cart',
  WISHLIST: 'wishlist',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
  },
  PRODUCTS: {
    LIST: '/api/products',
    DETAIL: (id: string) => `/api/products/${id}`,
    FEATURED: '/api/products/featured',
    CATEGORIES: '/api/products/categories',
  },
  ORDERS: {
    LIST: '/api/orders',
    DETAIL: (id: string) => `/api/orders/${id}`,
    CREATE: '/api/orders',
  },
  CART: {
    GET: '/api/cart',
    ADD: '/api/cart/add',
    UPDATE: '/api/cart/update',
    REMOVE: '/api/cart/remove',
    CLEAR: '/api/cart/clear',
  },
  USER: {
    PROFILE: '/api/user/profile',
    ADDRESSES: '/api/user/addresses',
    SETTINGS: '/api/user/settings',
  },
} as const

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
} as const

// Error messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  SERVER: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_EXISTS: 'Email already registered.',
  WEAK_PASSWORD: 'Password must be at least 8 characters.',
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  REGISTER: 'Registration successful!',
  LOGOUT: 'Logout successful!',
  ORDER_PLACED: 'Order placed successfully!',
  CART_UPDATED: 'Cart updated successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
} as const

// Validation rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 50,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
  ZIP_CODE_LENGTH: 5,
} as const

// Date formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY HH:mm',
  ISO: 'YYYY-MM-DD',
  API: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
} as const

// Currency
export const CURRENCY = {
  CODE: 'USD',
  SYMBOL: '$',
  LOCALE: 'en-US',
} as const

// Theme
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

// Social media links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/preciousgems',
  INSTAGRAM: 'https://instagram.com/preciousgems',
  TWITTER: 'https://twitter.com/preciousgems',
  PINTEREST: 'https://pinterest.com/preciousgems',
  YOUTUBE: 'https://youtube.com/preciousgems',
} as const

// Business hours
export const BUSINESS_HOURS = {
  MONDAY_FRIDAY: '10:00 AM - 7:00 PM',
  SATURDAY: '11:00 AM - 5:00 PM',
  SUNDAY: 'Closed',
} as const

// File upload limits
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_IMAGES_PER_PRODUCT: 10,
} as const

// Cache durations (in seconds)
export const CACHE_DURATION = {
  PRODUCTS: 300, // 5 minutes
  CATEGORIES: 3600, // 1 hour
  USER: 600, // 10 minutes
} as const