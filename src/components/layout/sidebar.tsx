'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  variant?: 'permanent' | 'persistent' | 'temporary'
  width?: number
  position?: 'left' | 'right'
  items?: SidebarItem[]
  showHeader?: boolean
  showFooter?: boolean
}

interface SidebarItem {
  id: string
  title: string
  path: string
  icon?: string
  badge?: number | string
  children?: SidebarItem[]
  divider?: boolean
}

export default function Sidebar({
  isOpen = true,
  onClose,
  variant = 'permanent',
  width = 280,
  position = 'left',
  items = defaultSidebarItems,
  showHeader = true,
  showFooter = true
}: SidebarProps) {
  
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle variant behavior
  useEffect(() => {
    if (variant === 'temporary' && isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, variant])

  // Handle animation states for temporary sidebar
  useEffect(() => {
    if (variant === 'temporary') {
      if (isOpen) {
        setIsAnimating(true)
      } else {
        const timer = setTimeout(() => setIsAnimating(false), 300)
        return () => clearTimeout(timer)
      }
    } else {
      setIsAnimating(true)
    }
  }, [isOpen, variant])

  // Determine if sidebar should be visible
  const isVisible = variant === 'permanent' || (variant === 'persistent' && isOpen) || (variant === 'temporary' && isAnimating)
  
  if (!isVisible) return null

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/')
  }

  // Position styles
  const positionStyles = {
    left: { left: 0, transform: `translateX(${isOpen ? 0 : -width}px)` },
    right: { right: 0, transform: `translateX(${isOpen ? 0 : width}px)` }
  }

  return (
    <>
      {/* Backdrop for temporary variant */}
      {variant === 'temporary' && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 h-full bg-gradient-to-b from-purple-900 to-indigo-900 shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          variant === 'temporary' ? 'overflow-y-auto' : ''
        }`}
        style={{
          width: `${width}px`,
          ...(variant === 'temporary' 
            ? positionStyles[position] 
            : { [position]: 0 }
          )
        }}
      >
        <div className="flex flex-col h-full">
          
          {/* Header */}
          {showHeader && (
            <div className="p-4 border-b border-purple-700">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-2xl">💎</span>
                  <span className="text-lg font-bold text-gradient">Admin Panel</span>
                </Link>
                
                {variant === 'temporary' && (
                  <button
                    onClick={onClose}
                    className="p-1 text-purple-300 hover:text-pink-400 transition-colors"
                    aria-label="Close sidebar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {items.map((item) => (
                <li key={item.id}>
                  {item.divider ? (
                    <div className="my-2 border-t border-purple-700" />
                  ) : item.children ? (
                    // Parent item with children
                    <div>
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                          isActive(item.path)
                            ? 'bg-pink-600 text-white'
                            : 'text-purple-300 hover:bg-purple-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && <span className="text-xl">{item.icon}</span>}
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <span className={`transform transition-transform ${
                          expandedItems.includes(item.id) ? 'rotate-180' : ''
                        }`}>
                          ▼
                        </span>
                      </button>
                      
                      {/* Child items */}
                      {expandedItems.includes(item.id) && (
                        <ul className="ml-8 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={child.path}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                                  isActive(child.path)
                                    ? 'bg-pink-600/50 text-white'
                                    : 'text-purple-400 hover:bg-purple-800 hover:text-white'
                                }`}
                              >
                                {child.icon && <span>{child.icon}</span>}
                                <span>{child.title}</span>
                                {child.badge && (
                                  <span className="ml-auto px-2 py-0.5 text-xs bg-pink-600 rounded-full">
                                    {child.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    // Single item
                    <Link
                      href={item.path}
                      className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-pink-600 text-white'
                          : 'text-purple-300 hover:bg-purple-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && <span className="text-xl">{item.icon}</span>}
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs bg-pink-600 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          {showFooter && (
            <div className="p-4 border-t border-purple-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  H
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Hafiz Sajid Syed</p>
                  <p className="text-xs text-purple-400">Administrator</p>
                </div>
              </div>
              
              <p className="text-xs text-center text-purple-400 mt-2">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* Main content offset for permanent sidebar */}
      {variant === 'permanent' && !isMobile && (
        <div style={{ marginLeft: position === 'left' ? width : 0, marginRight: position === 'right' ? width : 0 }} />
      )}
    </>
  )
}

// Default sidebar items
const defaultSidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    icon: '📊'
  },
  {
    id: 'products',
    title: 'Products',
    path: '/dashboard/products',
    icon: '💎',
    children: [
      {
        id: 'all-products',
        title: 'All Products',
        path: '/dashboard/products',
        icon: '📋'
      },
      {
        id: 'add-product',
        title: 'Add Product',
        path: '/dashboard/products/new',
        icon: '➕'
      },
      {
        id: 'categories',
        title: 'Categories',
        path: '/dashboard/categories',
        icon: '🏷️',
        badge: 8
      }
    ]
  },
  {
    id: 'orders',
    title: 'Orders',
    path: '/dashboard/orders',
    icon: '📦',
    badge: '12',
    children: [
      {
        id: 'all-orders',
        title: 'All Orders',
        path: '/dashboard/orders',
        icon: '📋'
      },
      {
        id: 'pending',
        title: 'Pending',
        path: '/dashboard/orders?status=pending',
        icon: '⏳',
        badge: 5
      },
      {
        id: 'completed',
        title: 'Completed',
        path: '/dashboard/orders?status=completed',
        icon: '✅'
      }
    ]
  },
  {
  
    id: 'customers',
    title: 'Customers',
    path: '/dashboard/customers',
    icon: '👥'
  },
  {
    id: 'reviews',
    title: 'Reviews',
    path: '/dashboard/reviews',
    icon: '⭐',
    badge: '3'
  },
  
  {
id: 'settings',
    title: 'Settings',
    path: '/dashboard/settings',
    icon: '⚙️'
  }
]

// Simple version - COMPLETELY FIXED
export function SimpleSidebar({ isOpen = true }: { isOpen?: boolean }) {
  const pathname = usePathname()
  
  if (!isOpen) return null

  const links = [
    { id: 'nav-dashboard', href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'nav-products', href: '/dashboard/products', label: 'Products', icon: '💎' },
    { id: 'nav-orders', href: '/dashboard/orders', label: 'Orders', icon: '📦' },
    { id: 'nav-settings', href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="w-64 bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen p-4 relative">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gradient">Admin Panel</h2>
        <p className="text-xs text-purple-400 mt-1">Hafiz Sajid Syed</p>
      </div>
      
      <nav className="space-y-1">
        {links.map((link) => {
          const active = pathname === link.href || pathname?.startsWith(link.href + '/')
          
          return (
            <Link
              key={link.id}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'text-purple-300 hover:bg-purple-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
              {active && (
                <span className="ml-auto text-sm">✓</span>
              )}
            </Link>
          )
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className="text-xs text-purple-400 border-t border-purple-800 pt-4">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="text-xs text-purple-500 mt-2">sajid.syed@gmail.com</p>
      </div>
    </div>
  )
}

// Ultra Simple Version - No positioning issues
export function UltraSimpleSidebar() {
  const pathname = usePathname()
  
  const links = [
    { id: 'u-dash', href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'u-prod', href: '/dashboard/products', label: 'Products', icon: '💎' },
    { id: 'u-order', href: '/dashboard/orders', label: 'Orders', icon: '📦' },
    { id: 'u-set', href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="bg-purple-900 w-64 p-4">
      <h3 className="text-white font-bold mb-4">Menu</h3>
      {links.map(link => (
        <Link
          key={link.id}
          href={link.href}
          className={`block py-2 px-3 rounded mb-1 ${
            pathname === link.href ? 'bg-pink-600' : 'hover:bg-purple-800'
          }`}
        >
          {link.icon} {link.label}
        </Link>
      ))}
      <div className="mt-6 pt-4 border-t border-purple-700">
        <p className="text-xs text-purple-300">Hafiz Sajid Syed</p>
      </div>
    </div>
  )
}