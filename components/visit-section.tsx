import Image from 'next/image'
import { restaurant } from '@/lib/restaurant'
import { FadeUp, Stagger } from './motion'

const hours = [
  { day: 'Tuesday — Thursday', time: '12:00 — 23:00' },
  { day: 'Friday — Saturday', time: '12:00 — 00:00' },
  { day: 'Sunday', time: '12:00 — 22:00' },
  { day: 'Monday', time: 'The oven rests' },
]

export function VisitSection() {
  return (
    <section id="visit" className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <Stagger className="text-center">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Vieni a Trovarci</p>
          </FadeUp>
          <FadeUp
            as="h2"
            className="mx-auto mt-8 max-w-4xl font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-forest text-balance"
          >
            Pull up a chair <em className="text-terracotta">by the fire.</em>
          </FadeUp>
          <FadeUp className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="#menu"
              className="rounded-full bg-terracotta px-8 py-4 text-xs uppercase tracking-[0.2em] text-cream transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
            >
              View the Menu
            </a>
            <a
              href="#heritage"
              className="rounded-full border border-forest/25 px-8 py-4 text-xs uppercase tracking-[0.2em] text-forest transition-all duration-300 hover:scale-[1.04] hover:border-forest"
            >
              Our Craft
            </a>
          </FadeUp>
        </Stagger>

        <Stagger className="mt-24 grid gap-px overflow-hidden border-y border-hairline bg-hairline md:grid-cols-3">
          <FadeUp className="bg-cream p-8">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-forest/50">Hours</h3>
            <dl className="mt-5 space-y-3">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4 text-sm">
                  <dt className="text-forest/70">{h.day}</dt>
                  <dd className="text-forest">{h.time}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
          <FadeUp className="bg-cream p-8">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-forest/50">Find Us</h3>
            <address className="mt-5 font-serif text-2xl not-italic leading-snug text-forest">
              {restaurant.name}
              <br />
              Brick Oven Pizzeria
            </address>
            <p className="mt-4 text-sm leading-relaxed text-forest/70">{restaurant.address}</p>
            <p className="mt-3 text-sm text-forest/60">Dine-in, takeaway and delivery.</p>
          </FadeUp>
          <FadeUp className="bg-cream p-8">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-forest/50">The Promise</h3>
            <p className="mt-5 font-serif text-2xl leading-snug text-forest">
              Every pizza, every pasta, every calzone — baked in a wood-burning brick oven.
            </p>
          </FadeUp>
        </Stagger>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 md:px-10">
        <div className="flex flex-col-reverse items-start justify-between gap-12 md:flex-row md:items-end">
          <p
            className="font-serif text-[clamp(3.5rem,11vw,10.5rem)] leading-[0.85] tracking-[-0.03em] text-cream/95"
            aria-hidden
          >
            House of <em className="text-[#e7a48f]">Napoli</em>
          </p>
          <div className="relative size-40 shrink-0 rounded-full p-2 ring-1 ring-cream/20 md:size-52">
            <div className="relative size-full overflow-hidden rounded-full bg-[#F8F5EF] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/logo.jpg"
                alt="House of Napoli emblem — Authentic Italian Pizza, Pizza · Passion · Tradition"
                fill
                sizes="(min-width: 768px) 208px, 160px"
                className="scale-[1.12] object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-cream/15 pt-6 text-[11px] uppercase tracking-[0.2em] text-cream/55 md:flex-row md:items-end">
          <div>
            <p>Wood-Fired &amp; Handmade</p>
            <p className="mt-2 normal-case tracking-normal text-cream/70">{restaurant.address}</p>
          </div>
          <p>Baked in a wood-burning brick oven</p>
          <p>{`© ${new Date().getFullYear()} House of Napoli`}</p>
        </div>
      </div>
    </footer>
  )
}
