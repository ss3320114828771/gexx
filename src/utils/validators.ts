/**
 * Email validation
 */
export const email = (email: string): boolean => {
  if (!email) return false
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Email validation with detailed result
 */
export const emailDetailed = (email: string): { valid: boolean; message?: string } => {
  if (!email) {
    return { valid: false, message: 'Email is required' }
  }
  
  if (email.length > 254) {
    return { valid: false, message: 'Email is too long' }
  }
  
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!re.test(email)) {
    return { valid: false, message: 'Please enter a valid email address' }
  }
  
  return { valid: true }
}

/**
 * Phone number validation
 */
export const phone = (phone: string): boolean => {
  if (!phone) return false
  // International format: +92 300 1234567 or 0300 1234567
  const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{3,4}$/
  return re.test(phone)
}

/**
 * Phone validation with country code
 */
export const phoneWithCountry = (phone: string, country: 'pk' | 'us' | 'uk' = 'pk'): boolean => {
  const cleaned = phone.replace(/\D/g, '')
  
  if (country === 'pk') {
    // Pakistan: 10-11 digits, may start with 0 or 92
    return cleaned.length >= 10 && cleaned.length <= 12
  }
  
  if (country === 'us') {
    // US: 10 digits
    return cleaned.length === 10
  }
  
  if (country === 'uk') {
    // UK: 10-11 digits
    return cleaned.length >= 10 && cleaned.length <= 11
  }
  
  return false
}

/**
 * Password validation
 */
export const password = (password: string): boolean => {
  if (!password) return false
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  return re.test(password)
}

/**
 * Password validation with detailed result
 */
export const passwordDetailed = (password: string): { valid: boolean; message?: string } => {
  if (!password) {
    return { valid: false, message: 'Password is required' }
  }
  
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' }
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' }
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' }
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' }
  }
  
  return { valid: true }
}

/**
 * Confirm password validation
 */
export const confirmPassword = (password: string, confirm: string): boolean => {
  return password === confirm
}

/**
 * Name validation
 */
export const name = (name: string, minLength: number = 2): boolean => {
  if (!name) return false
  return name.trim().length >= minLength
}

/**
 * Username validation
 */
export const username = (username: string): boolean => {
  if (!username) return false
  // Alphanumeric, underscore, 3-20 characters
  const re = /^[a-zA-Z0-9_]{3,20}$/
  return re.test(username)
}

/**
 * URL validation
 */
export const url = (url: string): boolean => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Credit card number validation (Luhn algorithm)
 */
export const creditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '')
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false
  }
  
  // Luhn algorithm
  let sum = 0
  let double = false
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i))
    
    if (double) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
    double = !double
  }
  
  return sum % 10 === 0
}

/**
 * Credit card expiration validation
 */
export const cardExpiry = (month: string, year: string): boolean => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1
  
  const expMonth = parseInt(month, 10)
  const expYear = parseInt(year, 10)
  
  if (expMonth < 1 || expMonth > 12) return false
  if (expYear < currentYear) return false
  if (expYear === currentYear && expMonth < currentMonth) return false
  
  return true
}

/**
 * CVV validation
 */
export const cvv = (cvv: string): boolean => {
  const cleaned = cvv.replace(/\D/g, '')
  return cleaned.length >= 3 && cleaned.length <= 4
}

/**
 * Postal/ZIP code validation
 */
export const postalCode = (code: string, country: 'us' | 'pk' | 'uk' = 'us'): boolean => {
  const cleaned = code.replace(/\s/g, '')
  
  if (country === 'us') {
    // US ZIP: 5 digits or 5+4
    return /^\d{5}(-\d{4})?$/.test(cleaned)
  }
  
  if (country === 'pk') {
    // Pakistan: 5 digits
    return /^\d{5}$/.test(cleaned)
  }
  
  if (country === 'uk') {
    // UK postcode: various formats
    return /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i.test(cleaned)
  }
  
  return false
}

/**
 * Numeric validation
 */
export const numeric = {
  /**
   * Check if value is a number
   */
  isNumber: (value: any): boolean => {
    return !isNaN(parseFloat(value)) && isFinite(value)
  },
  
  /**
   * Check if number is positive
   */
  positive: (value: number): boolean => {
    return value > 0
  },
  
  /**
   * Check if number is negative
   */
  negative: (value: number): boolean => {
    return value < 0
  },
  
  /**
   * Check if number is within range
   */
  inRange: (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max
  },
  
  /**
   * Check if integer
   */
  integer: (value: number): boolean => {
    return Number.isInteger(value)
  },
}

