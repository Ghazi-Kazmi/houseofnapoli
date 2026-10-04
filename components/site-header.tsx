'use client'

import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useLenis } from 'lenis/react'
import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { ease } from './motion'

const links = [
  { href: '#heritage', label: 'Heritage' },
  { href: '#oven', label: 'The Oven' },
  { href: '#menu', label: 'Menu' },
  { href: '#visit', label: 'Visit' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const lenis = useLenis(({ scroll }) => setScrolled(scroll > 24))
  const { count, openCart } = useCart()

  const go = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!lenis) return
    event.preventDefault()
    lenis.scrollTo(href, { offset: -72, duration: 1.6 })
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'border-b border-hairline bg-cream/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 md:px-10">
        <a href="#top" onClick={(e) => go(e, '#top')} className="group flex items-center gap-3 text-forest">
          <span className="relative block size-12 shrink-0 overflow-hidden rounded-full bg-[#F8F5EF] shadow-[0_1px_0_rgba(23,51,34,0.06),0_6px_18px_-8px_rgba(23,51,34,0.35)] ring-1 ring-hairline transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
            <Image
              src="/images/logo.jpg"
              alt=""
              fill
              sizes="48px"
              priority
              className="scale-[1.28] object-cover"
            />
          </span>
          <span className="font-serif text-2xl font-medium tracking-tight">House of Napoli</span>
          <span className="sr-only">— back to top</span>
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className="text-xs uppercase tracking-[0.22em] text-forest/75 transition-colors hover:text-terracotta"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={openCart}
            className="relative flex size-11 items-center justify-center text-forest transition-colors hover:text-terracotta"
            aria-label={count ? `Open cart, ${count} items` : 'Open cart'}
          >
            <ShoppingBag className="size-5" strokeWidth={1.6} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-medium tabular-nums text-cream">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </button>
          <a
            href="#visit"
            onClick={(e) => go(e, '#visit')}
            className="rounded-full bg-terracotta px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-cream transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
          >
            Reserve
          </a>
        </div>
      </div>
    </motion.header>
  )
}
