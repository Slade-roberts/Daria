import Link from 'next/link'
import { draftMode } from 'next/headers'
import { getSiteSettings, getFeaturedPortfolioItems, getTestimonials } from '@/lib/queries'

export const revalidate = 60

export default async function HomePage() {
  const [{ isEnabled: isAdmin }, siteSettings, featuredItems, testimonials] = await Promise.all([
    draftMode(),
    getSiteSettings(),
    getFeaturedPortfolioItems(),
    getTestimonials(),
  ])

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-sage mb-6 font-sans">
          Translator &amp; Literary Scholar
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-light text-charcoal mb-6 leading-tight">
          {siteSettings?.title || 'Daria Shchukina'}
        </h1>
        {siteSettings?.subtitle && (
          <p className="font-serif text-xl md:text-2xl text-charcoal/60 italic mb-8">
            {siteSettings.subtitle}
          </p>
        )}
        {siteSettings?.shortIntro ? (
          <p className="max-w-xl text-charcoal/70 leading-relaxed mb-10 font-sans">
            {siteSettings.shortIntro}
          </p>
        ) : (
          <p className="max-w-xl text-charcoal/70 leading-relaxed mb-10 font-sans">
            Bringing literature across languages with care, precision, and literary sensibility.
          </p>
        )}
        <div className="flex gap-6">
          <Link
            href="/portfolio"
            className="px-8 py-3 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-sage transition-colors font-sans"
          >
            View Work
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 border border-charcoal/30 text-charcoal text-sm tracking-widest uppercase hover:border-sage hover:text-sage transition-colors font-sans"
          >
            Contact
          </Link>
          {isAdmin && (
            <a
              href="/studio/intent/edit/id=siteSettings;type=siteSettings/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-sage text-sage text-sm tracking-widest uppercase hover:bg-sage hover:text-cream transition-colors font-sans"
            >
              Edit Settings
            </a>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-muted-gray/20" />
      </div>

      {/* Featured Work */}
      {featuredItems.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-3xl text-charcoal">Featured Work</h2>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <a
                  href="/studio/intent/create/type=portfolioItem/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase text-sage hover:text-charcoal transition-colors font-sans"
                >
                  + Add Work
                </a>
              )}
              <Link href="/portfolio" className="text-xs tracking-widest uppercase text-sage hover:text-charcoal transition-colors font-sans">
                All Work →
              </Link>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <article key={item._id} className="group">
                <div className="aspect-[4/3] bg-warm-gray mb-4 overflow-hidden">
                  <div className="w-full h-full bg-light-sage group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-xs tracking-widest uppercase text-sage mb-2 font-sans">
                  {item.category} · {item.year}
                </p>
                <h3 className="font-serif text-xl text-charcoal mb-2 group-hover:text-sage transition-colors">
                  {item.title}
                </h3>
                {item.shortDescription && (
                  <p className="text-sm text-charcoal/60 leading-relaxed font-sans">
                    {item.shortDescription}
                  </p>
                )}
                {item.originalLanguage && item.translatedLanguage && (
                  <p className="text-xs text-muted-gray mt-2 font-sans">
                    {item.originalLanguage} → {item.translatedLanguage}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-warm-gray py-24">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-serif text-3xl text-charcoal text-center mb-16">Endorsements</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {testimonials.slice(0, 2).map((t) => (
                <blockquote key={t._id} className="space-y-4">
                  <p className="font-serif text-lg italic text-charcoal/80 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer>
                    <p className="text-sm font-semibold text-charcoal font-sans">{t.author}</p>
                    {t.role && <p className="text-xs text-muted-gray font-sans">{t.role}</p>}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
