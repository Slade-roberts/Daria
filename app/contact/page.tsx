import { getContactSection, getSiteSettings } from '@/lib/queries'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contact — Daria Shchukina',
  description: 'Get in touch with Daria Shchukina.',
}

export default async function ContactPage() {
  const [contact, siteSettings] = await Promise.all([
    getContactSection(),
    getSiteSettings(),
  ])

  const email = contact?.email || siteSettings?.contactEmail

  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <header className="mb-16 border-b border-muted-gray/20 pb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-sage mb-4 font-sans">Contact</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light text-charcoal">
            {contact?.heading || 'Get in Touch'}
          </h1>
        </header>

        <div className="grid md:grid-cols-2 gap-16 max-w-4xl">
          <div>
            {contact?.introText ? (
              <p className="text-charcoal/70 leading-relaxed mb-8 font-sans">{contact.introText}</p>
            ) : (
              <p className="text-charcoal/70 leading-relaxed mb-8 font-sans">
                I welcome inquiries about translation projects, collaborations, editorial work, and speaking engagements. Please don&apos;t hesitate to reach out.
              </p>
            )}

            {email && (
              <div className="mb-8">
                <p className="text-xs tracking-widest uppercase text-muted-gray mb-2 font-sans">Email</p>
                <a
                  href={`mailto:${email}`}
                  className="font-serif text-xl text-charcoal hover:text-sage transition-colors"
                >
                  {email}
                </a>
              </div>
            )}

            {siteSettings?.socialLinks && siteSettings.socialLinks.length > 0 && (
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-gray mb-3 font-sans">Find me online</p>
                <ul className="space-y-2">
                  {siteSettings.socialLinks.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-charcoal/70 hover:text-sage transition-colors font-sans"
                      >
                        {link.platform} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {contact?.additionalInfo && (
              <div className="mt-8">
                <PortableTextRenderer value={contact.additionalInfo} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
