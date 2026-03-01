import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Dashboard Navigation */}
      <nav className="bg-purple-950/50 border-b border-purple-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="text-xl font-bold text-gradient">
              Admin Panel
            </Link>
            
            {/* Navigation Links */}
            <div className="flex gap-4">
              <Link 
                href="/dashboard" 
                className="text-purple-300 hover:text-pink-400 transition-colors"
              >
                Overview
              </Link>
              <Link 
                href="/dashboard/products" 
                className="text-purple-300 hover:text-pink-400 transition-colors"
              >
                Products
              </Link>
              <Link 
                href="/dashboard/settings" 
                className="text-purple-300 hover:text-pink-400 transition-colors"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Bismillah Footer */}
      <div className="text-center py-4 text-purple-400 border-t border-purple-800">
        <p className="text-sm">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      </div>
    </div>
  )
}