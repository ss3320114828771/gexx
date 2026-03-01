'use client'

import { useState } from 'react'
import Button from '@/components/ui/button'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  // Simple state for settings
  const [settings, setSettings] = useState({
    // General
    storeName: 'Precious Stones & Gems',
    storeEmail: 'sajid.syed@gmail.com',
    storePhone: '+92 300 1234567',
    storeAddress: '123 Gem Market, Anarkali, Lahore, Pakistan',
    currency: 'USD',
    
    // Features
    showHealthBenefits: true,
    enableReviews: true,
    enableWishlist: true,
    
    // Payment
    codEnabled: true,
    bankTransferEnabled: true,
    
    // Social
    facebookUrl: 'https://facebook.com/preciousgems',
    instagramUrl: 'https://instagram.com/preciousgems',
    whatsappNumber: '+923001234567',
    
    // Appearance
    theme: 'dark'
  })

  // Simple tabs
  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'store', name: 'Store', icon: '🏪' },
    { id: 'payment', name: 'Payment', icon: '💳' },
    { id: 'social', name: 'Social', icon: '🌐' },
    { id: 'appearance', name: 'Appearance', icon: '🎨' }
  ]

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  // Save settings
  const handleSave = async () => {
    setSaving(true)
    setMessage({ text: '', type: '' })
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage({ text: 'Settings saved successfully!', type: 'success' })
    } catch (error) {
      setMessage({ text: 'Failed to save settings', type: 'error' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gradient">Settings</h1>
        <p className="text-purple-300">Manage your store preferences</p>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-purple-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'text-pink-400 border-b-2 border-pink-400' 
                : 'text-purple-400'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500 p-6">
        {/* General Tab */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gradient mb-4">General Settings</h2>
            
            <div>
              <label className="block text-pink-300 mb-1">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="w-full p-2 bg-purple-900/30 border border-purple-500 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-pink-300 mb-1">Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full p-2 bg-purple-900/30 border border-purple-500 rounded text-white"
              >
                <option value="USD">USD ($)</option>
                <option value="PKR">PKR (₨)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-pink-400">Store Features</h3>
              
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="showHealthBenefits"
                  checked={settings.showHealthBenefits}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-purple-300">Show Health Benefits</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="enableReviews"
                  checked={settings.enableReviews}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-purple-300">Enable Reviews</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="enableWishlist"
                  checked={settings.enableWishlist}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-purple-300">Enable Wishlist</span>
              </label>
            </div>
          </div>
        )}

        {/* Store Tab */}
        {activeTab === 'store' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gradient mb-4">Store Information</h2>
            
            <div>
              <label className="block text-pink-300 mb-1">Email</label>
              <input
                type="email"
                name="storeEmail"
                value={settings.storeEmail}
                onChange={handleChange}
                className="w-full p-2 bg-purple-900/30 border border-purple-500 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-pink-300 mb-1">Phone</label>
              <input
                type="text"
                name="storePhone"
                value={settings.storePhone}
                onChange={handleChange}
                className="w-full p-2 bg-purple-900/30 border border-purple-500 rounded text-white"
              />
            </div>

            <div>
              <label className="block text-pink-300 mb-1">Address</label>
              <textarea
                name="storeAddress"
                value={settings.storeAddress}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 bg-purple-900/30 border border-purple-500 rounded text-white"
              />
            </div>

            {/* Admin Info */}
            <div className="mt-4 p-4 bg-purple-900/30 rounded-lg">
              <h3 className="font-semibold text-pink-400 mb-2">Administrator</h3>
              <p className="text-white">Hafiz Sajid Syed</p>
              <p className="text-sm text-purple-300">sajid.syed@gmail.com</p>
            </div>
          </div>
        )}

        {/* Payment Tab */}
        {activeTab === 'payment' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gradient mb-4">Payment Methods</h2>
            
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 bg-purple-900/30 rounded">
                <input
                  type="checkbox"
                  name="codEnabled"
                  checked={settings.codEnabled}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-purple-300">Cash on Delivery</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-purple-900/30 rounded">
                <input
                  type="checkbox"
                  name="bankTransferEnabled"
                  checked={settings.bankTransferEnabled}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-purple-300">Bank Transfer</span>
              </label>
            </div>

            {settings.bankTransferEnabled && (
              <div className="mt-4 p-3 bg-purple-900/30 rounded">
                <p className="text-sm text-purple-300 mb-2">Bank: Meezan Bank</p>
                <p className="text-sm text-purple-300">Account: PK12MEZN1234567890</p>
              </div>
            )}
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gradient mb-4">Social Media</h2>
            
            <div>
              <label className="block text-pink-300 mb-1">Facebook</label>
              <input
                type="text"
                name="facebookUrl"
                value={settings.facebookUrl}
                onChange={handleChange}
                className="w-full p-2 bg-purple-900/30 border border-purple-500 rounded text-white"
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label className="block text-pink-300 mb-1">Instagram</label>
              <input
                type="text"
                name="instagramUrl"
                value={settings.instagramUrl}
                onChange={handleChange}
                className="w-full p-2 bg-purple-900/30 border border-purple-500 rounded text-white"
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="block text-pink-300 mb-1">WhatsApp</label>
              <input
                type="text"
                name="whatsappNumber"
                value={settings.whatsappNumber}
                onChange={handleChange}
                className="w-full p-2 bg-purple-900/30 border border-purple-500 rounded text-white"
                placeholder="+923001234567"
              />
            </div>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gradient mb-4">Appearance</h2>
            
            <div>
              <label className="block text-pink-300 mb-1">Theme</label>
              <select
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="w-full p-2 bg-purple-900/30 border border-purple-500 rounded text-white"
              >
                <option value="dark">Dark Theme</option>
                <option value="light">Light Theme</option>
                <option value="purple">Purple Theme</option>
              </select>
            </div>

            {/* Preview */}
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded">
              <p className="text-white text-center">Theme Preview</p>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6 flex justify-end gap-3">
          <Button 
            variant="primary" 
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>

      {/* Bismillah */}
      <div className="text-center mt-6 text-purple-400">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>
    </div>
  )
}