'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/ui/navbar'
import Footer from '@/components/ui/footer'
import Button from '@/components/ui/button'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  type: string
  origin: string
  hardness: number
  weight: number
  dimensions: string
  stock: number
  featured: boolean
  images: string[]
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      // Mock product data
      const mockProducts: Record<string, Product> = {
        '1': {
          id: '1',
          name: 'Amethyst Crystal',
          description: 'Natural amethyst crystal cluster from Brazil. Deep purple color with excellent clarity. This piece showcases beautiful crystalline structure with points ranging from 2-5cm in length. Perfect for collectors, meditation, or display. Each piece is unique and may vary slightly from the image.',
          price: 299,
          category: 'Crystals',
          type: 'Natural',
          origin: 'Brazil',
          hardness: 7,
          weight: 125,
          dimensions: '8x5x3 cm',
          stock: 15,
          featured: true,
          images: ['n1', 'n2', 'n3', 'n4', 'n5']
        },
        '2': {
          id: '2',
          name: 'Ruby Rough',
          description: 'Natural rough ruby from Myanmar. Deep red color with good transparency. This untreated ruby shows excellent color saturation and natural crystal form. Perfect for cutting or collecting as a specimen.',
          price: 499,
          category: 'Rough Stones',
          type: 'Raw',
          origin: 'Myanmar',
          hardness: 9,
          weight: 45,
          dimensions: '3x2x1.5 cm',
          stock: 8,
          featured: true,
          images: ['n2', 'n3', 'n4', 'n5', 'n6']
        },
        '3': {
          id: '3',
          name: 'Sapphire Polished',
          description: 'Natural sapphire from Sri Lanka, expertly polished. Beautiful cornflower blue color with excellent clarity. This gem has been cut and polished to reveal its best color and brilliance.',
          price: 899,
          category: 'Polished Gems',
          type: 'Polished',
          origin: 'Sri Lanka',
          hardness: 9,
          weight: 32,
          dimensions: '2x1.5x1 cm',
          stock: 5,
          featured: false,
          images: ['n3', 'n4', 'n5', 'n6', 'n1']
        }
      }

      setProduct(mockProducts[params.id] || null)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [params.id])

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
    // In real app, add to cart via API
  }

  const relatedProducts = [
    { id: '4', name: 'Emerald', price: 1299, image: 'n4' },
    { id: '5', name: 'Rose Quartz', price: 99, image: 'n5' },
    { id: '6', name: 'Citrine', price: 199, image: 'n6' },
  ]

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-purple-300">Loading product...</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 text-center border border-red-500">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-red-400 mb-4">Product Not Found</h2>
            <p className="text-purple-300 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/products">
              <Button variant="primary">Browse Products</Button>
            </Link>
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-purple-400 hover:text-pink-400">Home</Link>
          <span className="text-purple-600">›</span>
          <Link href="/products" className="text-purple-400 hover:text-pink-400">Products</Link>
          <span className="text-purple-600">›</span>
          <span className="text-pink-400">{product.name}</span>
        </div>

        {/* Bismillah */}
        <div className="text-center mb-8">
          <p className="text-2xl text-gradient font-arabic">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>

        {/* Product Main Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {product.images[selectedImage]}.jpeg
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-pink-500 scale-105' 
                      : 'border-transparent hover:border-purple-500'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.stock > 10 ? 'bg-green-500/20 text-green-400' :
                  product.stock > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
                {product.featured && (
                  <span className="px-2 py-1 text-xs rounded-full bg-pink-500/20 text-pink-400">
                    Featured
                  </span>
                )}
              </div>
            </div>

            <div className="text-4xl font-bold text-gradient">
              ${product.price}
            </div>

            <div className="border-t border-b border-purple-800 py-4">
              <p className="text-purple-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Specifications */}
            <div className="grid grid-cols-2 gap-3">
              <SpecItem label="Category" value={product.category} />
              <SpecItem label="Type" value={product.type} />
              <SpecItem label="Origin" value={product.origin} />
              <SpecItem label="Hardness" value={`${product.hardness} Mohs`} />
              <SpecItem label="Weight" value={`${product.weight} ct`} />
              <SpecItem label="Dimensions" value={product.dimensions} />
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-pink-400">Quantity:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-xl font-bold text-white w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-8 h-8 rounded-full bg-purple-600 text-white hover:bg-purple-700"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="primary" 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  fullWidth
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <button className="p-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                  <span className="text-2xl">❤️</span>
                </button>
              </div>

              {addedToCart && (
                <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center">
                  ✓ Added to cart successfully!
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="text-sm text-purple-400">
              <p>✓ Free shipping on orders over $100</p>
              <p>✓ 30-day return policy</p>
              <p>✓ Authenticity guaranteed</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gradient text-center mb-8">
            You May Also Like
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/products/${item.id}`}>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-purple-500 hover:border-pink-500 transition-all hover:scale-105">
                  <div className="aspect-square bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-3"></div>
                  <h3 className="font-semibold text-white">{item.name}</h3>
                  <p className="text-pink-400 font-bold mt-1">${item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}

// Helper component for spec items
function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-purple-900/30 p-2 rounded">
      <p className="text-xs text-purple-400">{label}</p>
      <p className="text-sm text-white font-medium">{value}</p>
    </div>
  )
}