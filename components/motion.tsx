'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export const ease = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.12,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  as?: 'div' | 'ul' | 'section'
}) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Component>
  )
}

export function FadeUp({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'p' | 'h2' | 'span'
}) {
  const Component = motion[as]
  return (
    <Component className={className} variants={fadeUp}>
      {children}
    </Component>
  )
}
