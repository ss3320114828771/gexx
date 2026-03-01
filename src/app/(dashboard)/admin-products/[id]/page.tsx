'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Simple button component to avoid import issues
function SimpleButton({ children, onClick, variant = 'primary' }: any) {
  const baseClass = "px-4 py-2 rounded-lg font-semibold"
  const variantClass = variant === 'primary' 
    ? "bg-purple-600 text-white" 
    : "border border-red-500 text-red-500"
  
  return (
    <button onClick={onClick} className={`${baseClass} ${variantClass}`}>
      {children}
    </button>
  )
}

export default function ProductDetailPage({ params }: any) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin mx-auto"></div>
        <p className="mt-4">Loading...</p>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Link href="/dashboard/products" className="text-pink-500 block mb-4">
        ← Back
      </Link>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Product Details</h1>
          <p className="text-gray-600">ID: {params.productId}</p>
        </div>
        
        <div className="flex gap-2">
          <Link href={`/dashboard/products/${params.productId}/edit`}>
            <SimpleButton>Edit</SimpleButton>
          </Link>
          <SimpleButton variant="danger">Delete</SimpleButton>
        </div>
      </div>
      
      <div className="border rounded-lg p-4">
        <p className="text-gray-700">Product information would appear here</p>
      </div>
    </div>
  )
}