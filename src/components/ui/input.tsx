'use client'

import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

export default function Input({ 
  label, 
  error, 
  fullWidth = true,
  className = '',
  id,
  ...props 
}: InputProps) {
  
  // Generate unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  // Base classes
  const baseClasses = "px-4 py-2 bg-purple-900/30 border rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
  
  // Width
  const widthClass = fullWidth ? "w-full" : ""
  
  // Border color based on error
  const borderClass = error 
    ? "border-red-500" 
    : "border-purple-500"
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-pink-300 mb-1"
        >
          {label}
        </label>
      )}
      
      {/* Input */}
      <input
        id={inputId}
        className={`${baseClasses} ${borderClass} ${widthClass}`}
        {...props}
      />
      
      {/* Error Message */}
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  )
}