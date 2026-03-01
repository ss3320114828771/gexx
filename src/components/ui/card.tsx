'use client'

interface CardProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  image?: string
  footer?: React.ReactNode
  onClick?: () => void
  hover?: boolean
  className?: string
}

export default function Card({ 
  children, 
  title, 
  subtitle,
  image,
  footer,
  onClick,
  hover = true,
  className = ''
}: CardProps) {
  
  // Base classes
  const baseClasses = "bg-white/5 backdrop-blur-lg rounded-xl border-2 border-purple-500 overflow-hidden"
  
  // Hover effect
  const hoverClasses = hover ? "transition-all duration-300 hover:scale-105 hover:border-pink-500" : ""
  
  // Clickable
  const clickableClasses = onClick ? "cursor-pointer" : ""
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {/* Image */}
      {image && (
        <div className="w-full h-48 bg-gradient-animated">
          {/* In real app, use <Image> component here */}
        </div>
      )}
      
      {/* Header */}
      {(title || subtitle) && (
        <div className="p-4 border-b border-purple-800">
          {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-purple-400 mt-1">{subtitle}</p>}
        </div>
      )}
      
      {/* Content */}
      <div className="p-4">
        {children}
      </div>
      
      {/* Footer */}
      {footer && (
        <div className="p-4 border-t border-purple-800 bg-purple-900/20">
          {footer}
        </div>
      )}
    </div>
  )
}