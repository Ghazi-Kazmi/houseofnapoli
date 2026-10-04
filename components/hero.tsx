'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ease } from './motion'

const headline = ['The Craft', 'of Authentic', 'Napoli']

const stats = [
  { value: '48h', label: 'Cold fermentation' },
  { value: '485°C', label: 'Oven floor' },
  { value: '90s', label: 'In the fire' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-28 md:pt-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pb-28">
        <motion.div style={{ y: textY }} className="flex flex-col justify-center lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-terracotta"
          >
            <span className="h-px w-10 bg-terracotta" aria-hidden />
            Pizzeria Napoletana · Forno a Legna
          </motion.p>

          <h1 className="font-serif text-[clamp(3.25rem,8.2vw,7.5rem)] font-normal leading-[0.92] tracking-[-0.02em] text-forest text-balance">
            {headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${i === 1 ? 'italic text-forest/85' : ''}`}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease, delay: 0.45 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.95 }}
            className="mt-8 max-w-md text-base leading-relaxed text-forest/70 md:text-lg"
          >
            Slow-proved dough, Italian tomatoes and fresh fior di latte — fired in a wood-burning brick oven the way
            Naples has done it for centuries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#menu"
              className="rounded-full bg-terracotta px-7 py-4 text-xs uppercase tracking-[0.2em] text-cream transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
            >
              Explore the Menu
            </a>
            <a
              href="#visit"
              className="rounded-full border border-forest/25 px-7 py-4 text-xs uppercase tracking-[0.2em] text-forest transition-all duration-300 hover:scale-[1.04] hover:border-forest"
            >
              Reserve a Table
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-14 grid max-w-md grid-cols-3 border-t border-hairline pt-6"
          >
            {stats.map((s) => (
              <div key={s.label} className="border-r border-hairline pr-4 last:border-r-0 [&:not(:first-child)]:pl-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-3xl text-forest">{s.value}</dd>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-forest/55">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(12% 12% 12% 12% round 2px)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 2px)' }}
          transition={{ duration: 1.6, ease, delay: 0.3 }}
          className="relative aspect-[4/5] overflow-hidden lg:col-span-6 lg:aspect-auto lg:min-h-[78vh]"
        >
          <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
            <Image
              src="/images/oven-hero.png"
              alt="A Neapolitan pizza blistering inside a glowing wood-fired brick oven"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent p-6 text-cream md:p-8">
            <p className="font-serif text-xl italic">Il forno non dorme mai.</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-cream/80">The oven never sleeps</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
