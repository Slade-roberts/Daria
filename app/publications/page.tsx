import { getPublications } from '@/lib/queries'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Writing — Daria Shchukina',
  description: 'Essays, articles, and literary writing by Daria Shchukina.',
}

export default async function PublicationsPage() {
  const publications = await getPublications()

  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <header className="mb-16 border-b border-muted-gray/20 pb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-sage mb-4 font-sans">Writing</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal mb-4">
            Publications &amp; Essays
          </h1>
          <p className="text-charcoal/60 max-w-xl font-sans">
            Essays, reviews, and literary writing on translation, literature, and language.
          </p>
        </header>

        {publications.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-xl text-charcoal/40 italic">
              No publications yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-muted-gray/20">
            {publications.map((pub) => (
              <article key={pub._id} className="py-10 group">
                <div className="grid md:grid-cols-4 gap-6">
                  {pub.publicationDate && (
                    <div className="md:col-span-1">
                      <time className="text-sm text-muted-gray font-sans">
                        {new Date(pub.publicationDate).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                  )}
                  <div className={pub.publicationDate ? 'md:col-span-3' : 'md:col-span-4'}>
                    <h2 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-sage transition-colors">
                      {pub.title}
                    </h2>
                    {pub.summary && (
                      <p className="text-charcoal/60 leading-relaxed mb-4 font-sans">{pub.summary}</p>
                    )}
                    {pub.externalLink && (
                      <a
                        href={pub.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs tracking-widest uppercase text-sage hover:text-charcoal transition-colors font-sans"
                      >
                        Read More →
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
