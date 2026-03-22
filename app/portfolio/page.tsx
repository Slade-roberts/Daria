'use client'

import { useState, useEffect } from 'react'
import { getPortfolioItems } from '@/lib/queries'
import type { PortfolioItem } from '@/types'

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [filtered, setFiltered] = useState<PortfolioItem[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPortfolioItems().then((data) => {
      setItems(data)
      setFiltered(data)
      setLoading(false)
    })
  }, [])

  const categories = ['all', ...Array.from(new Set(items.map((i) => i.category).filter(Boolean) as string[]))]

  function handleFilter(cat: string) {
    setActiveCategory(cat)
    if (cat === 'all') {
      setFiltered(items)
    } else {
      setFiltered(items.filter((i) => i.category === cat))
    }
  }

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

        {/* Filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`text-xs tracking-widest uppercase px-4 py-2 transition-colors font-sans ${
                  activeCategory === cat
                    ? 'bg-charcoal text-cream'
                    : 'border border-muted-gray/40 text-charcoal/60 hover:border-sage hover:text-sage'
                }`}
              >
                {cat === 'all' ? 'All Work' : cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-warm-gray mb-4" />
                <div className="h-3 bg-warm-gray mb-2 w-1/3" />
                <div className="h-5 bg-warm-gray mb-2" />
                <div className="h-3 bg-warm-gray w-2/3" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-xl text-charcoal/40 italic">
              No portfolio items yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <article key={item._id} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-light-sage mb-4 overflow-hidden">
                  <div className="w-full h-full bg-light-sage group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {item.category && (
                    <span className="text-xs tracking-widest uppercase text-sage font-sans">
                      {item.category}
                    </span>
                  )}
                  {item.year && (
                    <span className="text-xs text-muted-gray font-sans">· {item.year}</span>
                  )}
                </div>
                <h2 className="font-serif text-xl text-charcoal mb-2 group-hover:text-sage transition-colors">
                  {item.title}
                </h2>
                {item.shortDescription && (
                  <p className="text-sm text-charcoal/60 leading-relaxed mb-3 font-sans">
                    {item.shortDescription}
                  </p>
                )}
                {item.originalLanguage && item.translatedLanguage && (
                  <p className="text-xs text-muted-gray font-sans">
                    {item.originalLanguage} → {item.translatedLanguage}
                  </p>
                )}
                {item.externalLink && (
                  <a
                    href={item.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-widest uppercase text-sage hover:text-charcoal transition-colors mt-3 inline-block font-sans"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View →
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
