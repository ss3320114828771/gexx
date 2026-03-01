'use client'

import { useState } from 'react'

interface DropdownProps {
  label: string
  options: { value: string; label: string }[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  fullWidth?: boolean
}

export default function Dropdown({ 
  label, 
  options, 
  value, 
  onChange, 
  placeholder = 'Select option',
  fullWidth = false
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(value || '')

  const handleSelect = (optionValue: string) => {
    setSelected(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const selectedLabel = options.find(opt => opt.value === selected)?.label || placeholder

  return (
    <div className={`relative ${fullWidth ? 'w-full' : 'w-64'}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-pink-300 mb-1">
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-purple-900/30 border border-purple-500 rounded-lg text-white flex items-center justify-between hover:border-pink-500 transition-colors"
      >
        <span className={selected ? 'text-white' : 'text-purple-400'}>
          {selectedLabel}
        </span>
        <svg 
          className={`w-5 h-5 text-purple-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Options */}
          <div className="absolute z-20 w-full mt-1 bg-purple-900 border border-purple-500 rounded-lg shadow-xl max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-2 text-left hover:bg-purple-800 transition-colors ${
                  selected === option.value 
                    ? 'bg-pink-600 text-white' 
                    : 'text-purple-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}