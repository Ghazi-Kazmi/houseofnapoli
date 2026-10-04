import { FadeUp, Stagger } from './motion'
import { SplineStage } from './spline-stage'

const steps = [
  { label: 'Stretch', text: 'Hand-opened from the centre out, never rolled.' },
  { label: 'Dress', text: 'Crushed tomato, torn fior di latte, a leaf of basil.' },
  { label: 'Fire', text: 'Turned on the peel over oak embers for ninety seconds.' },
]

export function OvenSection() {
  return (
    <section id="oven" className="bg-forest text-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <Stagger className="lg:col-span-5">
          <FadeUp>
            <p className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-[#e7a48f]">
              <span className="h-px w-10 bg-[#e7a48f]" aria-hidden />
              Il Forno
            </p>
          </FadeUp>
          <FadeUp as="h2" className="mt-8 font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-tight text-balance">
            A dome of brick, <em className="text-[#e7a48f]">a heart of fire.</em>
          </FadeUp>
          <FadeUp as="p" className="mt-6 max-w-md leading-relaxed text-cream/70">
            Everything on our menu passes through one wood-burning brick oven. It is our kitchen, our hearth and the
            reason every crust tastes faintly of smoke.
          </FadeUp>
          <Stagger as="ul" className="mt-12 border-t border-cream/15" delay={0.2}>
            {steps.map((step, i) => (
              <FadeUp as="li" key={step.label} className="flex gap-6 border-b border-cream/15 py-5">
                <span className="font-serif text-sm italic text-[#e7a48f]">{`0${i + 1}`}</span>
                <div>
                  <p className="font-serif text-2xl">{step.label}</p>
                  <p className="mt-1 text-sm text-cream/65">{step.text}</p>
                </div>
              </FadeUp>
            ))}
          </Stagger>
        </Stagger>
        <Stagger className="lg:col-span-7">
          <FadeUp>
            <SplineStage />
          </FadeUp>
        </Stagger>
      </div>
    </section>
  )
}
