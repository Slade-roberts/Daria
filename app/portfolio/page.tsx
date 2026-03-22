import { draftMode } from 'next/headers'
import { getPortfolioItems } from '@/lib/queries'
import PortfolioGrid from '@/components/PortfolioGrid'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Portfolio — Daria Shchukina',
  description: 'Translation work and portfolio of Daria Shchukina.',
}

export default async function PortfolioPage() {
  const [{ isEnabled: isAdmin }, items] = await Promise.all([
    draftMode(),
    getPortfolioItems(),
  ])

  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <header className="mb-16 border-b border-muted-gray/20 pb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-sage mb-4 font-sans">Portfolio</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal mb-4">
            Translation Work
          </h1>
          <p className="text-charcoal/60 max-w-xl font-sans">
            A selection of literary translations and language projects spanning multiple languages and genres.
          </p>
        </header>

        <PortfolioGrid items={items} isAdmin={isAdmin} />
      </div>
    </div>
  )
}

