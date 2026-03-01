/**
 * Currency formatting utilities
 */
export const currency = {
  /**
   * Format amount as currency
   * @param amount - Number to format
   * @param currencyCode - Currency code (USD, EUR, GBP, PKR, etc.)
   * @param locale - Locale string (en-US, en-PK, etc.)
   */
  format: (amount: number, currencyCode: string = 'USD', locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  },

  /**
   * Format amount with symbol only (no currency code)
   */
  simple: (amount: number, symbol: string = '$'): string => {
    return `${symbol}${amount.toFixed(2)}`
  },

  /**
   * Format amount in PKR (Pakistani Rupee)
   */
  pkr: (amount: number): string => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  },

  /**
   * Format amount in USD (US Dollar)
   */
  usd: (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  },

  /**
   * Format amount in EUR (Euro)
   */
  eur: (amount: number): string => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount)
  },

  /**
   * Format discount percentage
   */
  discount: (original: number, discounted: number): string => {
    if (original <= 0) return '0%'
    const percentage = ((original - discounted) / original) * 100
    return `${Math.round(percentage)}% OFF`
  },

  /**
   * Calculate and format savings
   */
  savings: (original: number, discounted: number): string => {
    const saved = original - discounted
    if (saved <= 0) return ''
    return `Save ${currency.format(saved)}`
  },
}

/**
 * Date formatting utilities
 */
export const date = {
  /**
   * Format date to readable string
   */
  format: (date: string | Date | number, format: 'short' | 'long' | 'full' = 'short'): string => {
    const d = new Date(date)
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: format === 'short' ? 'short' : 'long',
      day: 'numeric',
    }

    if (format === 'full') {
      options.weekday = 'long'
    }

    return d.toLocaleDateString('en-US', options)
  },

  /**
   * Format date with time
   */
  dateTime: (date: string | Date | number): string => {
    const d = new Date(date)
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  },

  /**
   * Format as relative time (e.g., "2 hours ago")
   */
  relative: (date: string | Date | number): string => {
    const d = new Date(date)
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
    if (seconds > 30) return `${seconds} seconds ago`
    return 'just now'
  },

  /**
   * Format as time only
   */
  time: (date: string | Date | number): string => {
    const d = new Date(date)
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  },

  /**
   * Format as month and year
   */
  monthYear: (date: string | Date | number): string => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  },

  /**
   * Get day name
   */
  dayName: (date: string | Date | number): string => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { weekday: 'long' })
  },

  /**
   * Format for input[type="date"]
   */
  forInput: (date: string | Date | number): string => {
    const d = new Date(date)
    return d.toISOString().split('T')[0]
  },
}

/**
 * Number formatting utilities
 */
export const number = {
  /**
   * Format number with commas
   */
  format: (num: number): string => {
    return num.toLocaleString('en-US')
  },

  /**
   * Format as percentage
   */
  percent: (num: number, decimals: number = 1): string => {
    return `${(num * 100).toFixed(decimals)}%`
  },

  /**
   * Format as decimal with fixed places
   */
  decimal: (num: number, places: number = 2): string => {
    return num.toFixed(places)
  },

  /**
   * Format as compact number (e.g., 1.2K, 3.5M)
   */
  compact: (num: number): string => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1) + 'B'
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'M'
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + 'K'
    }
    return num.toString()
  },

  /**
   * Format as ordinal (1st, 2nd, 3rd, etc.)
   */
  ordinal: (num: number): string => {
    const suffixes = ['th', 'st', 'nd', 'rd']
    const v = num % 100
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0])
  },

  /**
   * Format file size
   */
  fileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },
}

/**
 * Phone number formatting utilities
 */
