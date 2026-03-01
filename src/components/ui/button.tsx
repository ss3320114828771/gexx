'use client'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline'
  fullWidth?: boolean
  disabled?: boolean
}

export default function Button({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false
}: ButtonProps) {
  
  // Base classes
  const base = "px-6 py-3 rounded-lg font-semibold transition-all duration-300"
  
  // Width
  const width = fullWidth ? "w-full" : ""
  
  // Variant styles
  const styles = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700",
    secondary: "bg-purple-700 text-white hover:bg-purple-800 border-2 border-purple-500",
    outline: "border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
  }
  
  // Disabled style
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105"
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]} ${width} ${disabledStyle}`}
    >
      {children}
    </button>
  )
}