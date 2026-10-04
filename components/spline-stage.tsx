'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

/**
 * Paste the public URL of your exported Spline scene here
 * (Spline → Export → Code → React → copy the `scene` URL ending in `.splinecode`).
 * While empty, an interactive cursor-tilt frame of the oven is shown instead.
 */
export const SPLINE_SCENE_URL = ''

export function SplineStage({ scene = SPLINE_SCENE_URL }: { scene?: string }) {
  const [loaded, setLoaded] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 })
  const glowX = useTransform(x, [-0.5, 0.5], ['30%', '70%'])
  const glowY = useTransform(y, [-0.5, 0.5], ['30%', '70%'])
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255,190,120,0.75), transparent 55%)`

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      className="relative aspect-square w-full [perspective:1400px] md:aspect-[5/4]"
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {scene ? (
        <div className="absolute inset-0" data-lenis-prevent>
          {!loaded && <Poster />}
          <Spline
            scene={scene}
            onLoad={() => setLoaded(true)}
            className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      ) : (
        <motion.div style={{ rotateX, rotateY }} className="relative h-full w-full [transform-style:preserve-3d]">
          <div className="absolute inset-0 overflow-hidden rounded-[2px] shadow-[0_40px_80px_-30px_rgba(23,51,34,0.45)]">
            <Image
              src="/images/oven-hero.png"
              alt="Interactive view of the wood-fired brick oven"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="scale-110 object-cover"
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: glow }}
            />
          </div>
          <div
            className="absolute -bottom-6 -left-4 rounded-full bg-cream px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-forest shadow-lg md:-left-8"
            style={{ transform: 'translateZ(60px)' }}
          >
            Move your cursor
          </div>
        </motion.div>
      )}
    </div>
  )
}

function Poster() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image src="/images/oven-hero.png" alt="" fill sizes="55vw" className="object-cover opacity-60 blur-sm" />
      <span className="absolute inset-0 grid place-items-center text-xs uppercase tracking-[0.25em] text-cream">
        Lighting the oven…
      </span>
    </div>
  )
}
