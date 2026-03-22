import { draftMode } from 'next/headers'
import { getAboutPage, getSiteSettings } from '@/lib/queries'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About — Daria Shchukina',
  description: 'Biography and background of Daria Shchukina, translator and literary scholar.',
}

export default async function AboutPage() {
  const [{ isEnabled: isAdmin }, about, siteSettings] = await Promise.all([
    draftMode(),
    getAboutPage(),
    getSiteSettings(),
  ])

  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Page header */}
        <header className="mb-16 border-b border-muted-gray/20 pb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-sage mb-4 font-sans">About</p>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal">
                {siteSettings?.title || 'Daria Shchukina'}
              </h1>
              {siteSettings?.subtitle && (
                <p className="font-serif text-xl italic text-charcoal/50 mt-3">
                  {siteSettings.subtitle}
                </p>
              )}
            </div>
            {isAdmin && (
              <a
                href="/studio/intent/edit/id=about;type=about/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-xs tracking-widest uppercase px-4 py-2 border border-sage text-sage hover:bg-sage hover:text-cream transition-colors font-sans mt-2"
              >
                Edit About
              </a>
            )}
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-16">
          {/* Main bio */}
          <div className="md:col-span-2">
            {about?.biography ? (
              <div className="prose-custom">
                <PortableTextRenderer value={about.biography} />
              </div>
            ) : (
              <p className="text-charcoal/50 italic font-sans">Biography coming soon.</p>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            {about?.languages && about.languages.length > 0 && (
              <div>
                <h3 className="font-serif text-lg text-charcoal mb-4 border-b border-muted-gray/20 pb-2">
                  Languages
                </h3>
                <ul className="space-y-1">
                  {about.languages.map((lang, i) => (
                    <li key={i} className="text-sm text-charcoal/70 font-sans">{lang}</li>
                  ))}
                </ul>
              </div>
            )}

            {about?.areasOfExpertise && about.areasOfExpertise.length > 0 && (
              <div>
                <h3 className="font-serif text-lg text-charcoal mb-4 border-b border-muted-gray/20 pb-2">
                  Expertise
                </h3>
                <ul className="space-y-1">
                  {about.areasOfExpertise.map((area, i) => (
                    <li key={i} className="text-sm text-charcoal/70 font-sans">{area}</li>
                  ))}
                </ul>
              </div>
            )}

            {about?.education && about.education.length > 0 && (
              <div>
                <h3 className="font-serif text-lg text-charcoal mb-4 border-b border-muted-gray/20 pb-2">
                  Education
                </h3>
                <ul className="space-y-2">
                  {about.education.map((edu, i) => (
                    <li key={i} className="text-sm text-charcoal/70 leading-relaxed font-sans">{edu}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