/**
 * String validation
 */
export const string = {
  /**
   * Check if string is empty
   */
  notEmpty: (str: string): boolean => {
    return str.trim().length > 0
  },
  
  /**
   * Check minimum length
   */
  minLength: (str: string, min: number): boolean => {
    return str.length >= min
  },
  
  /**
   * Check maximum length
   */
  maxLength: (str: string, max: number): boolean => {
    return str.length <= max
  },
  
  /**
   * Check exact length
   */
  exactLength: (str: string, length: number): boolean => {
    return str.length === length
  },
  
  /**
   * Check if contains only letters
   */
  letters: (str: string): boolean => {
    return /^[a-zA-Z]+$/.test(str)
  },
  
  /**
   * Check if contains only numbers
   */
  numbers: (str: string): boolean => {
    return /^\d+$/.test(str)
  },
  
  /**
   * Check if contains only alphanumeric
   */
  alphanumeric: (str: string): boolean => {
    return /^[a-zA-Z0-9]+$/.test(str)
  },
}

/**
 * Date validation
 */
export const date = {
  /**
   * Check if valid date
   */
  isValid: (date: any): boolean => {
    const d = new Date(date)
    return d instanceof Date && !isNaN(d.getTime())
  },
  
  /**
   * Check if date is in past
   */
  isPast: (date: Date | string): boolean => {
    const d = new Date(date)
    return d < new Date()
  },
  
  /**
   * Check if date is in future
   */
  isFuture: (date: Date | string): boolean => {
    const d = new Date(date)
    return d > new Date()
  },
  
  /**
   * Check if date is today
   */
  isToday: (date: Date | string): boolean => {
    const d = new Date(date)
    const today = new Date()
    return d.toDateString() === today.toDateString()
  },
  
  /**
   * Check if date is within range
   */
  inRange: (date: Date | string, start: Date | string, end: Date | string): boolean => {
    const d = new Date(date)
    const s = new Date(start)
    const e = new Date(end)
    return d >= s && d <= e
  },
}

/**
 * File validation
 */
export const file = {
  /**
   * Check file size (in bytes)
   */
  maxSize: (file: File, maxBytes: number): boolean => {
    return file.size <= maxBytes
  },
  
  /**
   * Check file type
   */
  type: (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type)
  },
  
  /**
   * Check file extension
   */
  extension: (file: File, allowedExtensions: string[]): boolean => {
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    return allowedExtensions.includes(ext)
  },
  
  /**
   * Check if image
   */
  isImage: (file: File): boolean => {
    return file.type.startsWith('image/')
  },
}

/**
 * Form validation
 */
export const form = {
  /**
   * Check if all fields are valid
   */
  isValid: (errors: Record<string, any>): boolean => {
    return Object.values(errors).every(value => !value)
  },
  
  /**
   * Get first error message
   */
  firstError: (errors: Record<string, string>): string | null => {
    const values = Object.values(errors)
    return values.length > 0 ? values[0] : null
  },
  
  /**
   * Check if field has error
   */
  hasError: (errors: Record<string, any>, field: string): boolean => {
    return !!errors[field]
  },
}

/**
 * Simple validators for common use
 */
export const simple = {
  email: (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),
  phone: (p: string) => p.replace(/\D/g, '').length >= 10,
  password: (p: string) => p.length >= 6,
  notEmpty: (s: string) => s.trim().length > 0,
  isNumber: (n: any) => !isNaN(parseFloat(n)) && isFinite(n),
  minLength: (s: string, min: number) => s.length >= min,
  maxLength: (s: string, max: number) => s.length <= max,
  matches: (s1: string, s2: string) => s1 === s2,
}

/**
 * Validation rules for common fields
 */
export const rules = {
  required: (value: any): boolean => {
    if (value === null || value === undefined) return false
    if (typeof value === 'string') return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    return true
  },
  
  email: (value: string): boolean => {
    return email(value)
  },
  
  phone: (value: string): boolean => {
    return phone(value)
  },
  
  password: (value: string): boolean => {
    return password(value)
  },
  
  min: (value: number, min: number): boolean => {
    return value >= min
  },
  
  max: (value: number, max: number): boolean => {
    return value <= max
  },
  
  minLength: (value: string, min: number): boolean => {
    return value.length >= min
  },
  
  maxLength: (value: string, max: number): boolean => {
    return value.length <= max
  },
  
  pattern: (value: string, pattern: RegExp): boolean => {
    return pattern.test(value)
  },
}