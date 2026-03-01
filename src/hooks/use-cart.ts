'use client'

import { useState, useEffect } from 'react'

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  maxStock?: number
}

interface CartSummary {
  subtotal: number
  shipping: number
  tax: number
  total: number
  itemCount: number
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, loading])

  // Add item to cart
  const addItem = (product: {
    id: string
    name: string
    price: number
    image?: string
    stock?: number
  }, quantity: number = 1) => {
    setUpdating(true)

    setItems(current => {
      const existing = current.find(item => item.productId === product.id)

      if (existing) {
        // Update quantity if item exists
        return current.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Add new item
        return [...current, {
          id: Date.now().toString(),
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image,
          maxStock: product.stock
        }]
      }
    })

    setUpdating(false)
  }

  // Update item quantity
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setUpdating(true)
    setItems(current =>
      current.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
    setUpdating(false)
  }

  // Remove item from cart
  const removeItem = (itemId: string) => {
    setUpdating(true)
    setItems(current => current.filter(item => item.id !== itemId))
    setUpdating(false)
  }

  // Clear entire cart
  const clearCart = () => {
    setUpdating(true)
    setItems([])
    setUpdating(false)
  }

  // Check if item exists in cart
  const isInCart = (productId: string) => {
    return items.some(item => item.productId === productId)
  }

  // Get item quantity
  const getItemQuantity = (productId: string) => {
    const item = items.find(item => item.productId === productId)
    return item?.quantity || 0
  }

  // Calculate cart summary
  const summary: CartSummary = {
    subtotal: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    shipping: 10, // Fixed shipping cost
    tax: items.reduce((sum, item) => sum + (item.price * item.quantity * 0.05), 0), // 5% tax
    total: 0,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
  }

  summary.total = summary.subtotal + summary.shipping + summary.tax

  return {
    items,
    loading,
    updating,
    summary,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    isInCart,
    getItemQuantity,
    isEmpty: items.length === 0
  }
}

// Simple version
export function useSimpleCart() {
  const [items, setItems] = useState<any[]>([])

  const addItem = (product: any) => {
    setItems([...items, { ...product, id: Date.now() }])
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return { items, addItem, removeItem, total }
}

// LocalStorage version with persistence
export function usePersistentCart() {
  const [items, setItems] = useState<any[]>([])

  // Load on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])

  // Save on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (product: any) => {
    setItems([...items, { ...product, cartId: Date.now() }])
  }

  const removeItem = (cartId: string) => {
    setItems(items.filter(item => item.cartId !== cartId))
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return { items, addItem, removeItem, clearCart, total }
}