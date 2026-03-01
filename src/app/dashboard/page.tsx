'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/button'

// Stats Card Component
function StatCard({ title, value, icon, color, trend }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6 hover:border-pink-500 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-purple-400 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && (
            <p className="text-xs text-green-400 mt-1">↑ {trend} from last month</p>
          )}
        </div>
        <div className={`text-4xl ${color}`}>{icon}</div>
      </div>
    </div>
  )
}

// Recent Orders Table
function RecentOrders() {
  const orders = [
    { id: '#1001', customer: 'Ahmed Khan', amount: '$299', status: 'Delivered', date: '2024-03-01' },
    { id: '#1002', customer: 'Fatima Ali', amount: '$499', status: 'Processing', date: '2024-03-01' },
    { id: '#1003', customer: 'Omar Hassan', amount: '$899', status: 'Shipped', date: '2024-02-29' },
    { id: '#1004', customer: 'Aisha Malik', amount: '$159', status: 'Pending', date: '2024-02-29' },
    { id: '#1005', customer: 'Bilal Ahmed', amount: '$1299', status: 'Delivered', date: '2024-02-28' },
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-green-500/20 text-green-400'
      case 'Processing': return 'bg-blue-500/20 text-blue-400'
      case 'Shipped': return 'bg-purple-500/20 text-purple-400'
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gradient">Recent Orders</h2>
        <Link href="/dashboard/orders" className="text-sm text-pink-400 hover:text-pink-300">
          View All →
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-800">
              <th className="text-left py-3 text-purple-400 text-sm font-medium">Order ID</th>
              <th className="text-left py-3 text-purple-400 text-sm font-medium">Customer</th>
              <th className="text-left py-3 text-purple-400 text-sm font-medium">Amount</th>
              <th className="text-left py-3 text-purple-400 text-sm font-medium">Status</th>
              <th className="text-left py-3 text-purple-400 text-sm font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-purple-800/50 hover:bg-purple-900/20">
                <td className="py-3 text-white font-medium">{order.id}</td>
                <td className="py-3 text-purple-300">{order.customer}</td>
                <td className="py-3 text-white">{order.amount}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 text-purple-300">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Top Products
function TopProducts() {
  const products = [
    { name: 'Amethyst Crystal', sales: 45, revenue: '$13,455', trend: '+12%' },
    { name: 'Ruby Rough', sales: 32, revenue: '$15,968', trend: '+8%' },
    { name: 'Sapphire Polished', sales: 28, revenue: '$25,172', trend: '+15%' },
    { name: 'Emerald', sales: 21, revenue: '$27,279', trend: '+5%' },
    { name: 'Rose Quartz', sales: 67, revenue: '$6,633', trend: '+22%' },
  ]

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6">
      <h2 className="text-xl font-bold text-gradient mb-4">Top Products</h2>
      
      <div className="space-y-3">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-purple-800/50 last:border-0">
            <div className="flex items-center gap-3">
              <span className="text-sm text-purple-400">{index + 1}.</span>
              <div>
                <p className="text-white font-medium">{product.name}</p>
                <p className="text-xs text-purple-400">{product.sales} sales</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white">{product.revenue}</p>
              <p className="text-xs text-green-400">{product.trend}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Quick Actions
function QuickActions() {
  const actions = [
    { name: 'Add Product', icon: '➕', href: '/dashboard/products/new', color: 'bg-purple-600' },
    { name: 'View Orders', icon: '📋', href: '/dashboard/orders', color: 'bg-pink-600' },
    { name: 'Settings', icon: '⚙️', href: '/dashboard/settings', color: 'bg-indigo-600' },
    { name: 'View Store', icon: '👁️', href: '/products', color: 'bg-green-600' },
  ]

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6">
      <h2 className="text-xl font-bold text-gradient mb-4">Quick Actions</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action) => (
          <Link key={action.name} href={action.href}>
            <button className={`w-full p-3 ${action.color} hover:opacity-90 rounded-lg text-white transition-all hover:scale-105`}>
              <span className="text-2xl block mb-1">{action.icon}</span>
              <span className="text-sm">{action.name}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Recent Activity
function RecentActivity() {
  const activities = [
    { action: 'New order #1005 received', time: '5 min ago', icon: '🛒', color: 'bg-green-500' },
    { action: 'Product "Amethyst Crystal" stock updated', time: '1 hour ago', icon: '💎', color: 'bg-blue-500' },
    { action: 'New customer registered: Ahmed Khan', time: '3 hours ago', icon: '👤', color: 'bg-purple-500' },
    { action: 'Order #1004 marked as pending', time: '5 hours ago', icon: '⏳', color: 'bg-yellow-500' },
    { action: 'Product "Ruby Rough" price updated', time: '1 day ago', icon: '💰', color: 'bg-pink-500' },
  ]

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6">
      <h2 className="text-xl font-bold text-gradient mb-4">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center text-white`}>
              {activity.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">{activity.action}</p>
              <p className="text-xs text-purple-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Main Dashboard Component
export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalCustomers: 0
  })
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        totalOrders: 156,
        totalRevenue: 45890,
        totalProducts: 234,
        totalCustomers: 89
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-300">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gradient">
              Welcome back, Hafiz Sajid Syed
            </h1>
            <p className="text-purple-300 mt-2">
              Here's what's happening with your store today.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-6xl">💎</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Orders"
          value={stats.totalOrders}
          icon="📦"
          color="text-blue-400"
          trend="12%"
        />
        <StatCard 
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon="💰"
          color="text-green-400"
          trend="8%"
        />
        <StatCard 
          title="Total Products"
          value={stats.totalProducts}
          icon="💎"
          color="text-purple-400"
          trend="5%"
        />
        <StatCard 
          title="Total Customers"
          value={stats.totalCustomers}
          icon="👥"
          color="text-pink-400"
          trend="15%"
        />
      </div>

      {/* Charts and Tables Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RecentOrders />
        <TopProducts />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity */}
      <RecentActivity />

      {/* Store Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6">
          <h3 className="font-semibold text-pink-400 mb-3">Low Stock Alert</h3>
          <p className="text-3xl font-bold text-white">3</p>
          <p className="text-sm text-purple-400 mt-1">Products running low</p>
          <Link href="/dashboard/products?filter=lowstock" className="text-sm text-pink-400 hover:text-pink-300 mt-2 inline-block">
            View Products →
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6">
          <h3 className="font-semibold text-pink-400 mb-3">Pending Orders</h3>
          <p className="text-3xl font-bold text-white">8</p>
          <p className="text-sm text-purple-400 mt-1">Need attention</p>
          <Link href="/dashboard/orders?status=pending" className="text-sm text-pink-400 hover:text-pink-300 mt-2 inline-block">
            View Orders →
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6">
          <h3 className="font-semibold text-pink-400 mb-3">Today's Sales</h3>
          <p className="text-3xl font-bold text-white">$1,299</p>
          <p className="text-sm text-purple-400 mt-1">4 orders today</p>
          <Link href="/dashboard/orders?today=true" className="text-sm text-pink-400 hover:text-pink-300 mt-2 inline-block">
            View Details →
          </Link>
        </div>
      </div>

      {/* Bismillah */}
      <div className="text-center py-4">
        <p className="text-xl text-gradient">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      </div>
    </div>
  )
}