'use client'

import Link from 'next/link'
import { useState } from 'react'

interface CartItemProps {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  disabled?: boolean
}

export default function CartItem({
  id,
  productId,
  name,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove,
  disabled = false
}: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity === quantity || disabled) return
    
    setIsUpdating(true)
    await onUpdateQuantity(id, newQuantity)
    setIsUpdating(false)
  }

  const handleRemove = async () => {
    if (disabled) return
    
    setIsUpdating(true)
    await onRemove(id)
    setIsUpdating(false)
  }

  const itemTotal = price * quantity

  return (
    <div className={`bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-purple-500 hover:border-pink-500 transition-all ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex gap-4">
        {/* Product Image */}
        <Link href={`/products/${productId}`}>
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"></div>
        </Link>
        
        {/* Product Details */}
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <Link href={`/products/${productId}`}>
                <h3 className="text-lg font-semibold text-white hover:text-pink-400 transition-colors">
                  {name}
                </h3>
              </Link>
              <p className="text-pink-400 font-bold mt-1">${price}</p>
            </div>
            
            {/* Item Total */}
            <div className="text-right">
              <p className="text-sm text-purple-400">Total</p>
              <p className="text-xl font-bold text-gradient">
                ${itemTotal.toFixed(2)}
              </p>
            </div>
          </div>
          
          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <label className="text-sm text-purple-400">Qty:</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateQuantity(quantity - 1)}
                  disabled={disabled || isUpdating || quantity <= 1}
                  className="w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                
                <span className="text-white font-medium w-8 text-center">
                  {quantity}
                </span>
                
                <button
                  onClick={() => handleUpdateQuantity(quantity + 1)}
                  disabled={disabled || isUpdating}
                  className="w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Remove Button */}
            <button
              onClick={handleRemove}
              disabled={disabled || isUpdating}
              className="text-red-400 hover:text-red-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              aria-label="Remove item"
            >
              {isUpdating ? (
                <>
                  <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></span>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Remove</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}