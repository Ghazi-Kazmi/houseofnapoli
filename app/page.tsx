import { Heritage } from '@/components/heritage'
import { Hero } from '@/components/hero'
import { Marquee } from '@/components/marquee'
import { MenuSection } from '@/components/menu-section'
import { OvenSection } from '@/components/oven-section'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter, VisitSection } from '@/components/visit-section'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <Heritage />
        <OvenSection />
        <MenuSection />
        <VisitSection />
      </main>
      <SiteFooter />
    </>
  )
}
