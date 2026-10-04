import Image from 'next/image'
import { FadeUp, Stagger } from './motion'

const pillars = [
  {
    number: '01',
    title: '48-Hour Fermented Dough',
    italian: "L'Impasto",
    body: 'Flour, water, salt and a whisper of yeast, left to slowly mature for two days. The result is a light, airy, deeply flavoured crust that is gentle to digest.',
    image: '/images/dough.png',
    alt: 'Neapolitan dough balls resting on a floured wooden board',
  },
  {
    number: '02',
    title: 'San Marzano & Fior di Latte',
    italian: 'Gli Ingredienti',
    body: 'Sweet, low-acid plum tomatoes grown in volcanic soil, crushed by hand and paired with soft, milky fior di latte and fresh-picked basil.',
    image: '/images/tomatoes.png',
    alt: 'San Marzano tomatoes on the vine beside fresh fior di latte and basil',
  },
  {
    number: '03',
    title: '90-Second Brick Oven Fire',
    italian: 'Il Fuoco',
    body: 'Our wood-burning brick oven reaches 485°C. Ninety seconds is all it takes to puff the cornicione and leave its signature leopard-spotted char.',
    image: '/images/fire.png',
    alt: 'A margherita pizza pulled from the wood fire on a wooden peel',
  },
]

export function Heritage() {
  return (
    <section id="heritage" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
      <Stagger className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12">
        <FadeUp className="md:col-span-4">
          <p className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-terracotta">
            <span className="h-px w-10 bg-terracotta" aria-hidden />
            The Heritage
          </p>
        </FadeUp>
        <FadeUp as="h2" className="font-serif text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[1.02] tracking-tight text-forest text-balance md:col-span-8">
          Three rules, unchanged since the <em className="text-terracotta">pizzaioli</em> of old Naples.
        </FadeUp>
      </Stagger>

      <Stagger as="ul" stagger={0.16} className="grid gap-px overflow-hidden border-y border-hairline bg-hairline md:grid-cols-3">
        {pillars.map((p) => (
          <FadeUp as="li" key={p.number} className="group flex flex-col bg-cream p-6 md:p-8 lg:p-10">
            <div className="mb-8 flex items-baseline justify-between">
              <span className="font-serif text-sm italic text-terracotta">{p.italian}</span>
              <span className="text-xs tracking-[0.2em] text-forest/45">{p.number}</span>
            </div>
            <div className="relative mb-8 aspect-[4/5] overflow-hidden">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
            </div>
            <h3 className="font-serif text-3xl leading-tight text-forest">{p.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-forest/70">{p.body}</p>
          </FadeUp>
        ))}
      </Stagger>
    </section>
  )
}
