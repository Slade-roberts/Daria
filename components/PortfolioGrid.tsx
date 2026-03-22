'use client'

import { useState } from 'react'
import type { PortfolioItem } from '@/types'

interface PortfolioGridProps {
  items: PortfolioItem[]
  isAdmin: boolean
}

export default function PortfolioGrid({ items, isAdmin }: PortfolioGridProps) {
  const [filtered, setFiltered] = useState<PortfolioItem[]>(items)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = [
    'all',
    ...Array.from(new Set(items.map((i) => i.category).filter(Boolean) as string[])),
  ]

  function handleFilter(cat: string) {
    setActiveCategory(cat)
    if (cat === 'all') {
      setFiltered(items)
    } else {
      setFiltered(items.filter((i) => i.category === cat))
    }
  }

  return (
    <>
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
          {isAdmin && (
            <a
              href="/studio/intent/create/type=portfolioItem/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase px-4 py-2 border border-sage text-sage hover:bg-sage hover:text-cream transition-colors font-sans"
            >
              + Add Work
            </a>
          )}
        </div>
      )}

      {/* Add Work button when no categories exist */}
      {categories.length <= 1 && isAdmin && (
        <div className="mb-12">
          <a
            href="/studio/intent/create/type=portfolioItem/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase px-4 py-2 border border-sage text-sage hover:bg-sage hover:text-cream transition-colors font-sans"
          >
            + Add Work
          </a>
        </div>
      )}

      {filtered.length === 0 ? (
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
                {isAdmin && (
                  <a
                    href={`/studio/intent/edit/id=${item._id};type=portfolioItem/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sage/60 hover:text-sage transition-colors font-sans ml-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Edit
                  </a>
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
    </>
  )
}