export const phone = {
  /**
   * Format phone number
   */
  format: (phone: string, country: 'us' | 'pk' | 'uk' = 'us'): string => {
    const cleaned = phone.replace(/\D/g, '')
    
    if (country === 'us') {
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
      }
    }
    
    if (country === 'pk') {
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        return '+92 ' + match[1] + ' ' + match[2] + ' ' + match[3]
      }
    }
    
    return phone
  },

  /**
   * Format as international
   */
  international: (phone: string, countryCode: string = '92'): string => {
    const cleaned = phone.replace(/\D/g, '')
    return `+${countryCode} ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  },

  /**
   * Mask phone number (show last 4 digits)
   */
  mask: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    const last4 = cleaned.slice(-4)
    return `***-***-${last4}`
  },
}

/**
 * Text formatting utilities
 */
export const text = {
  /**
   * Capitalize first letter
   */
  capitalize: (str: string): string => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },

  /**
   * Capitalize each word
   */
  titleCase: (str: string): string => {
    if (!str) return ''
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  },

  /**
   * Truncate text with ellipsis
   */
  truncate: (str: string, length: number = 100): string => {
    if (!str || str.length <= length) return str
    return str.slice(0, length) + '...'
  },

  /**
   * Convert to slug (URL-friendly)
   */
  slugify: (str: string): string => {
    if (!str) return ''
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim()
  },

  /**
   * Extract initials from name
   */
  initials: (name: string): string => {
    if (!name) return ''
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  },

  /**
   * Pluralize word based on count
   */
  pluralize: (word: string, count: number, plural?: string): string => {
    if (count === 1) return word
    if (plural) return plural
    return word + 's'
  },

  /**
   * Format as reading time
   */
  readingTime: (text: string): string => {
    const wordsPerMinute = 200
    const words = text.split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  },
}

/**
 * Address formatting utilities
 */
export const address = {
  /**
   * Format single line address
   */
  oneLine: (addr: {
    line1: string
    line2?: string
    city: string
    state: string
    zipCode: string
    country?: string
  }): string => {
    const parts = [addr.line1]
    if (addr.line2) parts.push(addr.line2)
    parts.push(`${addr.city}, ${addr.state} ${addr.zipCode}`)
    if (addr.country) parts.push(addr.country)
    return parts.join(', ')
  },

  /**
   * Format multi-line address
   */
  multiLine: (addr: {
    line1: string
    line2?: string
    city: string
    state: string
    zipCode: string
    country?: string
  }): string => {
    const lines = [addr.line1]
    if (addr.line2) lines.push(addr.line2)
    lines.push(`${addr.city}, ${addr.state} ${addr.zipCode}`)
    if (addr.country) lines.push(addr.country)
    return lines.join('\n')
  },
}

/**
 * Weight formatting utilities (for gemstones)
 */
export const weight = {
  /**
   * Format weight in carats
   */
  carats: (weight: number): string => {
    return `${weight.toFixed(2)} ct`
  },

  /**
   * Format weight in grams
   */
  grams: (weight: number): string => {
    return `${weight.toFixed(2)} g`
  },

  /**
   * Convert carats to grams
   */
  caratsToGrams: (carats: number): number => {
    return carats * 0.2
  },

  /**
   * Convert grams to carats
   */
  gramsToCarats: (grams: number): number => {
    return grams * 5
  },
}

/**
 * Dimension formatting utilities
 */
export const dimensions = {
  /**
   * Format dimensions (L x W x H)
   */
  format: (length: number, width: number, height: number, unit: string = 'cm'): string => {
    return `${length} × ${width} × ${height} ${unit}`
  },

  /**
   * Parse dimension string
   */
  parse: (dimensionStr: string): { length: number; width: number; height: number; unit: string } | null => {
    const match = dimensionStr.match(/(\d+)\s*[x×]\s*(\d+)\s*[x×]\s*(\d+)\s*([a-zA-Z]+)?/)
    if (!match) return null
    
    return {
      length: parseFloat(match[1]),
      width: parseFloat(match[2]),
      height: parseFloat(match[3]),
      unit: match[4] || 'cm',
    }
  },
}

/**
 * Simple formatters for common use
 */
export const simple = {
  price: (p: number) => `$${p.toFixed(2)}`,
  date: (d: string) => new Date(d).toLocaleDateString(),
  time: (d: string) => new Date(d).toLocaleTimeString(),
  number: (n: number) => n.toLocaleString(),
  percent: (n: number) => `${(n * 100).toFixed(0)}%`,
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
  truncate: (s: string, l: number) => s.length > l ? s.slice(0, l) + '...' : s,
  slug: (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  initials: (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
}