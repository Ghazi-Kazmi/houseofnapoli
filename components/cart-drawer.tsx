'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { useState } from 'react'
import {
  buildWhatsAppOrderUrl,
  useCart,
  type CheckoutDetails,
  type Fulfillment,
} from '@/lib/cart'
import { formatPrice } from '@/lib/menu'
import { restaurant } from '@/lib/restaurant'
import { ease } from './motion'

const emptyDetails: CheckoutDetails = {
  name: '',
  phone: '',
  fulfillment: 'pickup',
  address: '',
}

export function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, setQuantity, removeItem, clearCart } = useCart()
  const [details, setDetails] = useState<CheckoutDetails>(emptyDetails)
  const [error, setError] = useState('')

  const onCheckout = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (!items.length) {
      setError('Your cart is empty.')
      return
    }
    if (!details.name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!details.phone.trim()) {
      setError('Please enter your phone number.')
      return
    }
    if (details.fulfillment === 'delivery' && !details.address.trim()) {
      setError('Please enter a delivery address.')
      return
    }

    const url = buildWhatsAppOrderUrl(items, details, subtotal)
    window.open(url, '_blank', 'noopener,noreferrer')
    clearCart()
    setDetails(emptyDetails)
    closeCart()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[70] bg-forest/35 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            data-lenis-prevent
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col border-l border-hairline bg-cream shadow-[-24px_0_60px_-40px_rgba(23,51,34,0.35)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-terracotta">Your Order</p>
                <h2 id="cart-title" className="mt-1 font-serif text-3xl text-forest">
                  Cart {count > 0 ? `(${count})` : ''}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="flex size-10 items-center justify-center text-forest/60 transition-colors hover:text-forest"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <p className="text-sm leading-relaxed text-forest/55">
                  Your cart is empty. Add something from the menu — then checkout on WhatsApp.
                </p>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li key={item.slug} className="border-b border-hairline pb-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-serif text-xl leading-tight text-forest">{item.name}</p>
                          <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-forest/45">
                            {item.category}
                          </p>
                          <p className="mt-2 font-serif text-lg text-forest">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
                          className="text-[11px] uppercase tracking-[0.14em] text-forest/40 transition-colors hover:text-terracotta"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-3 inline-flex items-center gap-3 border border-hairline">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name}`}
                          onClick={() => setQuantity(item.slug, item.quantity - 1)}
                          className="flex size-9 items-center justify-center text-forest/70 hover:text-forest"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-6 text-center font-serif text-lg tabular-nums text-forest">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name}`}
                          onClick={() => setQuantity(item.slug, item.quantity + 1)}
                          className="flex size-9 items-center justify-center text-forest/70 hover:text-forest"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {items.length > 0 && (
                <form id="checkout-form" onSubmit={onCheckout} className="mt-8 space-y-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-forest/50">Checkout details</p>

                  <label className="block">
                    <span className="mb-1.5 block text-xs text-forest/55">Name</span>
                    <input
                      required
                      value={details.name}
                      onChange={(e) => setDetails((d) => ({ ...d, name: e.target.value }))}
                      className="w-full border border-hairline bg-transparent px-3 py-3 text-sm text-forest outline-none transition-colors focus:border-terracotta"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs text-forest/55">Phone</span>
                    <input
                      required
                      type="tel"
                      value={details.phone}
                      onChange={(e) => setDetails((d) => ({ ...d, phone: e.target.value }))}
                      className="w-full border border-hairline bg-transparent px-3 py-3 text-sm text-forest outline-none transition-colors focus:border-terracotta"
                      placeholder="03XX XXXXXXX"
                      autoComplete="tel"
                    />
                  </label>

                  <fieldset>
                    <legend className="mb-2 text-xs text-forest/55">Order type</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {([
                        ['pickup', 'Pickup'],
                        ['delivery', 'Delivery'],
                      ] as const).map(([value, label]) => {
                        const selected = details.fulfillment === value
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() =>
                              setDetails((d) => ({
                                ...d,
                                fulfillment: value as Fulfillment,
                              }))
                            }
                            className={`border px-3 py-3 text-xs uppercase tracking-[0.16em] transition-colors ${
                              selected
                                ? 'border-terracotta bg-terracotta text-cream'
                                : 'border-hairline text-forest/70 hover:border-forest/40'
                            }`}
                          >
                            {label}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  {details.fulfillment === 'delivery' ? (
                    <label className="block">
                      <span className="mb-1.5 block text-xs text-forest/55">Delivery address</span>
                      <textarea
                        required
                        rows={3}
                        value={details.address}
                        onChange={(e) => setDetails((d) => ({ ...d, address: e.target.value }))}
                        className="w-full resize-none border border-hairline bg-transparent px-3 py-3 text-sm text-forest outline-none transition-colors focus:border-terracotta"
                        placeholder="House / street, sector, city"
                      />
                    </label>
                  ) : (
                    <p className="text-sm leading-relaxed text-forest/55">
                      Pickup from{' '}
                      <span className="text-forest">{restaurant.address}</span>
                    </p>
                  )}

                  {error && <p className="text-sm text-terracotta">{error}</p>}
                </form>
              )}
            </div>

            <div className="border-t border-hairline px-6 py-5">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-forest/50">Subtotal</span>
                <span className="font-serif text-2xl text-forest">{formatPrice(subtotal)}</span>
              </div>
              <button
                type="submit"
                form="checkout-form"
                disabled={!items.length}
                className="w-full rounded-full bg-terracotta px-6 py-4 text-xs uppercase tracking-[0.2em] text-cream transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
              >
                Checkout on WhatsApp
              </button>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-forest/40">
                Opens WhatsApp to {restaurant.whatsappDisplay} with your order ready to send.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
