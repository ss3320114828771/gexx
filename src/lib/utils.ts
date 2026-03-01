// Formatting utilities
export const formatters = {
  // Format currency
  currency: (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  },

  // Format date
  date: (date: string | Date, format: 'short' | 'long' | 'relative' = 'short'): string => {
    const d = new Date(date)
    
    if (format === 'relative') {
      const now = new Date()
      const diff = now.getTime() - d.getTime()
      const seconds = Math.floor(diff / 1000)
      const minutes = Math.floor(seconds / 60)
      const hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)
      const months = Math.floor(days / 30)
      const years = Math.floor(months / 12)

      if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`
      if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`
      if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
      if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
      return 'just now'
    }

    if (format === 'long') {
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  },

  // Format number with commas
  number: (num: number): string => {
    return num.toLocaleString('en-US')
  },

  // Format phone number
  phone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return phone
  },

  // Truncate text
  truncate: (text: string, length: number = 100): string => {
    if (text.length <= length) return text
    return text.substring(0, length) + '...'
  },

  // Slugify string
  slugify: (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim()
  }
}

// Validation utilities
export const validators = {
  // Email validation
  email: (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  },

  // Phone validation
  phone: (phone: string): boolean => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    return re.test(phone)
  },

  // URL validation
  url: (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  // Password strength
  password: (password: string): { valid: boolean; message: string } => {
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
    return { valid: true, message: 'Password is strong' }
  },

  // Credit card validation (basic)
  creditCard: (number: string): boolean => {
    const re = /^[0-9]{16}$/
    return re.test(number.replace(/\s/g, ''))
  }
}

// Array utilities
export const arrayUtils = {
  // Group array by key
  groupBy: <T>(array: T[], key: keyof T): Record<string, T[]> => {
    return array.reduce((result, item) => {
      const groupKey = String(item[key])
      if (!result[groupKey]) {
        result[groupKey] = []
      }
      result[groupKey].push(item)
      return result
    }, {} as Record<string, T[]>)
  },

  // Sort array by key
  sortBy: <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
    return [...array].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })
  },

  // Unique array
  unique: <T>(array: T[]): T[] => {
    return [...new Set(array)]
  },

  // Chunk array
  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  },

  // Random item from array
  random: <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)]
  }
}

// Object utilities
export const objectUtils = {
  // Pick specific keys
  pick: <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    return keys.reduce((result, key) => {
      if (key in obj) {
        result[key] = obj[key]
      }
      return result
    }, {} as Pick<T, K>)
  },

  // Omit specific keys
  omit: <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = { ...obj }
    keys.forEach(key => delete result[key])
    return result
  },

  // Check if object is empty
  isEmpty: (obj: object): boolean => {
    return Object.keys(obj).length === 0
  },

  // Deep clone
  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj))
  }
}

// String utilities
export const stringUtils = {
  // Capitalize first letter
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },

  // Capitalize each word
  titleCase: (str: string): string => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  },

  // Reverse string
  reverse: (str: string): string => {
    return str.split('').reverse().join('')
  },

  // Count words
  wordCount: (str: string): number => {
    return str.trim().split(/\s+/).length
  },

  // Generate random string
  random: (length: number = 8): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
}

// Math utilities
export const mathUtils = {
  // Calculate percentage
  percentage: (value: number, total: number): number => {
    if (total === 0) return 0
    return (value / total) * 100
  },

  // Round to decimal places
  round: (value: number, decimals: number = 2): number => {
    return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals)
  },

  // Random between min and max
  random: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  // Clamp value between min and max
  clamp: (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max)
  }
}

// Storage utilities
export const storage = {
  // Local storage
  local: {
    set: <T>(key: string, value: T): void => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
      }
    },
    get: <T>(key: string): T | null => {
      if (typeof window !== 'undefined') {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
      }
      return null
    },
    remove: (key: string): void => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key)
      }
    },
    clear: (): void => {
      if (typeof window !== 'undefined') {
        localStorage.clear()
      }
    }
  },

  // Session storage
  session: {
    set: <T>(key: string, value: T): void => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(value))
      }
    },
    get: <T>(key: string): T | null => {
      if (typeof window !== 'undefined') {
        const item = sessionStorage.getItem(key)
        return item ? JSON.parse(item) : null
      }
      return null
    },
    remove: (key: string): void => {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(key)
      }
    },
    clear: (): void => {
      if (typeof window !== 'undefined') {
        sessionStorage.clear()
      }
    }
  },

  // Cookies (simple)
  cookies: {
    set: (name: string, value: string, days: number = 7): void => {
      if (typeof window !== 'undefined') {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`
      }
    },
    get: (name: string): string | null => {
      if (typeof window !== 'undefined') {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
        return match ? match[2] : null
      }
      return null
    },
    remove: (name: string): void => {
      if (typeof window !== 'undefined') {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      }
    }
  }
}

// Color utilities
export const colors = {
  // Hex to RGB
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  },

  // RGB to Hex
  rgbToHex: (r: number, g: number, b: number): string => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  },

  // Lighten color
  lighten: (color: string, percent: number): string => {
    const rgb = colors.hexToRgb(color)
    if (!rgb) return color
    
    const lighten = (value: number) => Math.min(255, Math.floor(value + (255 - value) * percent))
    return colors.rgbToHex(
      lighten(rgb.r),
      lighten(rgb.g),
      lighten(rgb.b)
    )
  },

  // Darken color
  darken: (color: string, percent: number): string => {
    const rgb = colors.hexToRgb(color)
    if (!rgb) return color
    
    const darken = (value: number) => Math.max(0, Math.floor(value * (1 - percent)))
    return colors.rgbToHex(
      darken(rgb.r),
      darken(rgb.g),
      darken(rgb.b)
    )
  }
}

// Simple version
export const utils = {
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
  formatDate: (date: string) => new Date(date).toLocaleDateString(),
  capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
  slugify: (str: string) => str.toLowerCase().replace(/\s+/g, '-'),
  truncate: (str: string, len: number) => str.length > len ? str.slice(0, len) + '...' : str,
  randomId: () => Math.random().toString(36).substring(2, 9)
}