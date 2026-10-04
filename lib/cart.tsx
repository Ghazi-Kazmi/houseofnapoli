'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { formatPrice } from '@/lib/menu'
import { restaurant } from '@/lib/restaurant'

export type CartLine = {
  slug: string
  name: string
  price: number
  category: string
  quantity: number
}

export type Fulfillment = 'pickup' | 'delivery'

export type CheckoutDetails = {
  name: string
  phone: string
  fulfillment: Fulfillment
  address: string
}

type CartContextValue = {
  items: CartLine[]
  count: number
  subtotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (item: Omit<CartLine, 'quantity'>, quantity?: number) => void
  setQuantity: (slug: string, quantity: number) => void
  removeItem: (slug: string) => void
  clearCart: () => void
}

const STORAGE_KEY = 'hon-cart-v1'
const CartContext = createContext<CartContextValue | null>(null)

function loadItems(): CartLine[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartLine[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item) =>
        item &&
        typeof item.slug === 'string' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        typeof item.category === 'string' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0,
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setItems(loadItems())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const addItem = useCallback((item: Omit<CartLine, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((line) => line.slug === item.slug)
      if (existing) {
        return prev.map((line) =>
          line.slug === item.slug ? { ...line, quantity: line.quantity + quantity } : line,
        )
      }
      return [...prev, { ...item, quantity }]
    })
    setIsOpen(true)
  }, [])

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((line) => line.slug !== slug)
      return prev.map((line) => (line.slug === slug ? { ...line, quantity } : line))
    })
  }, [])

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((line) => line.slug !== slug))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, line) => sum + line.quantity, 0)
    const subtotal = items.reduce((sum, line) => sum + line.price * line.quantity, 0)
    return {
      items,
      count,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((open) => !open),
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }
  }, [items, isOpen, addItem, setQuantity, removeItem, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function buildWhatsAppOrderUrl(items: CartLine[], details: CheckoutDetails, subtotal: number) {
  const lines = [
    `*${restaurant.name} — New Order*`,
    '',
    `*Name:* ${details.name.trim()}`,
    `*Phone:* ${details.phone.trim()}`,
    `*Type:* ${details.fulfillment === 'pickup' ? 'Pickup' : 'Delivery'}`,
  ]

  if (details.fulfillment === 'delivery') {
    lines.push(`*Address:* ${details.address.trim()}`)
  } else {
    lines.push(`*Pickup at:* ${restaurant.address}`)
  }

  lines.push('', '*Order:*')
  for (const item of items) {
    const lineTotal = formatPrice(item.price * item.quantity)
    lines.push(`• ${item.quantity}× ${item.name} (${item.category}) — ${lineTotal}`)
  }

  lines.push('', `*Total:* ${formatPrice(subtotal)}`, '_Prices exclusive of GST._')

  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${restaurant.whatsappE164}?text=${text}`
}
