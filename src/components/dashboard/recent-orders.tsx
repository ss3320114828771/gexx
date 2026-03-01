'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Order {
  id: string
  customer: string
  email: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  items: number
}

interface RecentOrdersProps {
  orders?: Order[]
  limit?: number
  showViewAll?: boolean
}

export default function RecentOrders({ 
  orders = defaultOrders, 
  limit = 5,
  showViewAll = true 
}: RecentOrdersProps) {
  
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  // Limit the number of orders shown
  const displayedOrders = orders.slice(0, limit)

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'delivered':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">Delivered</span>
      case 'shipped':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">Shipped</span>
      case 'processing':
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400">Processing</span>
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">Pending</span>
      case 'cancelled':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400">Cancelled</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400">{status}</span>
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  // Toggle order details
  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-purple-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gradient">Recent Orders</h2>
          <p className="text-sm text-purple-400 mt-1">Latest customer orders</p>
        </div>
        {showViewAll && (
          <Link href="/dashboard/orders">
            <button className="text-sm text-pink-400 hover:text-pink-300 transition-colors">
              View All →
            </button>
          </Link>
        )}
      </div>

      {/* Orders List */}
      <div className="divide-y divide-purple-800">
        {displayedOrders.length > 0 ? (
          displayedOrders.map((order) => (
            <div key={order.id} className="hover:bg-purple-900/20 transition-colors">
              {/* Order Summary */}
              <div className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Order Info */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <Link href={`/dashboard/orders/${order.id}`}>
                        <h3 className="font-semibold text-white hover:text-pink-400 transition-colors">
                          {order.id}
                        </h3>
                      </Link>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-purple-300 mt-1">{order.customer}</p>
                    <p className="text-xs text-purple-400">{order.email}</p>
                  </div>

                  {/* Amount & Items */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gradient">
                      ${order.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-purple-400">
                      {order.items} item{order.items !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Date & Actions */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-purple-300">{formatDate(order.date)}</p>
                    </div>
                    
                    {/* Expand Button */}
                    <button
                      onClick={() => toggleOrderDetails(order.id)}
                      className="p-1 hover:bg-purple-700 rounded transition-colors"
                      aria-label="Toggle details"
                    >
                      <svg 
                        className={`w-5 h-5 text-purple-400 transform transition-transform ${
                          expandedOrder === order.id ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="px-4 pb-4 pt-2 bg-purple-900/20">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-purple-400">Customer</p>
                      <p className="text-white">{order.customer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-400">Email</p>
                      <p className="text-white">{order.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-400">Items</p>
                      <p className="text-white">{order.items} products</p>
                    </div>
                    <div>
                      <p className="text-xs text-purple-400">Total</p>
                      <p className="text-white font-bold">${order.amount.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3">
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <button className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700">
                        View Details
                      </button>
                    </Link>
                    <Link href={`/dashboard/orders/${order.id}/edit`}>
                      <button className="px-3 py-1 text-xs border border-purple-500 text-purple-300 rounded hover:bg-purple-800">
                        Update Status
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-purple-400">No orders found</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-purple-800 bg-purple-900/20">
        <div className="flex justify-between text-xs text-purple-400">
          <span>Total Orders: {orders.length}</span>
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Bismillah */}
      <div className="text-center py-2 border-t border-purple-800">
        <p className="text-xs text-purple-500">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      </div>
    </div>
  )
}

// Default orders data
const defaultOrders: Order[] = [
  {
    id: '#1001',
    customer: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    amount: 299.00,
    status: 'delivered',
    date: '2024-03-01T10:30:00',
    items: 2
  },
  {
    id: '#1002',
    customer: 'Fatima Ali',
    email: 'fatima.ali@email.com',
    amount: 499.00,
    status: 'processing',
    date: '2024-03-01T14:45:00',
    items: 1
  },
  {
    id: '#1003',
    customer: 'Omar Hassan',
    email: 'omar.h@email.com',
    amount: 899.00,
    status: 'shipped',
    date: '2024-02-29T09:15:00',
    items: 3
  },
  {
    id: '#1004',
    customer: 'Aisha Malik',
    email: 'aisha.m@email.com',
    amount: 159.00,
    status: 'pending',
    date: '2024-02-29T16:20:00',
    items: 1
  },
  {
    id: '#1005',
    customer: 'Bilal Ahmed',
    email: 'bilal.a@email.com',
    amount: 1299.00,
    status: 'delivered',
    date: '2024-02-28T11:00:00',
    items: 4
  }
]