'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/button'

interface CartSummaryProps {
  subtotal: number
  shipping?: number
  freeShippingThreshold?: number
  tax?: number
  discount?: number
  promoCode?: string
  onApplyPromo?: (code: string) => void
  onCheckout?: () => void
  isCheckoutDisabled?: boolean
}

export default function CartSummary({
  subtotal,
  shipping = 10,
  freeShippingThreshold = 100,
  tax = 0,
  discount = 0,
  promoCode = '',
  onApplyPromo,
  onCheckout,
  isCheckoutDisabled = false
}: CartSummaryProps) {
  
  const [promoInput, setPromoInput] = useState('')
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [promoError, setPromoError] = useState('')
  const [promoSuccess, setPromoSuccess] = useState('')

  // Calculate shipping
  const calculatedShipping = subtotal >= freeShippingThreshold ? 0 : shipping
  
  // Calculate tax (default 5% if not provided)
  const calculatedTax = tax > 0 ? tax : subtotal * 0.05
  
  // Calculate total
  const total = subtotal + calculatedShipping + calculatedTax - discount

  const handleApplyPromo = async () => {
    if (!promoInput.trim() || !onApplyPromo) return
    
    setIsApplyingPromo(true)
    setPromoError('')
    setPromoSuccess('')
    
    try {
      await onApplyPromo(promoInput)
      setPromoSuccess('Promo code applied!')
      setPromoInput('')
    } catch {
      setPromoError('Invalid promo code')
    } finally {
      setIsApplyingPromo(false)
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gradient mb-4">Order Summary</h2>
      
      {/* Price Breakdown */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-purple-300">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-purple-300">
          <span>Shipping</span>
          {calculatedShipping === 0 ? (
            <span className="text-green-400">Free</span>
          ) : (
            <span>${calculatedShipping.toFixed(2)}</span>
          )}
        </div>
        
        <div className="flex justify-between text-purple-300">
          <span>Tax (5%)</span>
          <span>${calculatedTax.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-400">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t border-purple-800 pt-3 mt-3">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-white">Total</span>
            <span className="text-gradient">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Free Shipping Progress */}
      {calculatedShipping > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-purple-400 mb-1">
            <span>Free shipping</span>
            <span>${(freeShippingThreshold - subtotal).toFixed(2)} more</span>
          </div>
          <div className="w-full h-2 bg-purple-900/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Promo Code */}
      {onApplyPromo && (
        <div className="mb-4">
          <label className="block text-sm text-purple-400 mb-2">Promo Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
              placeholder="Enter code"
              className="flex-1 px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white text-sm focus:border-pink-500 focus:outline-none"
              disabled={isApplyingPromo}
            />
            <button
              onClick={handleApplyPromo}
              disabled={isApplyingPromo || !promoInput.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isApplyingPromo ? '...' : 'Apply'}
            </button>
          </div>
          
          {/* Promo Messages */}
          {promoError && (
            <p className="text-red-400 text-xs mt-1">{promoError}</p>
          )}
          {promoSuccess && (
            <p className="text-green-400 text-xs mt-1">{promoSuccess}</p>
          )}
          {promoCode && (
            <p className="text-green-400 text-xs mt-1">
              Promo {promoCode} applied!
            </p>
          )}
        </div>
      )}

      {/* Checkout Button */}
      <Button 
        variant="primary" 
        fullWidth
        onClick={onCheckout}
        disabled={isCheckoutDisabled || subtotal === 0}
      >
        {subtotal === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}
      </Button>

      {/* Payment Methods */}
      <div className="mt-4 text-center">
        <p className="text-xs text-purple-400 mb-2">We accept:</p>
        <div className="flex justify-center gap-3 text-2xl">
          <span className="opacity-70 hover:opacity-100 transition-opacity">💳</span>
          <span className="opacity-70 hover:opacity-100 transition-opacity">🏦</span>
          <span className="opacity-70 hover:opacity-100 transition-opacity">📱</span>
          <span className="opacity-70 hover:opacity-100 transition-opacity">💰</span>
        </div>
      </div>

      {/* Secure Checkout Notice */}
      <div className="mt-4 text-center text-xs text-purple-500 border-t border-purple-800 pt-4">
        <p>🔒 Secure checkout · 30-day returns · Authenticity guaranteed</p>
      </div>

      {/* Continue Shopping Link */}
      <div className="mt-4 text-center">
        <Link href="/products">
          <button className="text-sm text-purple-400 hover:text-pink-400 transition-colors">
            ← Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}