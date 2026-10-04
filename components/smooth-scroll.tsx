'use client'

import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import { CartDrawer } from '@/components/cart-drawer'
import { CartProvider } from '@/lib/cart'

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true, anchors: { offset: -72 } }}>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </ReactLenis>
  )
}
