'use client'

import { useState } from 'react'
import Link from 'next/link'  // Added missing import
import Button from '@/components/ui/button'

interface CheckoutFormProps {
  onSubmit: (formData: CheckoutFormData) => void
  isSubmitting?: boolean
  total?: number
}

export interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  paymentMethod: 'cod' | 'bank_transfer' | 'credit_card' | 'easypaisa' | 'jazzcash'
  notes?: string
}

export default function CheckoutForm({ onSubmit, isSubmitting = false, total = 0 }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
    paymentMethod: 'cod',
    notes: ''
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name as keyof CheckoutFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {}

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Bismillah */}
      <div className="text-center mb-4">
        <p className="text-lg text-gradient">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      </div>

      {/* Contact Information */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6">
        <h3 className="text-lg font-semibold text-pink-400 mb-4">Contact Information</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-purple-400 mb-1">
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-purple-900/30 border rounded-lg text-white focus:border-pink-500 focus:outline-none ${
                errors.firstName ? 'border-red-500' : 'border-purple-500'
              }`}
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-purple-400 mb-1">
              Last Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-purple-900/30 border rounded-lg text-white focus:border-pink-500 focus:outline-none ${
                errors.lastName ? 'border-red-500' : 'border-purple-500'
              }`}
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-purple-400 mb-1">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-purple-900/30 border rounded-lg text-white focus:border-pink-500 focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-purple-500'
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-purple-400 mb-1">
              Phone <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+92 300 1234567"
              className={`w-full px-3 py-2 bg-purple-900/30 border rounded-lg text-white focus:border-pink-500 focus:outline-none ${
                errors.phone ? 'border-red-500' : 'border-purple-500'
              }`}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6">
        <h3 className="text-lg font-semibold text-pink-400 mb-4">Shipping Address</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-purple-400 mb-1">
              Street Address <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-purple-900/30 border rounded-lg text-white focus:border-pink-500 focus:outline-none ${
                errors.address ? 'border-red-500' : 'border-purple-500'
              }`}
              disabled={isSubmitting}
            />
            {errors.address && (
              <p className="text-red-400 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-purple-400 mb-1">
                City <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-purple-900/30 border rounded-lg text-white focus:border-pink-500 focus:outline-none ${
                  errors.city ? 'border-red-500' : 'border-purple-500'
                }`}
                disabled={isSubmitting}
              />
              {errors.city && (
                <p className="text-red-400 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-purple-400 mb-1">State/Province</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm text-purple-400 mb-1">
                ZIP Code <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`w-full px-3 py-2 bg-purple-900/30 border rounded-lg text-white focus:border-pink-500 focus:outline-none ${
                  errors.zipCode ? 'border-red-500' : 'border-purple-500'
                }`}
                disabled={isSubmitting}
              />
              {errors.zipCode && (
                <p className="text-red-400 text-xs mt-1">{errors.zipCode}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-purple-400 mb-1">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                disabled={isSubmitting}
              >
                <option value="Pakistan">Pakistan</option>
                <option value="UAE">UAE</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6">
        <h3 className="text-lg font-semibold text-pink-400 mb-4">Payment Method</h3>
        
        <div className="grid md:grid-cols-2 gap-3">
          <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
            formData.paymentMethod === 'cod' 
              ? 'border-pink-500 bg-pink-500/10' 
              : 'border-purple-500 hover:border-pink-500'
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === 'cod'}
              onChange={handleChange}
              className="w-4 h-4 text-pink-500"
              disabled={isSubmitting}
            />
            <div>
              <span className="text-white font-medium">Cash on Delivery</span>
              <p className="text-xs text-purple-400">Pay when you receive</p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
            formData.paymentMethod === 'bank_transfer' 
              ? 'border-pink-500 bg-pink-500/10' 
              : 'border-purple-500 hover:border-pink-500'
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              value="bank_transfer"
              checked={formData.paymentMethod === 'bank_transfer'}
              onChange={handleChange}
              className="w-4 h-4 text-pink-500"
              disabled={isSubmitting}
            />
            <div>
              <span className="text-white font-medium">Bank Transfer</span>
              <p className="text-xs text-purple-400">Direct bank payment</p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
            formData.paymentMethod === 'easypaisa' 
              ? 'border-pink-500 bg-pink-500/10' 
              : 'border-purple-500 hover:border-pink-500'
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              value="easypaisa"
              checked={formData.paymentMethod === 'easypaisa'}
              onChange={handleChange}
              className="w-4 h-4 text-pink-500"
              disabled={isSubmitting}
            />
            <div>
              <span className="text-white font-medium">Easypaisa</span>
              <p className="text-xs text-purple-400">Mobile payment</p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
            formData.paymentMethod === 'jazzcash' 
              ? 'border-pink-500 bg-pink-500/10' 
              : 'border-purple-500 hover:border-pink-500'
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              value="jazzcash"
              checked={formData.paymentMethod === 'jazzcash'}
              onChange={handleChange}
              className="w-4 h-4 text-pink-500"
              disabled={isSubmitting}
            />
            <div>
              <span className="text-white font-medium">JazzCash</span>
              <p className="text-xs text-purple-400">Mobile payment</p>
            </div>
          </label>
        </div>
      </div>

      {/* Order Notes */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6">
        <h3 className="text-lg font-semibold text-pink-400 mb-4">Order Notes (Optional)</h3>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Special instructions for delivery..."
          className="w-full px-3 py-2 bg-purple-900/30 border border-purple-500 rounded-lg text-white focus:border-pink-500 focus:outline-none"
          disabled={isSubmitting}
        />
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-500 p-4">
        <div className="flex justify-between items-center">
          <span className="text-white font-semibold">Total Amount:</span>
          <span className="text-2xl font-bold text-gradient">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        variant="primary" 
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : (
          'Place Order'
        )}
      </Button>

      {/* Terms - Fixed the Link components */}
      <p className="text-xs text-center text-purple-400">
        By placing your order, you agree to our{' '}
        <Link href="/terms" className="text-pink-400 hover:text-pink-300">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-pink-400 hover:text-pink-300">
          Privacy Policy
        </Link>
      </p>
    </form>
  )
}