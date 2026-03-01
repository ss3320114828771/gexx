// User roles
export type UserRole = 'admin' | 'manager' | 'staff' | 'customer'

// User status
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending'

// User gender
export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say'

// Main User interface
export interface User {
  // Core fields
  id: string
  email: string
  password?: string // Only included in API responses when needed
  role: UserRole
  status: UserStatus
  
  // Personal info
  firstName: string
  lastName: string
  fullName: string
  displayName?: string
  
  // Contact
  phone?: string
  alternatePhone?: string
  
  // Demographics
  gender?: Gender
  dateOfBirth?: string
  
  // Profile
  avatar?: string
  bio?: string
  
  // Addresses
  addresses?: UserAddress[]
  defaultAddressId?: string
  
  // Preferences
  preferences?: UserPreferences
  
  // Account metadata
  emailVerified: boolean
  phoneVerified: boolean
  twoFactorEnabled: boolean
  
  // Social logins
  socialAccounts?: SocialAccount[]
  
  // Activity
  lastLoginAt?: string
  lastActiveAt?: string
  loginCount: number
  
  // Timestamps
  createdAt: string
  updatedAt: string
  deletedAt?: string // For soft delete
}

// User address interface
export interface UserAddress {
  id: string
  type: 'shipping' | 'billing' | 'both'
  isDefault: boolean
  
  // Recipient
  firstName: string
  lastName: string
  phone: string
  
  // Address
  line1: string
  line2?: string
  city: string
  state: string
  zipCode: string
  country: string
  
  // Additional
  company?: string
  instructions?: string
  isResidential?: boolean
  
  // Metadata
  createdAt: string
  updatedAt: string
}

// User preferences interface
export interface UserPreferences {
  // Communication
  emailNotifications: boolean
  smsNotifications: boolean
  marketingEmails: boolean
  
  // Privacy
  showProfile: boolean
  showEmail: boolean
  showPhone: boolean
  
  // Display
  theme?: 'light' | 'dark' | 'system'
  language?: string
  currency?: string
  timezone?: string
  
  // Shopping
  wishlistVisibility?: 'public' | 'private'
  savePaymentMethods: boolean
  saveShippingInfo: boolean
  
  // Notifications
  orderUpdates: boolean
  promotions: boolean
  newsletters: boolean
  productAlerts: boolean
}

// Social account interface
export interface SocialAccount {
  provider: 'google' | 'facebook' | 'apple' | 'github'
  providerId: string
  email: string
  name?: string
  avatar?: string
  connectedAt: string
  lastUsed?: string
}

// User session interface
export interface UserSession {
  id: string
  userId: string
  token: string
  device?: string
  browser?: string
  os?: string
  ip?: string
  location?: string
  lastActive: string
  expiresAt: string
  createdAt: string
}

// User activity log
export interface UserActivity {
  id: string
  userId: string
  action: string
  details?: Record<string, any>
  ip?: string
  userAgent?: string
  createdAt: string
}

// User permissions
export interface UserPermission {
  id: string
  name: string
  description?: string
  resource: string
  action: 'create' | 'read' | 'update' | 'delete' | 'manage'
}

// User role definition
export interface UserRoleDefinition {
  name: UserRole
  description: string
  permissions: UserPermission[]
  isDefault?: boolean
  isSystem?: boolean
}

// User registration data
export interface UserRegistrationData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
  acceptTerms: boolean
  acceptMarketing?: boolean
}

// User login credentials
export interface UserLoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

// User login response
export interface UserLoginResponse {
  success: boolean
  user?: User
  token?: string
  refreshToken?: string
  expiresIn?: number
  error?: string
  message?: string
}

// User registration response
export interface UserRegistrationResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
  message?: string
  requiresVerification?: boolean
}

// Password reset request
export interface PasswordResetRequest {
  email: string
}

// Password reset confirmation
export interface PasswordResetConfirm {
  token: string
  newPassword: string
  confirmPassword: string
}

// Email verification
export interface EmailVerification {
  token: string
}

// Update profile request
export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  displayName?: string
  phone?: string
  gender?: Gender
  dateOfBirth?: string
  bio?: string
  avatar?: string
}

// Change password request
export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// User search filters
export interface UserFilters {
  role?: UserRole
  status?: UserStatus
  search?: string
  verified?: boolean
  dateFrom?: string
  dateTo?: string
  sortBy?: 'name' | 'email' | 'createdAt' | 'lastLogin'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

// Users list response
export interface UsersResponse {
  success: boolean
  users: User[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// User statistics
export interface UserStats {
  total: number
  active: number
  inactive: number
  suspended: number
  pending: number
  newToday: number
  newThisWeek: number
  newThisMonth: number
  verified: number
  unverified: number
  byRole: Record<UserRole, number>
  topCountries: Array<{ country: string; count: number }>
}

// User token payload (JWT)
export interface UserTokenPayload {
  userId: string
  email: string
  role: UserRole
  exp: number
  iat: number
}

// User context state (for frontend)
export interface UserContextState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

// User context actions
export interface UserContextActions {
  login: (email: string, password: string) => Promise<boolean>
  register: (data: UserRegistrationData) => Promise<boolean>
  logout: () => void
  updateProfile: (data: UpdateProfileRequest) => Promise<boolean>
  changePassword: (data: ChangePasswordRequest) => Promise<boolean>
  refreshUser: () => Promise<void>
}

// User context type
export interface UserContextType extends UserContextState, UserContextActions {}

// Admin user summary (for dashboard)
export interface UserSummary {
  id: string
  fullName: string
  email: string
  role: UserRole
  status: UserStatus
  orders: number
  totalSpent: number
  lastOrder?: string
  createdAt: string
}

// Customer specific fields
export interface Customer extends User {
  loyaltyPoints?: number
  loyaltyTier?: 'bronze' | 'silver' | 'gold' | 'platinum'
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  lastOrderDate?: string
  wishlist?: string[] // Product IDs
  recentlyViewed?: string[] // Product IDs
}

// Staff/Admin specific fields
export interface StaffMember extends User {
  employeeId?: string
  department?: string
  position?: string
  hireDate?: string
  managerId?: string
  permissions: string[]
}

// User constants
export const USER_CONSTANTS = {
  ROLES: {
    admin: 'Administrator',
    manager: 'Manager',
    staff: 'Staff',
    customer: 'Customer'
  } as Record<UserRole, string>,
  
  STATUSES: {
    active: 'Active',
    inactive: 'Inactive',
    suspended: 'Suspended',
    pending: 'Pending Verification'
  } as Record<UserStatus, string>,
  
  STATUS_COLORS: {
    active: 'green',
    inactive: 'gray',
    suspended: 'red',
    pending: 'yellow'
  } as Record<UserStatus, string>,
  
  DEFAULT_PREFERENCES: {
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    showProfile: true,
    showEmail: false,
    showPhone: false,
    theme: 'system',
    language: 'en',
    currency: 'USD',
    timezone: 'UTC',
    wishlistVisibility: 'private',
    savePaymentMethods: false,
    saveShippingInfo: true,
    orderUpdates: true,
    promotions: false,
    newsletters: false,
    productAlerts: false
  } as UserPreferences
}