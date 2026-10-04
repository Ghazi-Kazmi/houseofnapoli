const words = ['Farina', 'Acqua', 'Sale', 'Lievito', 'Pomodoro', 'Fior di Latte', 'Basilico', 'Fuoco']

export function Marquee() {
  const row = [...words, ...words]
  return (
    <div className="overflow-hidden border-y border-hairline py-6" aria-hidden>
      <div className="animate-marquee flex w-max items-center gap-10">
        {row.map((word, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-3xl italic text-forest/80 md:text-4xl">
            {word}
            <span className="size-1.5 rounded-full bg-terracotta" />
          </span>
        ))}
      </div>
    </div>
  )
}
