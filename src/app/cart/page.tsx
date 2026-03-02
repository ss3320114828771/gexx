'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import Button from '@/components/ui/button'

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  // Load cart on mount
  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)
      // In real app, fetch from API
      // const res = await fetch('/api/cart')
      // const data = await res.json()
      
      // Mock data for demo - FIXED: Added proper image paths
      setTimeout(() => {
        setCartItems([
          {
            id: '1',
            productId: '1',
            name: 'Amethyst Crystal',
            price: 299,
            quantity: 1,
            image: '/n1.jpeg' // FIXED: Added slash and extension
          },
          {
            id: '2',
            productId: '2',
            name: 'Ruby Rough',
            price: 499,
            quantity: 2,
            image: '/n2.jpeg' // FIXED: Added slash and extension
          }
        ])
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Failed to load cart')
      setLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setUpdating(true)
    
    // In real app, call API
    // await fetch('/api/cart', {
    //   method: 'PUT',
    //   body: JSON.stringify({ itemId, quantity: newQuantity })
    // })
    
    // Update local state
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
    
    setUpdating(false)
  }

  const removeItem = async (itemId: string) => {
    setUpdating(true)
    
    // In real app, call API
    // await fetch(`/api/cart?itemId=${itemId}`, { method: 'DELETE' })
    
    // Update local state
    setCartItems(prev => prev.filter(item => item.id !== itemId))
    
    setUpdating(false)
  }

  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear your cart?')) return
    
    setUpdating(true)
    
    // In real app, call API
    // await fetch('/api/cart?clear=true', { method: 'DELETE' })
    
    // Update local state
    setCartItems([])
    
    setUpdating(false)
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-purple-300">Loading your cart...</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Shopping Cart
          </h1>
          <p className="text-xl text-purple-200">
            {cartItems.length === 0 
              ? 'Your cart is empty' 
              : `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`
            }
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4"></div>
        </div>

        {/* Bismillah */}
        <div className="text-center mb-8">
          <p className="text-2xl text-gradient font-arabic">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="max-w-md mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 text-center border border-purple-500">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-pink-400 mb-4">Your Cart is Empty</h2>
            <p className="text-purple-300 mb-6">
              Looks like you haven't added any gems to your collection yet.
            </p>
            <Link href="/products">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          // Cart with items
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-purple-500 hover:border-pink-500 transition-all"
                >
                  <div className="flex gap-4">
                    {/* Product Image - FIXED: Added actual image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0">
                      {item.image && (
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if image doesn't load
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="text-lg font-semibold text-white hover:text-pink-400 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-pink-400 font-bold mt-1">${item.price}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={updating || item.quantity <= 1}
                          className="w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-white font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={updating}
                          className="w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center"
                        >
                          +
                        </button>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={updating}
                          className="ml-auto text-red-400 hover:text-red-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-sm text-purple-400">Total</p>
                      <p className="text-xl font-bold text-gradient">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <div className="text-right">
                <button
                  onClick={clearCart}
                  disabled={updating}
                  className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500 sticky top-4">
                <h2 className="text-xl font-bold text-gradient mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-purple-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-purple-300">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-purple-400">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-purple-800 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-gradient">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mb-4">
                  <label className="block text-sm text-purple-400 mb-2">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white text-sm focus:border-pink-500 focus:outline-none"
                    />
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <Button variant="primary" fullWidth>
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Continue Shopping */}
                <Link href="/products">
                  <button className="w-full text-center text-sm text-purple-400 hover:text-pink-400 mt-4">
                    ← Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  )
}