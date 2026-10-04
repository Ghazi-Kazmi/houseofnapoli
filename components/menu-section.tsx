'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'
import { useCart } from '@/lib/cart'
import { formatPrice, menu, menuNotice, type MenuItem } from '@/lib/menu'
import { ease, FadeUp, Stagger } from './motion'

function prefetchImages(items: MenuItem[], fromIndex: number) {
  if (typeof window === 'undefined') return
  const urls = items
    .slice(fromIndex, fromIndex + 3)
    .map((item) => item.image)
    .filter((src): src is string => Boolean(src))

  for (const src of urls) {
    const img = new window.Image()
    img.src = src
  }
}

function DishStage({ item }: { item: MenuItem }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const hasSrc = Boolean(item.image)
  const showPhoto = hasSrc && loaded && !failed

  useEffect(() => {
    setLoaded(false)
    setFailed(false)
  }, [item.slug, item.image])

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f1ebe1] lg:aspect-auto lg:h-[min(34rem,calc(100svh-6rem))]">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="absolute inset-0"
        >
          <div className="flex h-full flex-col items-center justify-center px-8 text-center">
            <p className="font-serif text-3xl leading-tight text-forest/80 md:text-4xl">{item.name}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-forest/45">{item.description}</p>
          </div>

          {hasSrc && !failed && (
            <Image
              src={item.image!}
              alt={`${item.name} — ${item.description}`}
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className={`object-cover transition-opacity duration-500 ${showPhoto ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          )}

          {showPhoto && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/75 via-forest/30 to-transparent px-6 pb-7 pt-24">
              <p className="font-serif text-2xl leading-tight text-cream md:text-3xl">{item.name}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cream/85">{item.description}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export function MenuSection() {
  const [activeId, setActiveId] = useState(menu[0].id)
  const [activeSlug, setActiveSlug] = useState(menu[0].items[0]?.slug ?? '')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()
  const { addItem } = useCart()
  const active = menu.find((c) => c.id === activeId) ?? menu[0]
  const showStage = active.showStage !== false
  const activeItem = active.items.find((item) => item.slug === activeSlug) ?? active.items[0]

  const addToCart = (item: MenuItem) => {
    addItem({
      slug: item.slug,
      name: item.name,
      price: item.price,
      category: active.label,
    })
  }

  const selectCategory = (id: string) => {
    const category = menu.find((c) => c.id === id) ?? menu[0]
    setActiveId(category.id)
    setActiveSlug(category.items[0]?.slug ?? '')
    prefetchImages(category.items, 0)
  }

  const selectItem = (item: MenuItem, index: number) => {
    setActiveSlug(item.slug)
    prefetchImages(active.items, index)
  }

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    event.preventDefault()
    const next = (index + delta + menu.length) % menu.length
    selectCategory(menu[next].id)
    tabRefs.current[next]?.focus()
  }

  useEffect(() => {
    prefetchImages(active.items, 0)
  }, [active.id, active.items])

  return (
    <section id="menu" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
      <Stagger className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <FadeUp>
            <p className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-terracotta">
              <span className="h-px w-10 bg-terracotta" aria-hidden />
              Il Menù
            </p>
          </FadeUp>
          <FadeUp as="h2" className="mt-8 font-serif text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.98] tracking-tight text-forest">
            From the <em>brick oven</em>
          </FadeUp>
        </div>
        <FadeUp as="p" className="max-w-xs text-sm leading-relaxed text-forest/60">
          {menuNotice}
        </FadeUp>
      </Stagger>

      <div
        role="tablist"
        aria-label="Menu categories"
        className="-mx-6 flex gap-8 overflow-x-auto border-b border-hairline px-6 md:mx-0 md:px-0"
        data-lenis-prevent
      >
        {menu.map((cat, i) => {
          const selected = cat.id === activeId
          return (
            <button
              key={cat.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              id={`${baseId}-tab-${cat.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectCategory(cat.id)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={`relative shrink-0 pb-5 text-xs uppercase tracking-[0.2em] transition-colors ${
                selected ? 'text-forest' : 'text-forest/45 hover:text-forest/80'
              }`}
            >
              {cat.label}
              {selected && (
                <motion.span
                  layoutId="menu-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-terracotta"
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                />
              )}
            </button>
          )
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        className="min-h-[28rem] pt-12"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active.id}-intro`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-2"
          >
            <p className="font-serif text-3xl italic text-terracotta">{active.italian}</p>
            <p className="text-sm text-forest/60">{active.intro}</p>
          </motion.div>
        </AnimatePresence>

        {/* Stage sits outside transform animations so sticky can track the viewport. */}
        <div
          className={
            showStage
              ? 'grid items-start gap-10 lg:grid-cols-12 lg:gap-14'
              : 'grid items-start gap-10'
          }
        >
          {showStage && activeItem && (
            <aside className="order-first self-start lg:order-last lg:col-span-5 lg:sticky lg:top-20 lg:z-10">
              <DishStage item={activeItem} />
            </aside>
          )}

          <AnimatePresence mode="wait">
            <motion.ul
              key={active.id}
              className={
                showStage
                  ? 'order-last lg:order-first lg:col-span-7'
                  : 'grid gap-x-16 md:grid-cols-2'
              }
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.05 } },
              }}
            >
              {active.items.map((item, index) => {
                const selected = showStage && item.slug === activeItem?.slug

                return (
                  <motion.li
                    key={item.slug}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                    }}
                    className={`group border-b py-6 transition-colors ${
                      selected ? 'border-terracotta/40' : 'border-hairline'
                    }`}
                    onPointerEnter={() => {
                      if (showStage) selectItem(item, index)
                    }}
                  >
                    <div
                      role={showStage ? 'button' : undefined}
                      tabIndex={showStage ? 0 : undefined}
                      aria-current={selected ? 'true' : undefined}
                      onClick={() => {
                        if (showStage) selectItem(item, index)
                      }}
                      onKeyDown={(event) => {
                        if (!showStage) return
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          selectItem(item, index)
                        }
                      }}
                      className="w-full text-left outline-none focus-visible:ring-1 focus-visible:ring-terracotta/40"
                    >
                      <div className="flex items-baseline gap-4">
                        <h3
                          className={`font-serif text-2xl leading-tight transition-colors ${
                            selected ? 'text-terracotta' : 'text-forest group-hover:text-terracotta'
                          }`}
                        >
                          {item.name}
                        </h3>
                        {item.tag && (
                          <span className="shrink-0 rounded-full border border-hairline px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-forest/60">
                            {item.tag}
                          </span>
                        )}
                        <span className="mb-1.5 flex-1 border-b border-dotted border-forest/20" aria-hidden />
                        <span className="shrink-0 font-serif text-xl tabular-nums text-forest">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-start justify-between gap-6">
                        <p className="max-w-md text-sm leading-relaxed text-forest/65">{item.description}</p>
                        {item.calories && (
                          <span className="shrink-0 pt-0.5 text-[11px] uppercase tracking-[0.14em] text-forest/40">
                            {item.calories}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          addToCart(item)
                        }}
                        className="text-[11px] uppercase tracking-[0.18em] text-terracotta transition-colors hover:text-forest"
                      >
                        Add to cart
                      </button>
                    </div>
                  </motion.li>
                )
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
