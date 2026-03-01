'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/button'
import Modal from '@/components/ui/modal'

interface DeleteProductProps {
  productId: string
  productName: string
  isOpen: boolean
  onClose: () => void
  onDeleted?: () => void
}

export default function DeleteProduct({ 
  productId, 
  productName, 
  isOpen, 
  onClose,
  onDeleted 
}: DeleteProductProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    setIsDeleting(true)
    setError('')
    
    try {
      // Simulate API call - in real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Success
      setIsDeleting(false)
      onClose()
      if (onDeleted) onDeleted()
      router.refresh()
      
      // Show success message (you can add a toast notification here)
      alert('Product deleted successfully!')
      
    } catch (err) {
      setIsDeleting(false)
      setError('Failed to delete product. Please try again.')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Product">
      <div className="p-6">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
            <svg 
              className="w-10 h-10 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
          </div>
        </div>

        {/* Warning Message */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-2">
            Are you absolutely sure?
          </h3>
          <p className="text-purple-300">
            This action cannot be undone. This will permanently delete{' '}
            <span className="font-bold text-pink-400">{productName}</span>{' '}
            from your store inventory.
          </p>
        </div>

        {/* Product Preview */}
        <div className="bg-purple-900/30 rounded-lg p-4 mb-6 border border-purple-500">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-animated rounded-lg"></div>
            <div>
              <h4 className="font-semibold text-white">{productName}</h4>
              <p className="text-sm text-purple-400">ID: {productId}</p>
              <p className="text-sm text-pink-400 mt-1">This product will be removed from all orders and carts</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            fullWidth
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleDelete}
            fullWidth
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              </div>
            ) : (
              'Yes, Delete Product'
            )}
          </Button>
        </div>

        {/* Additional Warning */}
        <p className="text-xs text-center text-purple-500 mt-4">
          ⚠️ This product will be permanently removed from your store and cannot be recovered.
        </p>
      </div>
    </Modal>
  )
}