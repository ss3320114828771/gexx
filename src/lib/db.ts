// Mock database for development
// In production, this would connect to a real database (PostgreSQL, MongoDB, etc.)

// Types
export interface User {
  id: string
  name: string
  email: string
  password?: string // In real app, this would be hashed
  role: 'admin' | 'user'
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  type: string
  origin: string
  hardness?: number
  weight?: number
  dimensions?: string
  stock: number
  featured: boolean
  images: string[]
  rating?: number
  reviewCount?: number
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: string
  shippingAddress: Address
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface Address {
  line1: string
  line2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  updatedAt: string
}

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

// Mock data storage
const users: User[] = [
  {
    id: '1',
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@gmail.com',
    password: 'admin123', // In real app, this would be hashed
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Test User',
    email: 'user@test.com',
    password: 'user123',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const products: Product[] = [
  {
    id: '1',
    name: 'Amethyst Crystal',
    description: 'Natural amethyst crystal cluster from Brazil. Deep purple color with excellent clarity.',
    price: 299,
    category: 'Crystals',
    type: 'Natural',
    origin: 'Brazil',
    hardness: 7,
    weight: 125,
    dimensions: '8x5x3 cm',
    stock: 15,
    featured: true,
    images: ['n1', 'n2', 'n3'],
    rating: 4.8,
    reviewCount: 124,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-20'
  },
  {
    id: '2',
    name: 'Ruby Rough',
    description: 'Natural rough ruby from Myanmar. Deep red color with good transparency.',
    price: 499,
    category: 'Rough Stones',
    type: 'Raw',
    origin: 'Myanmar',
    hardness: 9,
    weight: 45,
    dimensions: '3x2x1.5 cm',
    stock: 8,
    featured: true,
    images: ['n2', 'n3', 'n4'],
    rating: 4.9,
    reviewCount: 89,
    createdAt: '2024-01-20',
    updatedAt: '2024-02-18'
  },
  {
    id: '3',
    name: 'Sapphire Polished',
    description: 'Natural sapphire from Sri Lanka, expertly polished. Beautiful cornflower blue color.',
    price: 899,
    category: 'Polished Gems',
    type: 'Polished',
    origin: 'Sri Lanka',
    hardness: 9,
    weight: 32,
    dimensions: '2x1.5x1 cm',
    stock: 5,
    featured: true,
    images: ['n3', 'n4', 'n5'],
    rating: 5.0,
    reviewCount: 56,
    createdAt: '2024-01-25',
    updatedAt: '2024-02-15'
  },
  {
    id: '4',
    name: 'Emerald',
    description: 'Natural emerald from Colombia. Rich green color with excellent clarity.',
    price: 1299,
    category: 'Polished Gems',
    type: 'Polished',
    origin: 'Colombia',
    hardness: 8,
    weight: 28,
    dimensions: '2x1.5x1 cm',
    stock: 3,
    featured: true,
    images: ['n4', 'n5', 'n6'],
    rating: 4.7,
    reviewCount: 42,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-10'
  }
]

const orders: Order[] = [
  {
    id: '1',
    userId: '2',
    items: [
      {
        productId: '1',
        name: 'Amethyst Crystal',
        price: 299,
        quantity: 1,
        image: 'n1'
      }
    ],
    subtotal: 299,
    shipping: 10,
    tax: 14.95,
    total: 323.95,
    status: 'delivered',
    paymentMethod: 'cod',
    shippingAddress: {
      line1: '123 Main St',
      city: 'Lahore',
      state: 'Punjab',
      zipCode: '54000',
      country: 'Pakistan',
      phone: '+92 300 1234567'
    },
    createdAt: '2024-03-01',
    updatedAt: '2024-03-05'
  }
]

// Database operations
export const db = {
  // Users
  users: {
    findAll: async (): Promise<User[]> => {
      return users.map(({ password, ...user }) => user as User)
    },

    findById: async (id: string): Promise<Omit<User, 'password'> | null> => {
      const user = users.find(u => u.id === id)
      if (!user) return null
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    },

    findByEmail: async (email: string): Promise<User | null> => {
      return users.find(u => u.email === email) || null
    },

    create: async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
      const newUser: User = {
        id: String(users.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      users.push(newUser)
      return newUser
    },

    update: async (id: string, data: Partial<User>): Promise<User | null> => {
      const index = users.findIndex(u => u.id === id)
      if (index === -1) return null
      
      users[index] = {
        ...users[index],
        ...data,
        updatedAt: new Date().toISOString()
      }
      return users[index]
    },

    delete: async (id: string): Promise<boolean> => {
      const index = users.findIndex(u => u.id === id)
      if (index === -1) return false
      
      users.splice(index, 1)
      return true
    }
  },

  // Products
  products: {
    findAll: async (): Promise<Product[]> => {
      return products
    },

    findById: async (id: string): Promise<Product | null> => {
      return products.find(p => p.id === id) || null
    },

    findByCategory: async (category: string): Promise<Product[]> => {
      return products.filter(p => p.category === category)
    },

    findFeatured: async (): Promise<Product[]> => {
      return products.filter(p => p.featured)
    },

    create: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
      const newProduct: Product = {
        id: String(products.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      products.push(newProduct)
      return newProduct
    },

    update: async (id: string, data: Partial<Product>): Promise<Product | null> => {
      const index = products.findIndex(p => p.id === id)
      if (index === -1) return null
      
      products[index] = {
        ...products[index],
        ...data,
        updatedAt: new Date().toISOString()
      }
      return products[index]
    },

    delete: async (id: string): Promise<boolean> => {
      const index = products.findIndex(p => p.id === id)
      if (index === -1) return false
      
      products.splice(index, 1)
      return true
    },

    updateStock: async (id: string, quantity: number): Promise<boolean> => {
      const product = products.find(p => p.id === id)
      if (!product) return false
      
      product.stock = quantity
      product.updatedAt = new Date().toISOString()
      return true
    }
  },

  // Orders
  orders: {
    findAll: async (): Promise<Order[]> => {
      return orders
    },

    findById: async (id: string): Promise<Order | null> => {
      return orders.find(o => o.id === id) || null
    },

    findByUser: async (userId: string): Promise<Order[]> => {
      return orders.filter(o => o.userId === userId)
    },

    create: async (data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
      const newOrder: Order = {
        id: String(orders.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      orders.push(newOrder)
      return newOrder
    },

    updateStatus: async (id: string, status: Order['status']): Promise<Order | null> => {
      const order = orders.find(o => o.id === id)
      if (!order) return null
      
      order.status = status
      order.updatedAt = new Date().toISOString()
      return order
    },

    delete: async (id: string): Promise<boolean> => {
      const index = orders.findIndex(o => o.id === id)
      if (index === -1) return false
      
      orders.splice(index, 1)
      return true
    }
  },

  // Utility functions
  clear: () => {
    // Clear all data (for testing)
    users.length = 0
    products.length = 0
    orders.length = 0
  },

  getStats: () => {
    return {
      users: users.length,
      products: products.length,
      orders: orders.length,
      revenue: orders.reduce((sum, order) => sum + order.total, 0)
    }
  }
}

// Simple version for basic use
export const simpleDb = {
  users: [
    { id: 1, name: 'Admin', email: 'admin@test.com', role: 'admin' }
  ],
  products: [
    { id: 1, name: 'Amethyst', price: 299 },
    { id: 2, name: 'Ruby', price: 499 }
  ],
  
  findUser: (email: string) => {
    return simpleDb.users.find(u => u.email === email)
  },
  
  findProduct: (id: number) => {
    return simpleDb.products.find(p => p.id === id)
  }
}